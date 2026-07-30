import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Ilmainen',
    price: '0 €',
    period: '',
    desc: 'Kokeile rauhassa',
    features: ['3 selitystä päivässä', 'Selkosuomi-yhteenveto', 'PDF ja kuva'],
    cta: 'Aloita ilmaiseksi',
    highlight: false,
  },
  {
    name: 'Plus',
    price: '9,90 €',
    period: '/kk',
    desc: 'Säännölliseen käyttöön',
    features: [
      'Rajaton selitykset',
      'Vastausluonnokset',
      'Historia ja tallennukset',
      'Ensisijainen tuki',
    ],
    cta: 'Valitse Plus',
    highlight: true,
  },
  {
    name: 'Perhe',
    price: '14,90 €',
    period: '/kk',
    desc: 'Koko perheelle',
    features: [
      'Kaikki Plus-ominaisuudet',
      'Jopa 5 käyttäjää',
      'Jaettu historia',
      'Omaishuoja-työkalut',
    ],
    cta: 'Valitse Perhe',
    highlight: false,
  },
];

export default function Pricing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section id="hinnat" className="py-16 md:py-24">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm">Hinnat</span>
          <h2 className="text-2xl md:text-[2rem] font-extrabold text-brand-text mt-2">
            Selkeät hinnat, ei yllätyksiä
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-card p-7 flex flex-col transition-all duration-200 ${
                p.highlight
                  ? 'bg-white border-2 border-primary-600 shadow-cta scale-[1.02]'
                  : 'bg-white border border-brand-border shadow-card hover:shadow-lg'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-bold">
                  <Star size={12} /> Suosituin
                </span>
              )}
              <h3 className="text-lg font-bold text-brand-text">{p.name}</h3>
              <p className="text-sm text-brand-muted mb-4">{p.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-brand-text">{p.price}</span>
                <span className="text-brand-muted text-sm">{p.period}</span>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
                    <Check size={16} className="text-primary-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className={`text-center px-5 py-3 rounded-full font-bold text-[0.93rem] transition-all duration-150 ${
                  p.highlight
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-btn'
                    : 'bg-white border border-brand-border text-brand-text hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
