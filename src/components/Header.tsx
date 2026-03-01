import { useState, useEffect } from 'react';
import HeaderControls from './HeaderControls';

interface HeaderProps {
  companyName: string;
}

export default function Header({ companyName }: HeaderProps) {
  const [lang, setLang] = useState('id');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('alelm-lang') || 'id';
    setLang(savedLang);

    const handleLangChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    window.addEventListener('alelm-lang-change', handleLangChange as EventListener);
    return () => window.removeEventListener('alelm-lang-change', handleLangChange as EventListener);
  }, []);

  const navItems = [
    { id: 'about', label: lang === 'id' ? 'Tentang' : 'About' },
    { id: 'services', label: lang === 'id' ? 'Layanan' : 'Services' },
    { id: 'portfolio', label: lang === 'id' ? 'Portofolio' : 'Portfolio' },
    { id: 'testimonials', label: lang === 'id' ? 'Testimoni' : 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
  ];

  const ctaLabel = lang === 'id' ? 'Hubungi Kami' : 'Contact Us';

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-gradient-to-b from-[#0d1b2a] via-[#1b3a5f] to-[#0d1b2a] border-b border-blue-800/30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <a href="/" className="flex items-center">
              <img src="/logo-alelm-tech-landscape-light.png" alt={companyName} className="h-12 md:h-14 w-auto" />
            </a>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 bg-gradient-to-b from-[#0d1b2a] via-[#1b3a5f] to-[#0d1b2a] border-b border-blue-800/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <a href="/" className="flex items-center">
            <img src="/logo-alelm-tech-landscape-light.png" alt={companyName} className="h-12 md:h-14 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-white hover:text-blue-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            
            <HeaderControls />
            
            <a
              href="#contact"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-600/20 text-sm font-medium"
            >
              {ctaLabel}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <HeaderControls />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} pb-4 bg-[#0d1b2a]/95 backdrop-blur-md rounded-b-lg -mx-4 px-4 border-t border-blue-800/30`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-gray-200 hover:text-blue-400 border-b border-blue-800/30"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-blue-400 font-medium"
          >
            {ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
