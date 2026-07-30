import { ShieldCheck, Lock, Eye, FileCheck2 } from 'lucide-react';

const items = [
  {
    icon: Lock,
    title: 'Salattu yhteys',
    desc: 'Kaikki data kulkee TLS-salattua yhteyttä pitkin. Kukaan ulkopuolinen ei näe asiakirjojasi.',
  },
  {
    icon: Eye,
    title: 'Ei koulutusta tiedoillasi',
    desc: 'Asiakirjojasi ei käytetä tekoälymallien koulutukseen. Ne pysyvät sinun.',
  },
  {
    icon: ShieldCheck,
    title: 'GDPR-noudattaminen',
    desc: 'Toimimme EU:n tietosuoja-asetuksen mukaisesti. Tietosi käsitellään Suomessa.',
  },
  {
    icon: FileCheck2,
    title: 'Vastuu selkeä',
    desc: 'Tekoäly ehdottaa, mutta päätös on aina sinun. Emme anna virallista neuvontaa.',
  },
];

export default function Trust() {
  return (
    <section id="luottamus" className="py-16 md:py-24 bg-brand-bg">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm">Luottamus</span>
          <h2 className="text-2xl md:text-[2rem] font-extrabold text-brand-text mt-2">
            Tietosi ovat sinun
          </h2>
          <p className="text-brand-muted mt-3 max-w-2xl mx-auto">
            Viralliset asiakirjat ovat arkaluontoisia. Siksi tietoturva on kaiken perusta.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="rounded-card bg-white border border-brand-border p-6 shadow-card hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base font-bold text-brand-text mb-1.5">{it.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
