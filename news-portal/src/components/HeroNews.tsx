import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/lib/data';

interface HeroNewsProps {
  article: NewsArticle;
}

export default function HeroNews({ article }: HeroNewsProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[600px] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
        <div className="max-w-3xl">
          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
          >
            {article.category}
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {article.title}
          </motion.h2>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-200 mb-6 line-clamp-2"
          >
            {article.excerpt}
          </motion.p>

          {/* Meta Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-4 text-gray-300 text-sm"
          >
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>•</span>
            <span>{article.readTime} baca</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
