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
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <div className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Portofolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Proyek Kami
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beberapa proyek yang telah kami selesaikan dengan memuaskan
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
                  : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {items.map((item) => (
            <div 
              key={item.id}
              className="group bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
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
                <div className="text-sm text-blue-600 mb-1">{item.client}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 text-xs rounded"
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
            <p className="text-gray-500">Tidak ada proyek dalam kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
