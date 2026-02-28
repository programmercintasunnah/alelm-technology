import { useState, useEffect } from 'react';

interface FAQ {
  id: number;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [lang, setLang] = useState('id');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    title: 'FAQ',
    subtitle: lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions',
    description: lang === 'id' 
      ? 'Temukan jawaban untuk pertanyaan yang paling umum tentang layanan kami'
      : 'Find answers to the most common questions about our services',
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#0d1b2a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-2">{t.title}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.subtitle}
          </h3>
          <p className="text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="faq-item border border-blue-800/30 rounded-xl overflow-hidden"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-transparent hover:bg-[#1b3a5f]/30 transition-colors"
              >
                <span className="font-medium text-white pr-4">
                  {lang === 'id' ? faq.question : faq.questionEn}
                </span>
                <svg 
                  className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className={`px-6 pb-4 ${openIndex === index ? 'block' : 'hidden'}`}>
                <p className="text-gray-400">
                  {lang === 'id' ? faq.answer : faq.answerEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
