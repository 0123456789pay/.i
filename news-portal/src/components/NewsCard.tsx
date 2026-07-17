import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/lib/data';

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Meta Data */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
          <span className="font-medium">{article.author}</span>
          <div className="flex items-center space-x-2">
            <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short'
            })}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
