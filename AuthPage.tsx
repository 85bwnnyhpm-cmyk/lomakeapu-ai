import { FileText, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section id="top" className="gradient-hero pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="w-full max-w-[1120px] mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-5">
            <Sparkles size={14} /> Tekoälyavusteinen apu
          </span>
          <h1 className="text-3xl md:text-[2.6rem] leading-[1.15] font-extrabold text-brand-text mb-4">
            Ymmärrä vaikeat paperit ilman stressiä
          </h1>
          <p className="text-[1.05rem] text-brand-muted mb-7 leading-relaxed max-w-[34rem]">
            LomakeApu AI muuntaa viralliset asiakirjat, kirjeet ja lomakkeet selkosuomeksi.
            Saat selityksen, ohjeet ja vastausluonnoksen muutamassa sekunnissa.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-600 text-white font-bold text-[0.97rem] hover:bg-primary-700 transition-all duration-150 shadow-btn"
            >
              Kokeile ilmaiseksi <ArrowRight size={18} />
            </button>
            <a
              href="#toimii"
              className="inline-flex items-center px-6 py-3.5 rounded-full bg-white border border-brand-border text-brand-text font-bold text-[0.97rem] hover:border-primary-600 hover:text-primary-600 transition-all duration-150"
            >
              Katso miten toimii
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-primary-600" /> Tietoturva ensin
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText size={15} className="text-primary-600" /> Selkosuomi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={15} className="text-primary-600" /> Ei rekisteröitymistä
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-card bg-white border border-brand-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="rounded-xl border border-brand-border p-4 bg-brand-bg">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-primary-600" />
                <span className="text-xs font-semibold text-brand-muted">
                  vero.fi — Veropäätös 2025
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-brand-border rounded w-full" />
                <div className="h-2.5 bg-brand-border rounded w-5/6" />
                <div className="h-2.5 bg-brand-border rounded w-4/6" />
              </div>
            </div>
            <div className="flex justify-center my-3">
              <Sparkles size={18} className="text-primary-600" />
            </div>
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary-700">Selkosuomi</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-primary-200 rounded w-full" />
                <div className="h-2.5 bg-primary-200 rounded w-5/6" />
                <div className="h-2.5 bg-primary-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
