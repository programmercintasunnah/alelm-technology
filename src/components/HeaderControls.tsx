import { useState, useEffect } from 'react';

export default function HeaderControls() {
  const [lang, setLang] = useState('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('alelm-lang') || 'id';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
    
    window.dispatchEvent(new CustomEvent('alelm-lang-change', { detail: savedLang }));
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'id' ? 'en' : 'id';
    setLang(newLang);
    localStorage.setItem('alelm-lang', newLang);
    document.documentElement.lang = newLang;
    window.dispatchEvent(new CustomEvent('alelm-lang-change', { detail: newLang }));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLang}
      className="header-lang flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-500/30 transition-colors"
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <span className="text-base">🇮🇩</span>
      <span className="text-xs text-gray-300">/</span>
      <span className="text-base">🇬🇧</span>
    </button>
  );
}
