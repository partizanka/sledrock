'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Flame, Star, Volume2, Calendar, ChevronRight, Skull } from 'lucide-react';

function HomeContent() {
  const { lang, t } = useLanguage();

  const achievementsTeaser = [
    { title: t.ach1.split('«')[1]?.split('»')[0] || "Человек с 1000 лиц", desc: t.ach1 },
    { title: "OneRock Top-1", desc: t.ach2 },
    { title: t.ach4.split('«')[1]?.split('»')[0] || "РОКоделие 2024", desc: t.ach4 },
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Noise layer overlay */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      {/* Header */}
      <Header />

      {/* 1. HERO PARALLAX SECTION */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        {/* Background Image Layer with vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/sledband/1920/1080"
            alt="СЛЕD Band Cover"
            fill
            className="object-cover object-center opacity-30 transform scale-105 filter grayscale contrast-125"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Crimson glow overlay and vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/80 to-[#060606]/50" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060606] to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060606] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060606] to-transparent pointer-events-none" />
          
          {/* Red spotlights */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c41e1e]/8 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c41e1e]/6 rounded-full filter blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-12">
          
          {/* Animated Blood Dribble/Thin red highlight */}
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 60 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[2px] bg-gradient-to-b from-[#c41e1e] to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#c41e1e] font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mb-3 select-none"
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-wider text-white mb-6 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
          >
            СЛЕ<span className="text-[#c41e1e] relative inline-block text-shadow-[0_0_15px_#c41e1e]">D</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg sm:text-2xl font-light text-stone-200 tracking-wide max-w-2xl mx-auto mb-4"
          >
            «{t.heroHeadline}»
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-stone-400 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed font-sans"
          >
            {t.heroText}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              id="cta-listen"
              href="/discography"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c41e1e] to-[#8b0000] text-white font-sans text-sm font-bold tracking-widest uppercase rounded shadow-[0_4px_20px_rgba(196,30,30,0.3)] hover:shadow-[0_4px_30px_rgba(196,30,30,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#c41e1e]/40 flex items-center justify-center space-x-2.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.heroListenBtn}</span>
            </Link>

            <Link
              id="cta-about"
              href="/about"
              className="w-full sm:w-auto px-8 py-4 bg-[#101010]/80 border border-stone-800 text-stone-300 hover:text-white hover:border-[#c41e1e]/50 font-sans text-sm font-bold tracking-widest uppercase rounded hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{t.heroMoreBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>

        {/* Parallax Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-40 animate-bounce">
          <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1.5">scroll</span>
          <div className="w-[1px] h-6 bg-stone-500" />
        </div>
      </section>

      {/* 2. LEADING TEASER MODULE */}
      <section id="teaser-section" className="relative py-24 border-y border-red-950/20 bg-[#080808]">
        
        {/* Abstract Blood Splatter glow spot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#c41e1e]/3 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Grid block */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c41e1e] to-stone-900 rounded-lg blur-lg opacity-30 group-hover:opacity-45 transition duration-1000" />
              <div className="relative bg-[#0d0d0d] p-3 rounded-lg border border-stone-900 shadow-[0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="relative aspect-video sm:aspect-square w-full">
                  <Image
                    src="https://picsum.photos/seed/sledlive/600/600"
                    alt="СЛЕD live Минск"
                    fill
                    className="object-cover rounded filter grayscale scale-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Decorative stamp */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 px-2 py-1 bg-[#050505]/95 border border-red-950/40 rounded">
                    <Skull className="w-3.5 h-3.5 text-[#c41e1e]" />
                    <span className="font-mono text-[9px] text-stone-400 tracking-wider">LIVE RECORD 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Text block */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.25em] font-bold block">
                {t.navAbout} — СЛЕD
              </span>
              
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-wider uppercase leading-tight">
                {t.aboutTeaserTitle}
              </h2>

              <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed">
                {t.aboutTeaserText}
              </p>

              <div className="pt-4">
                <Link
                  id="link-details"
                  href="/about"
                  className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase text-white hover:text-[#c41e1e] inline-flex items-center space-x-2 group shrink-0"
                >
                  <span>{t.aboutTeaserReadMore}</span>
                  <ChevronRight className="w-4 h-4 text-[#c41e1e] transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Quick statistics/Milestones bento row */}
              <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-stone-900">
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">2019</h4>
                  <p className="font-sans text-[10px] text-stone-500 uppercase tracking-widest mt-1">Год основания</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#c41e1e] flex items-center">
                    30<span className="text-sm font-normal text-white ml-1">треков</span>
                  </h4>
                  <p className="font-sans text-[10px] text-stone-500 uppercase tracking-widest mt-1">Записано в студии</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">1-е</h4>
                  <p className="font-sans text-[10px] text-stone-500 uppercase tracking-widest mt-1">Места в чартах</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE HIGHLIGHT: LATEST RELEASE PROMO */}
      <section id="latest-release-section" className="relative py-24 bg-gradient-to-b from-[#060606] to-[#040404]">
        
        {/* Red mist */}
        <div className="absolute left-10 bottom-0 w-80 h-80 bg-[#c41e1e]/2 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.2em] font-bold block mb-2">
              LATEST RELIC
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase">
              {t.latestReleaseTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e1e] mx-auto mt-4" />
          </div>

          <div className="bg-[#0b0b0b] border border-red-950/30 rounded-xl p-8 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Record sleeve mock */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group w-64 h-64 sm:w-72 sm:h-72 aspect-square">
                  {/* Shadows and sleeve */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-800 to-black rounded blur-md opacity-25 group-hover:opacity-40 transition" />
                  <div className="relative w-full h-full bg-gradient-to-br from-stone-900 via-[#1a1a1a] to-[#250000] rounded border border-stone-800 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-[11px] text-stone-500 uppercase tracking-widest">SLED ALBUM</span>
                      <Flame className="w-4 h-4 text-[#c41e1e] animate-pulse" />
                    </div>
                    {/* Dark minimalist logo stamp */}
                    <div className="text-center py-6">
                      <h4 className="font-sans text-4xl sm:text-5xl font-black uppercase tracking-wider text-stone-200">СЛЕD</h4>
                      <p className="font-sans text-xs text-[#c41e1e] uppercase tracking-[0.2em] mt-2">СЛЕD (2026)</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-mono text-[9px] text-stone-500">10 TRACKS</span>
                      <span className="font-mono text-[9px] text-[#c41e1e] font-semibold">HQ AUDIO</span>
                    </div>
                  </div>
                  {/* Spinning Vinyl record sneaking out */}
                  <div className="absolute top-0 right-[-30px] bottom-0 w-32 bg-[#020202] border-y border-r border-stone-800 rounded-full z-[-1] transition-transform duration-700 group-hover:translate-x-[40px] flex items-center justify-center opacity-80 overflow-hidden">
                    <div className="w-12 h-12 rounded-full border border-red-950 bg-red-900/10 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Album track preview teaser block */}
              <div className="md:col-span-7 space-y-5">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-[#c41e1e] fill-[#c41e1e]" />
                  <span className="font-mono text-xs text-stone-400 font-bold uppercase tracking-wider">{t.latestReleaseYear}</span>
                </div>

                <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-wider">
                  {lang === 'by' ? "Альбом «След»" : lang === 'en' ? "Album 'Sled'" : "Альбом «След»"}
                </h3>
                
                <p className="font-sans text-stone-400 text-sm leading-relaxed">
                  {lang === 'by' 
                    ? "У другі паўнафарматны лонгплэй калектыву ўвайшлі 10 глыбокіх трэкаў, напоўненых змрочнымі таямніцамі, гісторыямі пра бегляцоў, маякі і рэквіемам аб каханні."
                    : lang === 'en'
                    ? "The band's second full-length studio release features 10 heavy, melodic chronicles including 'Dreamcatcher', 'Lighthouse Keeper', and the tragic 'Sad Clown'."
                    : "Во второй полноформатный лонгплей коллектива вошли 10 глубоких треков, наполненных мрачными тайнами, историями о беглецах, смотрителях маяков и реквиемом о любви."}
                </p>

                {/* Direct Release Tracklist teaser snippet */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-500 pt-2 border-t border-stone-900">
                  <div>1. След</div>
                  <div>2. Ловец снов (Dreamcatcher)</div>
                  <div>3. Пиратская история</div>
                  <div>4. Смотритель маяка</div>
                </div>

                <div className="pt-4">
                  <Link
                    id="goto-discography"
                    href="/discography"
                    className="inline-flex items-center space-x-2.5 px-6 py-3 bg-[#101010] border border-red-950/60 rounded-md text-stone-300 hover:text-white hover:border-[#c41e1e]/60 transition-all duration-300 group"
                  >
                    <Volume2 className="w-4 h-4 text-[#c41e1e] group-hover:scale-110" />
                    <span className="font-sans text-xs font-bold tracking-widest uppercase">Перейти к прослушиванию</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. CHRONICLES OF ACHIEVEMENTS SHORTLIST */}
      <section id="achievements-section" className="py-24 bg-[#050505] border-t border-red-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.25em] font-bold block mb-2">
              TRIUMPHS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase">
              {t.achievementsTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e1e] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementsTeaser.map((item, idx) => (
              <div 
                key={`${item.title}-${idx}`}
                className="bg-[#0b0b0b] border border-stone-900 rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:border-red-950/60 shadow-lg group"
              >
                {/* Glow accent bar on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c41e1e] to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                {/* Background watermarked index */}
                <span className="absolute right-4 bottom-4 font-sans text-8xl font-black text-stone-950/20 select-none group-hover:text-[#c41e1e]/5 transition-all duration-500">
                  {idx + 1}
                </span>

                <div className="flex items-center space-x-2.5 mb-4 relative z-10">
                  <Star className="w-4 h-4 text-[#c41e1e]" />
                  <h4 className="font-sans text-sm font-extrabold tracking-widest uppercase text-white">
                    {item.title}
                  </h4>
                </div>

                <p className="font-sans text-xs text-stone-500 leading-relaxed relative z-10 group-hover:text-stone-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dark Bloody Vignette Border Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c41e1e] to-transparent w-full" />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
