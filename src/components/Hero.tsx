import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  companyName: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
}

const fontClasses = [
  'font-poppins',
  'font-montserrat',
  'font-inter',
  'font-plusJakarta'
];

export default function Hero({ companyName, tagline, taglineEn, description, descriptionEn }: HeroProps) {
  const [lang, setLang] = useState('id');
  const [fontIndex, setFontIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const phaseRef = useRef<'typing' | 'waiting' | 'deleting'>('typing');
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!mounted) return;

    const fullText = companyName;

    const runTypewriter = () => {
      const phase = phaseRef.current;
      const index = indexRef.current;

      if (phase === 'typing') {
        if (index < fullText.length) {
          indexRef.current = index + 1;
          setDisplayText(fullText.slice(0, index + 1));
          timeoutRef.current = setTimeout(runTypewriter, 100);
        } else {
          phaseRef.current = 'waiting';
          timeoutRef.current = setTimeout(runTypewriter, 5000);
        }
      } else if (phase === 'waiting') {
        phaseRef.current = 'deleting';
        timeoutRef.current = setTimeout(runTypewriter, 100);
      } else if (phase === 'deleting') {
        if (index > 0) {
          indexRef.current = index - 1;
          setDisplayText(fullText.slice(0, index - 1));
          timeoutRef.current = setTimeout(runTypewriter, 50);
        } else {
          // Text is empty, switch font and restart
          const nextFont = (fontIndex + 1) % fontClasses.length;
          setFontIndex(nextFont);
          phaseRef.current = 'typing';
          timeoutRef.current = setTimeout(runTypewriter, 300);
        }
      }
    };

    runTypewriter();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [companyName, mounted, fontIndex]);

  const t = {
    tagline: lang === 'id' ? tagline : taglineEn,
    description: lang === 'id' ? description : descriptionEn,
    badge: lang === 'id' ? 'Menerima proyek baru' : 'Accepting new projects',
    cta1: lang === 'id' ? 'Mulai Proyek' : 'Start Project',
    cta2: lang === 'id' ? 'Lihat Portofolio' : 'View Portfolio',
    stats1: lang === 'id' ? 'Proyek Selesai' : 'Projects Completed',
    stats2: lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience',
    stats3: lang === 'id' ? 'Klien Puas' : 'Happy Clients',
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b3a5f] to-[#0d1b2a] -z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent -z-10"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-800/25 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%231e3a8a%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full mb-8 backdrop-blur-sm shadow-lg shadow-blue-500/10">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm text-blue-300">{t.badge}</span>
        </div>

        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight ${fontClasses[fontIndex]}`}>
          <span className="text-white">{displayText}</span>
          <span className="animate-cursor-blink border-r-4 border-blue-400 ml-1">&nbsp;</span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-400 font-medium mb-4">
          {t.tagline}
        </p>

        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30">
            {t.cta1}
          </a>
          <a href="#portfolio" className="px-8 py-4 bg-transparent border border-blue-400/50 hover:border-blue-300 text-white font-semibold rounded-lg transition-all duration-300">
            {t.cta2}
          </a>
        </div>

        <div className="mt-16 flex justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
            <div className="text-sm text-blue-300/70">{t.stats1}</div>
          </div>
          <div className="w-px h-12 bg-blue-500/40"></div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">5+</div>
            <div className="text-sm text-blue-300/70">{t.stats2}</div>
          </div>
          <div className="w-px h-12 bg-blue-500/40"></div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">30+</div>
            <div className="text-sm text-blue-300/70">{t.stats3}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
