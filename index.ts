import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalyzeBody {
  text: string;
  filename?: string | null;
  user_id?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { text, filename, user_id } = (await req.json()) as AnalyzeBody;
    if (!text || !text.trim()) {
      return new Response(
        JSON.stringify({ error: "Teksti puuttuu." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    let result;

    if (openaiKey) {
      result = await analyzeWithOpenAI(text, openaiKey);
    } else {
      result = analyzeLocally(text);
    }

    if (user_id) {
      await persistAnalysis(user_id, filename ?? null, text, result);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Sisäinen virhe" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

interface AnalysisResult {
  explanation: string;
  key_points: string[];
  action_items: string[];
  draft_response: string;
}

async function analyzeWithOpenAI(text: string, apiKey: string): Promise<AnalysisResult> {
  const systemPrompt = `Olet suomalainen asiakirja-assistentti. Sinun tehtäväsi on auttaa ihmisiä ymmärtämään virallisia asiakirjoja, kirjeitä ja lomakkeita.

Analyze the document and respond ONLY with valid JSON in this exact format:
{
  "explanation": "Selkosuomeksi kirjoitettu selitys asiakirjasta (2-4 virketta). Käytä yksinkertaista kieltä.",
  "key_points": ["avainkohta 1", "avainkohta 2", ...],
  "action_items": ["toimenpide 1", "toimenpide 2", ...],
  "draft_response": "Jos asiakirja vaatii vastauksen, kirjoita luonnos suomeksi. Muuten tyhjä merkkijono."
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 8000) },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI-virhe (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Tekoäly ei palauttanut sisältöä.");

  const parsed = JSON.parse(content);
  return {
    explanation: String(parsed.explanation ?? ""),
    key_points: Array.isArray(parsed.key_points) ? parsed.key_points.map(String) : [],
    action_items: Array.isArray(parsed.action_items) ? parsed.action_items.map(String) : [],
    draft_response: String(parsed.draft_response ?? ""),
  };
}

function analyzeLocally(text: string): AnalysisResult {
  const sentences = text
    .split(/[.!?]\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  const firstThree = sentences.slice(0, 3).join(". ");
  const explanation = firstThree
    ? `Tämä asiakirja käsittelee seuraavaa: ${firstThree}.`
    : "Asiakirjan teksti on liian lyhyt yksityiskohtaiseen analyysiin.";

  const keyPoints = sentences.slice(0, 4).map((s) => s.slice(0, 120));

  const lower = text.toLowerCase();
  const actionItems: string[] = [];
  if (lower.includes("maksa") || lower.includes("eräpäivä") || lower.includes("maksu"))
    actionItems.push("Tarkista maksu ja eräpäivä.");
  if (lower.includes("ilmoitus") || lower.includes("lomake"))
    actionItems.push("Täytä ja palauta ilmoitus/lomake.");
  if (lower.includes("päätös") || lower.includes("hakemus"))
    actionItems.push("Tarkista päätökseen liittyvät ohjeet.");
  if (lower.includes("yhteyttä") || lower.includes("ota yhteyttä"))
    actionItems.push("Ota tarvittaessa yhteyttä lähettäjään.");
  if (actionItems.length === 0)
    actionItems.push("Lue asiakirja huolellisesti ja toimi sen ohjeiden mukaan.");

  return {
    explanation,
    key_points: keyPoints.length ? keyPoints : ["Asiakirja vastaanotettu."],
    action_items: actionItems,
    draft_response: "",
  };
}

async function persistAnalysis(
  userId: string,
  filename: string | null,
  originalText: string,
  result: AnalysisResult
) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return;

  await fetch(`${supabaseUrl}/rest/v1/analyses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({
      user_id: userId,
      filename,
      original_text: originalText.slice(0, 12000),
      explanation: result.explanation,
      key_points: result.key_points,
      action_items: result.action_items,
      draft_response: result.draft_response,
    }),
  });
}
