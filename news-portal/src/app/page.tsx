import Navbar from '@/components/Navbar';
import HeroNews from '@/components/HeroNews';
import NewsCard from '@/components/NewsCard';
import SidebarTrending from '@/components/SidebarTrending';
import NewsletterWidget from '@/components/NewsletterWidget';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import { getFeaturedNews, getLatestNews, getTrendingNews, getNewsByCategory } from '@/lib/data';

export default function Home() {
  const featuredNews = getFeaturedNews();
  const latestNews = getLatestNews(6);
  const trendingNews = getTrendingNews(5);
  const technologyNews = getNewsByCategory('Teknologi', 4);
  const businessNews = getNewsByCategory('Bisnis', 4);

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20">
        <HeroNews article={featuredNews} />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column - Latest News (70%) */}
          <div className="lg:col-span-8">
            <SectionHeader title="Berita Terbaru" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>

            {/* Technology Section */}
            <div id="category-teknologi" className="mt-16">
              <SectionHeader title="Teknologi" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technologyNews.map((article, index) => (
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </div>

            {/* Business Section */}
            <div id="category-bisnis" className="mt-16">
              <SectionHeader title="Bisnis" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessNews.map((article, index) => (
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (30%) */}
          <aside className="lg:col-span-4 space-y-6">
            <SidebarTrending trendingNews={trendingNews} />
            <NewsletterWidget />
            
            {/* Additional Widget - Categories */}
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                Kategori
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Nasional', 'Internasional', 'Teknologi', 'Bisnis', 'Olahraga', 'Gaya Hidup'].map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-primary hover:text-white text-slate-600 text-sm rounded-full cursor-pointer transition-colors duration-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
