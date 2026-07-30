import { Users, Briefcase, Heart, Landmark } from 'lucide-react';

const groups = [
  {
    icon: Users,
    title: 'Ikääntyneille',
    desc: 'Veropäätökset, Kelan kirjeet ja hoito-ohjeet ilman hämmennystä.',
  },
  {
    icon: Landmark,
    title: 'Maahanmuuttajille',
    desc: 'Virallinen suomi voi olla vaikeaa. LomakeApu selittää asiat selkeästi.',
  },
  {
    icon: Heart,
    title: 'Omaishoitajille',
    desc: 'Hakemukset, päätökset ja etuuksien selitykset yhdellä klikkauksella.',
  },
  {
    icon: Briefcase,
    title: 'Yrittäjille',
    desc: 'Lomakkeet, ilmoitukset ja viranomaiskirjeet ilman tulkkiä.',
  },
];

export default function ForWho() {
  return (
    <section id="kenelle" className="py-16 md:py-24 bg-brand-bg">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm">Kenelle</span>
          <h2 className="text-2xl md:text-[2rem] font-extrabold text-brand-text mt-2">
            Tehty oikeille ihmisille
          </h2>
          <p className="text-brand-muted mt-3 max-w-2xl mx-auto">
            LomakeApu AI on suunniteltu auttamaan niitä, joille virallinen kieli on muuri.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="rounded-card bg-white border border-brand-border p-6 shadow-card hover:border-primary-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <h3 className="text-base font-bold text-brand-text mb-1.5">{g.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
