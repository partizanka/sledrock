'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import { ALBUMLIST, SINGLELIST } from '@/lib/languages';
import { motion } from 'motion/react';
import { Disc, ExternalLink, Skull, Flame, Music, Layers, Play } from 'lucide-react';

function DiscographyContent() {
  const { lang, t } = useLanguage();
  const [selectedAlbum, setSelectedAlbum] = useState<'all' | 'proklyaty' | 'sled' | 'singles'>('all');

  // helper to translate track titles
  const getTracklistByLang = (albumId: string) => {
    const albumObj = ALBUMLIST.find(a => a.id === albumId);
    if (!albumObj) return [];
    if (lang === 'by') return albumObj.tracksBY;
    if (lang === 'en') return albumObj.tracksEN;
    return albumObj.tracks;
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Background grain noise */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      <Header />

      {/* Page Header */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#1c0808] to-[#060606]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c41e1e]/4 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#101010] border border-red-950/40 text-[#c41e1e] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '5s' }} />
            <span>Sound Crypt</span>
          </motion.div>
          
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
            {t.discoTitle}
          </h1>
          <div className="w-24 h-[1.5px] bg-[#c41e1e] mx-auto mt-4" />
        </div>
      </section>

      {/* CORE INTERACTIVE LAYOUT (PLAYER + LISTINGS) */}
      <section className="py-12 bg-[#060606] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: THE PREMIUM AUDIO PLAYER */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              
              <div className="text-center lg:text-left">
                <span className="font-mono text-xs text-[#c41e1e] font-bold uppercase tracking-[0.2em] block mb-1">
                  CAST INTEGRATION
                </span>
                <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-white">
                  {t.playerTitle.split(' — ')[1]}
                </h3>
                <p className="font-sans text-xs text-stone-500 mt-2 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                  Используйте наш кастомный интерактивный плеер для воспроизведения. Любой сингл или альбом можно прослушать непосредственно здесь.
                </p>
              </div>

              {/* The Audio Player */}
              <div className="w-full">
                <AudioPlayer selectedAlbumId={selectedAlbum === 'all' ? undefined : selectedAlbum} />
              </div>

              {/* Tab Selector Filtering */}
              <div className="bg-[#0b0b0b] border border-stone-900 rounded-lg p-3 flex items-center justify-around text-xs font-sans font-bold uppercase">
                <button
                  onClick={() => setSelectedAlbum('all')}
                  className={`px-3 py-1.5 rounded transition-all duration-300 ${
                    selectedAlbum === 'all' ? 'bg-[#c41e1e] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => setSelectedAlbum('sled')}
                  className={`px-3 py-1.5 rounded transition-all duration-300 ${
                    selectedAlbum === 'sled' ? 'bg-[#c41e1e] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  След
                </button>
                <button
                  onClick={() => setSelectedAlbum('proklyaty')}
                  className={`px-3 py-1.5 rounded transition-all duration-300 ${
                    selectedAlbum === 'proklyaty' ? 'bg-[#c41e1e] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Проклятый
                </button>
                <button
                  onClick={() => setSelectedAlbum('singles')}
                  className={`px-3 py-1.5 rounded transition-all duration-300 ${
                    selectedAlbum === 'singles' ? 'bg-[#c41e1e] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Синглы
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: CORE ALBUMS AND SINGLES LISTING */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* ALBUMS SEGMENT */}
              {selectedAlbum !== 'singles' && (
                <div className="space-y-12">
                  <h2 className="font-sans text-2xl font-black uppercase text-white tracking-widest border-l-4 border-[#c41e1e] pl-3.5">
                    {t.discoAlbums}
                  </h2>

                  {ALBUMLIST.filter(a => selectedAlbum === 'all' || a.id === selectedAlbum).map((album) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="bg-[#0b0b0b] border border-stone-900/80 rounded-xl overflow-hidden shadow-2xl relative"
                    >
                      {/* Decorative red edge line */}
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-[#c41e1e]" />

                      {/* Header block with cover & distribution links */}
                      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-900 gap-6">
                        <div className="flex items-center space-x-5">
                           {/* Album Cover */}
                           <div className="w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border border-red-950/40 flex-shrink-0">
                             <img src={album.cover} alt={t[album.titleKey]} className="w-full h-full object-cover" />
                           </div>
                          
                          <div>
                            <span className="font-mono text-[9px] text-[#c41e1e] font-bold tracking-widest uppercase block">
                              ALBUM LP • {album.year}
                            </span>
                            <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                              {t[album.titleKey]}
                            </h3>
                            <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider block mt-1">
                              {album.songsCount} COMPOSITIONS
                            </span>
                          </div>
                        </div>

                        {/* Distribution Link */}
                        <a
                          href={album.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#121212] border border-stone-800 rounded text-xs font-bold font-sans uppercase text-stone-300 hover:text-white hover:border-[#c41e1e]/60 hover:bg-[#1a1a1a] transition-all duration-300 group"
                        >
                          <span>{t.listenPlatformBtn}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#c41e1e] group-hover:translate-x-0.5" />
                        </a>
                      </div>

                      {/* Tracks listing with selection interaction indications */}
                      <div className="p-6 sm:p-8 bg-[#070707]/30">
                        <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest block mb-4">
                          SELECT TRACK TO EMIT SIGNALS
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {getTracklistByLang(album.id).map((trackName, index) => (
                            <div
                              key={`${album.id}-${index}`}
                              className="text-left flex items-center justify-between p-2 rounded bg-[#0b0b0b]/80 border border-stone-900 text-xs text-stone-400 font-sans hover:border-[#c41e1e]/30 hover:text-white transition-all duration-200 cursor-pointer group"
                            >
                              <div className="flex items-center space-x-2.5 truncate">
                                <span className="font-mono text-[9px] text-stone-600 font-semibold w-4">
                                  {(index + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="truncate">{trackName}</span>
                              </div>
                              <Play className="w-3.5 h-3.5 text-stone-700 opacity-0 group-hover:opacity-100 group-hover:text-[#c41e1e] transition-all duration-200" />
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              )}

              {/* SINGLES SEGMENT */}
              {selectedAlbum !== 'proklyaty' && selectedAlbum !== 'sled' && (
                <div className="space-y-8 pt-8 lg:pt-0">
                  <h2 className="font-sans text-2xl font-black uppercase text-white tracking-widest border-l-4 border-[#c41e1e] pl-3.5">
                    {t.discoSingles}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {SINGLELIST.map((single) => {
                      const titleStr = single.title[lang as 'ru' | 'by' | 'en'] || single.title['ru'];
                      return (
                        <motion.div
                          key={single.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#0b0b0b] border border-stone-900 rounded-lg p-5 flex flex-col justify-between hover:border-red-950/60 transition-all duration-300 relative group"
                        >
                          <div className="space-y-4">
                             {/* Single Cover */}
                             <div className="aspect-square w-full rounded overflow-hidden border border-stone-800">
                               <img src={single.cover} alt={titleStr} className="w-full h-full object-cover" />
                             </div>

                            <div>
                              <span className="font-mono text-[8px] text-[#c41e1e] uppercase tracking-widest font-bold block">
                                SINGLE INJECT • {single.year}
                              </span>
                              <h4 className="font-sans text-sm font-extrabold tracking-wide text-white mt-1 group-hover:text-[#c41e1e] transition-colors">
                                {titleStr}
                              </h4>
                            </div>
                          </div>

                          {/* Action links */}
                          <div className="pt-4 mt-4 border-t border-stone-900/80">
                            <a
                              href={single.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center space-x-1.5 py-1.5 bg-[#121212] border border-stone-800 rounded text-[10px] font-bold font-sans uppercase text-stone-400 hover:text-white hover:border-[#c41e1e]/40 transition-all duration-300"
                            >
                              <span>LISTEN</span>
                              <ExternalLink className="w-3 h-3 text-[#c41e1e]" />
                            </a>
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Red divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-red-900/35 to-transparent w-full" />

      <Footer />

    </div>
  );
}

export default function Discography() {
  return (
    <LanguageProvider>
      <DiscographyContent />
    </LanguageProvider>
  );
}
