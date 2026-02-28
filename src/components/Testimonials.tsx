import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  company: string;
  testimonial: string;
  testimonialEn: string;
  avatar: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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
    title: lang === 'id' ? 'Testimoni' : 'Testimonials',
    subtitle: lang === 'id' ? 'Apa Kata Klien Kami' : 'What Our Clients Say',
    description: lang === 'id' ? 'Kepuasan klien adalah prioritas utama kami' : 'Client satisfaction is our top priority',
  };

  return (
    <section id="testimonials" className="py-20 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-2">{t.title}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.subtitle}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div className="bg-[#1b3a5f]/50 rounded-2xl p-6 border border-blue-800/30 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 mb-6 italic">
                "{lang === 'id' ? testimonial.testimonial : testimonial.testimonialEn}"
              </p>

              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="font-semibold text-white">
                    {lang === 'id' ? testimonial.name : testimonial.nameEn}
                  </div>
                  <div className="text-sm text-gray-400">
                    {lang === 'id' ? testimonial.position : testimonial.positionEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
