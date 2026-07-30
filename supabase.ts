import { Upload, Sparkles, FileCheck2 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Lataa tai liitä teksti',
    desc: 'Raahaa PDF, kuva tai kopioi teksti suoraan. LomakeApu lukee sisällön sekunneissa.',
  },
  {
    icon: Sparkles,
    title: 'Tekoäly analysoi',
    desc: 'Saat vaikean tekstin yksinkertaisella suomeksi, avainkohdat ja ohjeet mitä tehdä seuraavaksi.',
  },
  {
    icon: FileCheck2,
    title: 'Saat vastausluonnoksen',
    desc: 'Tarvitsetko vastata kirjeeseen? LomakeApu kirjoittaa luonnoksen, jonka voit muokata ja lähettää.',
  },
];

export default function HowItWorks() {
  return (
    <section id="toimii" className="py-16 md:py-24">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm">Näin se toimii</span>
          <h2 className="text-2xl md:text-[2rem] font-extrabold text-brand-text mt-2">
            Kolmessa vaiheessa paperista selkeäksi
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="relative rounded-card bg-white border border-brand-border p-7 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary-600" />
                </div>
                <div className="absolute top-6 right-6 text-5xl font-extrabold text-brand-border/70 select-none">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">{s.title}</h3>
                <p className="text-brand-muted leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
