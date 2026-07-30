import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#toimii', label: 'Miten toimii' },
  { href: '#kenelle', label: 'Kenelle' },
  { href: '#hinnat', label: 'Hinnat' },
  { href: '#luottamus', label: 'Luottamus' },
];

export default function Header({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-brand-border/90 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1120px] mx-auto px-5 flex items-center justify-between h-16 gap-5">
        <a
          href="#top"
          className="font-extrabold text-[1.1rem] tracking-tight text-brand-text select-none"
        >
          LomakeApu AI
        </a>

        <nav className="hidden md:flex gap-6 text-[0.95rem] text-brand-muted">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-primary-600 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={onGetStarted}
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-[0.9rem] bg-white border border-brand-border text-brand-text hover:border-primary-600 hover:text-primary-600 transition-all duration-150"
        >
          Aloita
        </button>

        <button
          className="md:hidden text-brand-muted hover:text-brand-text transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Avaa valikko"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-brand-border px-5 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-muted hover:text-primary-600 text-[0.97rem] py-1 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onGetStarted();
            }}
            className="mt-1 text-center px-5 py-2.5 rounded-full font-bold text-[0.9rem] bg-primary-600 text-white"
          >
            Aloita
          </button>
        </div>
      )}
    </header>
  );
}
