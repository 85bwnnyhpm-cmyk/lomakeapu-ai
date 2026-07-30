import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const type = file.type;

  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    return extractFromPdf(file);
  }
  if (type.startsWith('image/') || /\.(png|jpe?g|webp|bmp|gif|tiff?)$/.test(name)) {
    return extractFromImage(file);
  }
  return file.text();
}

async function extractFromPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const maxPages = Math.min(pdf.numPages, 10);
  let text = '';
  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: unknown) => (it as { str: string }).str).join(' ') + '\n\n';
  }
  await pdf.cleanup();
  return text.trim();
}

async function extractFromImage(file: File): Promise<string> {
  const Tesseract = await import('tesseract.js');
  const createWorker = Tesseract.createWorker ?? Tesseract.default?.createWorker;
  if (!createWorker) throw new Error('Tesseract ei ole saatavilla');
  const worker = await createWorker('fin');
  const { data: { text } } = await worker.recognize(file);
  await worker.terminate();
  return text.trim();
}
