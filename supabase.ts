export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="w-full max-w-[1120px] mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-extrabold text-brand-text text-lg">LomakeApu AI</div>
            <p className="text-sm text-brand-muted mt-1 max-w-sm">
              Viralliset paperit selkosuomeksi. Tekoälyavusteista apua jokapäiväiseen elämään.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-muted">
            <a href="#toimii" className="hover:text-primary-600 transition-colors">Miten toimii</a>
            <a href="#hinnat" className="hover:text-primary-600 transition-colors">Hinnat</a>
            <a href="#luottamus" className="hover:text-primary-600 transition-colors">Tietoturva</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Tietosuoja</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Yhteystiedot</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-brand-muted">
          <span>© {new Date().getFullYear()} LomakeApu AI. Kaikki oikeudet pidätetään.</span>
          <span>Tehty Suomessa 🇫🇮</span>
        </div>
      </div>
    </footer>
  );
}
