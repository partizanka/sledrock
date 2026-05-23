'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONCERTS, ConcertItem } from '@/lib/languages';
import { motion } from 'motion/react';
import { Calendar, MapPin, Skull, ShieldCheck, Filter, Flame } from 'lucide-react';
import Image from 'next/image';

function ConcertsContent() {
  const { lang, t } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'festival' | 'club' | 'other'>('all');

  // Filter list based on selected tab
  const filteredConcerts = filterType === 'all'
    ? CONCERTS
    : CONCERTS.filter(c => c.type === filterType);

  const getEventTypeName = (type: ConcertItem['type']) => {
    if (type === 'festival') return t.eventTypeFestival;
    if (type === 'club') return t.eventTypeClub;
    return t.eventTypeOther;
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Background grain screen */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      <Header />

      {/* Page Header */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#180505] to-[#060606]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c41e1e]/4 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-[#101010] border border-red-950/40 text-[#c41e1e] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Show Chronicle</span>
          </motion.div>
          
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
            {t.concertsTitle}
          </h1>
          <p className="font-sans text-stone-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            {t.concertsSubtitle}
          </p>
          <div className="w-24 h-[1.5px] bg-[#c41e1e] mx-auto mt-4" />
        </div>
      </section>

      {/* RITUAL CHRONICLES GRAPH GRID */}
      <section className="py-12 bg-[#060606] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories bar tracker filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            
            <div className="flex items-center space-x-2 text-stone-600 font-mono text-xs uppercase mr-2 border-r border-[#151515] pr-4 py-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Фильтр событий:</span>
            </div>

            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 font-sans font-extrabold uppercase text-[10px] tracking-wide rounded transition-all duration-300 ${
                filterType === 'all' 
                  ? 'bg-red-950/20 text-[#c41e1e] border border-[#c41e1e]/40 shadow-sm' 
                  : 'bg-[#101010] border border-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilterType('festival')}
              className={`px-3 py-1.5 font-sans font-extrabold uppercase text-[10px] tracking-wide rounded transition-all duration-300 ${
                filterType === 'festival' 
                  ? 'bg-red-950/20 text-[#c41e1e] border border-[#c41e1e]/40 shadow-sm' 
                  : 'bg-[#101010] border border-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              {t.festivalsTitle.split(' ')[0]}
            </button>
            <button
              onClick={() => setFilterType('club')}
              className={`px-3 py-1.5 font-sans font-extrabold uppercase text-[10px] tracking-wide rounded transition-all duration-300 ${
                filterType === 'club' 
                  ? 'bg-red-950/20 text-[#c41e1e] border border-[#c41e1e]/40 shadow-sm' 
                  : 'bg-[#101010] border border-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              {t.clubsTitle.split(' ')[0]}
            </button>
            <button
              onClick={() => setFilterType('other')}
              className={`px-3 py-1.5 font-sans font-extrabold uppercase text-[10px] tracking-wide rounded transition-all duration-300 ${
                filterType === 'other' 
                  ? 'bg-red-950/20 text-[#c41e1e] border border-[#c41e1e]/40 shadow-sm' 
                  : 'bg-[#101010] border border-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              {t.otherGigsTitle.split(' ')[0]}
            </button>
          </div>

          {/* Core poster grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConcerts.map((concert, idx) => {
              const localTitle = concert.title[lang as 'ru' | 'by' | 'en'] || concert.title['ru'];
              const localLoc = concert.location[lang as 'ru' | 'by' | 'en'] || concert.location['ru'];
              const localDate = concert.dateStr ? (concert.dateStr[lang as 'ru' | 'by' | 'en'] || concert.dateStr['ru']) : concert.year;

              return (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-[#0b0b0b] border border-stone-900 rounded-lg overflow-hidden flex flex-col justify-between shadow-2xl hover:border-red-950/45 transition-all duration-300 group"
                >
                  {/* Poster Graphic area (Placeholder) */}
                  <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden flex items-center justify-center">
                    
                    {/* Dark artistic skeleton poster stamp */}
                    <div className="absolute inset-x-0 inset-y-0 bg-stone-950 flex flex-col items-center justify-center p-4">
                      <Skull className="w-10 h-10 text-stone-800 group-hover:text-[#c41e1e] group-hover:scale-110 transition-transform duration-500 opacity-40 mb-2" />
                      <span className="font-mono text-[7px] text-stone-600 tracking-wider">SHOW POSTER PORTRAIT</span>
                    </div>

                    <Image
                      src={`https://picsum.photos/seed/${concert.id}/600/400`}
                      alt={localTitle}
                      fill
                      className="object-cover opacity-15 filter grayscale contrast-125 group-hover:scale-105 group-hover:opacity-25 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Left overlay badge (Event Type name) */}
                    <span className="absolute top-4 left-4 inline-flex items-center px-2 py-0.5 rounded bg-black/90 border border-red-950/40 text-[#c41e1e] font-mono text-[8px] tracking-wider uppercase font-bold">
                      <Flame className="w-2.5 h-2.5 mr-1" />
                      {getEventTypeName(concert.type)}
                    </span>

                    {/* Right completed stamp */}
                    <div className="absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded bg-[#c41e1e]/10 border border-[#c41e1e]/30 text-stone-400 font-mono text-[8px] tracking-wider uppercase">
                      <ShieldCheck className="w-2.5 h-2.5 text-[#c41e1e] mr-1" />
                      <span>{t.concertPastStatus}</span>
                    </div>

                    {/* City display inside Poster card bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex items-end">
                      <div className="flex items-center space-x-1.5 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-[#c41e1e]" />
                        <span className="font-sans font-semibold tracking-wide">{localLoc.split(':')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gig Metadata parameters */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-[#c41e1e] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{localDate}</span>
                    </div>

                    <h3 className="font-sans text-sm sm:text-base font-bold text-white tracking-wide leading-snug group-hover:text-[#c41e1e] transition-colors truncate">
                      {localTitle}
                    </h3>

                    {/* Details listing location details */}
                    <p className="font-sans text-[11px] text-stone-500 leading-normal line-clamp-2">
                      {localLoc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Red border bottom */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-red-900/35 to-transparent w-full" />

      <Footer />

    </div>
  );
}

export default function Concerts() {
  return (
    <LanguageProvider>
      <ConcertsContent />
    </LanguageProvider>
  );
}
