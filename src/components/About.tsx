import { useState, useEffect } from 'react';

interface AboutProps {
  description: string;
  descriptionEn: string;
  vision: string;
  visionEn: string;
  mission: string[];
  missionEn: string[];
  founded: number;
}

export default function About({ description, descriptionEn, vision, visionEn, mission, missionEn, founded }: AboutProps) {
  const [lang, setLang] = useState('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('alelm-lang') || 'id';
    setLang(savedLang);

    const handleLangChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    window.addEventListener('alelm-lang-change', handleLangChange as EventListener);
    return () => window.removeEventListener('alelm-lang-change', handleLangChange as EventListener);
  }, []);

  const t = {
    title: lang === 'id' ? 'Tentang Kami' : 'About Us',
    subtitle: lang === 'id' ? 'Mengubah Visi Menjadi Realitas Digital' : 'Transforming Vision into Digital Reality',
    description: lang === 'id' ? description : descriptionEn,
    vision: lang === 'id' ? vision : visionEn,
    mission: lang === 'id' ? mission : missionEn,
    stats1: lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience',
    stats2: lang === 'id' ? 'Proyek Selesai' : 'Projects Completed',
    stats3: lang === 'id' ? 'Klien Happy' : 'Happy Clients',
    stats4: lang === 'id' ? 'Tim Ahli' : 'Expert Team',
  };

  return (
    <section id="about" className="py-20 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-2">{t.title}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.subtitle}
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              {t.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{lang === 'id' ? 'Visi' : 'Vision'}</h4>
                  <p className="text-gray-400">{t.vision}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">{lang === 'id' ? 'Misi' : 'Mission'}</h4>
                <ul className="space-y-2">
                  {t.mission.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{2026 - founded}</div>
                  <div className="text-blue-200">{t.stats1}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-blue-200">{t.stats2}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">30+</div>
                  <div className="text-blue-200">{t.stats3}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">10+</div>
                  <div className="text-blue-200">{t.stats4}</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-800/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
