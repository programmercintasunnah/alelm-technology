import { useState, useEffect } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  titleEn: string;
  client: string;
  category: string;
  categoryLabel: string;
  description: string;
  descriptionEn: string;
  image: string;
  technologies: string[];
  year: number;
}

interface Category {
  value: string;
  label: string;
}

interface PortfolioProps {
  initialItems: PortfolioItem[];
  categories: Category[];
}

export default function PortfolioFilter({ initialItems, categories }: PortfolioProps) {
  const [lang, setLang] = useState('id');
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    const filtered = activeCategory === 'all' 
      ? initialItems 
      : initialItems.filter(item => item.category === activeCategory);
    
    setTimeout(() => {
      setItems(filtered);
      setIsAnimating(false);
    }, 150);
  }, [activeCategory, initialItems]);

  const t = {
    title: 'Portfolio',
    subtitle: lang === 'id' ? 'Proyek Kami' : 'Our Projects',
    description: lang === 'id' 
      ? 'Beberapa proyek yang telah kami selesaikan dengan memuaskan' 
      : 'Some projects we have completed satisfactorily',
    empty: lang === 'id' ? 'Tidak ada proyek dalam kategori ini' : 'No projects in this category',
  };

  const getCategoryLabel = (value: string) => {
    const cat = categories.find(c => c.value === value);
    return cat ? cat.label : value;
  };

  if (!mounted) {
    return <div className="py-20 bg-[#0d1b2a]" id="portfolio"></div>;
  }

  return (
    <div className="py-20 bg-[#0d1b2a]" id="portfolio">
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-[#1b3a5f] text-gray-300 hover:bg-[#234567]'
              }`}
            >
              {getCategoryLabel(category.value)}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {items.map((item) => (
            <div 
              key={item.id}
              className="group bg-[#1b3a5f]/50 border border-blue-800/30 rounded-2xl overflow-hidden hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={lang === 'id' ? item.title : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-blue-400 mb-1">{item.client}</div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {lang === 'id' ? item.title : item.titleEn}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {lang === 'id' ? item.description : item.descriptionEn}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-[#0d1b2a] text-gray-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
