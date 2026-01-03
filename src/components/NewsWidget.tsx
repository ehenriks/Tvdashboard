import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
  image: string;
  description: string;
}

export function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Nya regler för elbilar träder i kraft nästa år',
      source: 'Svenska Dagbladet',
      time: '15 min sedan',
      category: 'Sverige',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop',
      description: 'Regeringen presenterar omfattande förändringar för elbilsägare. De nya reglerna inkluderar höjda subventioner för privata laddstationer. Förändringarna förväntas påverka tusentals bilägare över hela landet.',
    },
    {
      id: 2,
      title: 'Stockholmsbörsen når nya höjder efter stark rapportsäsong',
      source: 'Dagens Industri',
      time: '1 timme sedan',
      category: 'Ekonomi',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      description: 'OMXS30 stiger med över 2 procent på bred front. Storbolagen visar starka kvartalsresultat som överträffar analytikernas förväntningar. Optimismen på marknaden är den högsta på flera år.',
    },
    {
      id: 3,
      title: 'Regeringen presenterar ny klimatstrategi',
      source: 'Dagens Nyheter',
      time: '2 timmar sedan',
      category: 'Politik',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=400&h=250&fit=crop',
      description: 'En ambitiös plan för att nå klimatmålen 2030 läggs fram idag. Strategin innehåller satsningar på förnybar energi och hållbar transport. Oppositionen efterlyser dock tydligare åtgärder.',
    },
    {
      id: 4,
      title: 'Svensk forskning om förnybar energi får internationell uppmärksamhet',
      source: 'SVT Nyheter',
      time: '3 timmar sedan',
      category: 'Vetenskap',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
      description: 'Forskare vid KTH har utvecklat en ny metod för energilagring. Tekniken kan revolutionera hur vi använder solenergi. Internationella investerare visar stort intresse för projektet.',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, [news.length]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Sverige: 'bg-blue-500/20 text-blue-400',
      Ekonomi: 'bg-green-500/20 text-green-400',
      Politik: 'bg-emerald-500/20 text-emerald-400',
      Vetenskap: 'bg-purple-500/20 text-purple-400',
      Världen: 'bg-orange-500/20 text-orange-400',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="w-6 h-6 text-white/60" />
        <h2 className="text-white/60 tracking-wide uppercase text-sm">Senaste Nyheterna</h2>
      </div>

      {/* Featured News */}
      <div className="mb-6">
        <div className="bg-slate-700/30 rounded-2xl overflow-hidden">
          <img
            src={news[currentIndex].image}
            alt={news[currentIndex].title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(news[currentIndex].category)}`}>
                {news[currentIndex].category}
              </span>
              <span className="text-white/50 text-sm">{news[currentIndex].time}</span>
            </div>
            <h3 className="text-white text-2xl mb-3">{news[currentIndex].title}</h3>
            <p className="text-white/70 mb-3 leading-relaxed">{news[currentIndex].description}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/60">{news[currentIndex].source}</span>
              <ExternalLink className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {news
          .filter((_, idx) => idx !== currentIndex)
          .slice(0, 2)
          .map((item) => (
            <div
              key={item.id}
              className="bg-slate-700/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-white/40 text-xs">{item.time}</span>
              </div>
              <h4 className="text-white">{item.title}</h4>
              <div className="text-white/50 text-sm mt-2">{item.source}</div>
            </div>
          ))}
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {news.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-blue-500 w-6' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}