import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/lib/data';

interface SidebarTrendingProps {
  trendingNews: NewsArticle[];
}

export default function SidebarTrending({ trendingNews }: SidebarTrendingProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
      <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
        Berita Trending
      </h3>
      
      <div className="space-y-5">
        {trendingNews.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 group cursor-pointer"
          >
            {/* Number Badge */}
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              index < 3 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600'
            }`}>
              {index + 1}
            </span>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <h4 className="font-heading text-base font-semibold text-slate-900 mt-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {article.title}
              </h4>
              <p className="text-xs text-slate-500 mt-2">
                {article.readTime} baca
              </p>
            </div>
            
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
