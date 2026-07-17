'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '@/lib/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-heading text-3xl font-bold text-primary tracking-tight">
              ELITE DAILY
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category}
                href={`#category-${category.toLowerCase()}`}
                className="text-slate-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-slate-600 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
              Berlangganan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-slate-100"
        >
          <div className="px-4 py-4 space-y-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`#category-${category.toLowerCase()}`}
                className="block py-2 text-slate-600 hover:text-primary font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-4">
              <button className="p-2 text-slate-600">
                <Search className="w-5 h-5" />
              </button>
              <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex-1">
                Berlangganan
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
