'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white mt-6"
    >
      <h3 className="font-heading text-xl font-bold mb-2">
        Newsletter
      </h3>
      <p className="text-sm text-blue-100 mb-4">
        Dapatkan berita terkini langsung di inbox Anda setiap hari.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Anda"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors duration-200"
        >
          <Send className="w-4 h-4" />
          Berlangganan
        </button>
      </form>
      
      <p className="text-xs text-blue-200 mt-3 text-center">
        Kami menghargai privasi Anda. Unsubscribe kapan saja.
      </p>
    </motion.div>
  );
}
