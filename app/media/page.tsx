'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Film, Image as ImageIcon, Play, Skull, Flame, ZoomIn, Eye } from 'lucide-react';
import Image from 'next/image';

interface MediaPhoto {
  id: string;
  src: string;
  captionKey: 'photoCaption1' | 'photoCaption2' | 'photoCaption3' | 'photoCaption4' | 'photoCaption5' | 'photoCaption6';
}

const PHOTOS: MediaPhoto[] = [
  { id: "p1", src: "/images/media/photo-1.webp", captionKey: "photoCaption1" },
  { id: "p2", src: "/images/media/photo-2.webp", captionKey: "photoCaption2" },
  { id: "p3", src: "/images/media/photo-3.webp", captionKey: "photoCaption3" },
  { id: "p4", src: "/images/media/photo-4.webp", captionKey: "photoCaption4" },
  { id: "p5", src: "/images/media/photo-5.webp", captionKey: "photoCaption5" },
  { id: "p6", src: "/images/media/photo-6.webp", captionKey: "photoCaption6" }
];

interface MediaVideo {
  id: string;
  embedId: string; // YouTube video ID or placeholder
  title: string;
  category: { ru: string; by: string; en: string };
}

const VIDEOS: MediaVideo[] = [
  { 
    id: "v1", 
    embedId: "IVM_3cReJv8", 
    title: "СЛЕD на фестивале Солнцестояние 2025 (Пружаны)", 
    category: { ru: "Выступление", by: "Выступленне", en: "Live Performance" } 
  },
  { 
    id: "v2", 
    embedId: "9jdCW-P3fB0", 
    title: "СЛЕD — альбом Проклятый 2025", 
    category: { ru: "Полный альбом", by: "Поўны альбом", en: "Full Album" } 
  }, 
  { 
    id: "v3", 
    embedId: "PNEqSbwvZfM", 
    title: "СЛЕD — А-ктобер фест 2023 (Минск)", 
    category: { ru: "Промо", by: "Прома", en: "Promo" } 
  }
];

function MediaContent() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activePhotos = PHOTOS;
  const activeVideos = VIDEOS;

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Background heavy scanline vignette */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      <Header />

      {/* Page Header banner */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#180505] to-[#060606]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c41e1e]/4 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-[#101010] border border-red-950/40 text-[#c41e1e] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Miasma Gallery</span>
          </motion.div>
          
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
            {t.mediaTitle}
          </h1>
          <p className="font-sans text-stone-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            {t.mediaSubtitle}
          </p>
          <div className="w-24 h-[1.5px] bg-[#c41e1e] mx-auto mt-4" />
        </div>
      </section>

      {/* MEDIA INTERACTION CONTAINER */}
      <section className="py-12 bg-[#060606] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Visual Tab controller buttons */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-sans font-extrabold uppercase text-xs tracking-wider rounded border transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-[#c41e1e] border-red-900 text-white shadow-md shadow-red-950/50' 
                  : 'bg-[#101010] border-stone-900 text-stone-400 hover:text-white hover:border-red-950/45'
              }`}
            >
              Все медиа
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 font-sans font-extrabold uppercase text-xs tracking-wider rounded border transition-all duration-300 ${
                activeTab === 'video' 
                  ? 'bg-[#c41e1e] border-red-900 text-white shadow-md shadow-red-950/50' 
                  : 'bg-[#101010] border-stone-900 text-stone-400 hover:text-white hover:border-red-950/45'
              }`}
            >
              <Film className="w-3.5 h-3.5 inline mr-1.5" /> Видео
            </button>
            <button
              onClick={() => setActiveTab('photo')}
              className={`px-4 py-2 font-sans font-extrabold uppercase text-xs tracking-wider rounded border transition-all duration-300 ${
                activeTab === 'photo' 
                  ? 'bg-[#c41e1e] border-red-900 text-white shadow-md shadow-red-950/50' 
                  : 'bg-[#101010] border-stone-900 text-stone-400 hover:text-white hover:border-red-950/45'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 inline mr-1.5" /> Фото
            </button>
          </div>

          {/* VIDEOS SECTION */}
          {activeTab !== 'photo' && (
            <div className="space-y-8 mb-16">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#c41e1e] border-l-2 border-[#c41e1e] pl-3">
                {t.videoGalleryTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0b0b0b] border border-stone-900 rounded-lg overflow-hidden shadow-2xl group hover:border-red-950/40 transition-all duration-300"
                  >
                    {/* Responsive iFrame block */}
                    <div className="relative aspect-video w-full bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0 select-none opacity-80 group-hover:opacity-100 transition-opacity"
                      ></iframe>
                    </div>

                    {/* Metadata */}
                    <div className="p-4 bg-[#0a0a0b] border-t border-stone-900/40">
                      <span className="font-mono text-[8px] text-[#c41e1e] uppercase tracking-widest font-bold block mb-1">
                        {video.category[lang as 'ru' | 'by' | 'en'] || video.category['ru']}
                      </span>
                      <h4 className="font-sans text-sm font-bold text-white tracking-wide truncate group-hover:text-[#c41e1e] transition-colors">
                        {video.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* PHOTOS SECTION */}
          {activeTab !== 'video' && (
            <div className="space-y-8">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#c41e1e] border-l-2 border-[#c41e1e] pl-3">
                {t.photoGalleryTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    onClick={() => setLightboxIndex(idx)}
                    className="bg-[#0b0b0b] border border-stone-900 rounded-lg overflow-hidden shadow-lg hover:border-red-950/65 transition-all duration-300 group cursor-pointer relative"
                  >
                    {/* Picture wrapper with hover details */}
                    <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#121212] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={t[photo.captionKey]}
                        fill
                        className="object-cover opacity-60 filter grayscale group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-500"
                      />

                      {/* Hover Overlay Vignette */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center space-x-2 text-xs text-white">
                          <Eye className="w-3.5 h-3.5 text-[#c41e1e]" />
                          <span className="font-sans font-bold truncate pr-3">{t[photo.captionKey]}</span>
                        </div>
                      </div>

                      {/* Hover Zoom Indicator */}
                      <div className="absolute top-3 right-3 p-1.5 bg-black/80 rounded border border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#c41e1e]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* LIGHTBOX INTERACTIVE COMPONENT */}
      {lightboxIndex !== null && (
        <div
          id="lightbox-backdrop"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out backdrop-blur-md transition-opacity duration-300"
        >
          {/* Lightbox photo panel */}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center pointer-events-none">
            <Image
              src={PHOTOS[lightboxIndex].src}
              alt={t[PHOTOS[lightboxIndex].captionKey]}
              width={800}
              height={600}
              className="object-contain max-h-full rounded border border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
            />
          </div>
          
          {/* Lightbox translation caption */}
          <div className="mt-4 text-center max-w-lg bg-[#0a0a0b]/90 border border-stone-900 rounded p-3 text-sm font-sans tracking-wide">
            <p className="font-sans font-extrabold text-[#c41e1e] uppercase text-[10px] tracking-widest mb-1 select-none">
              PHOTOGRAPHY SCAN
            </p>
            <p className="text-stone-200">
              {t[PHOTOS[lightboxIndex].captionKey]}
            </p>
          </div>
          
          {/* Close instructions */}
          <span className="absolute top-4 right-4 font-mono text-[9px] text-[#c41e1e] uppercase tracking-widest select-none">
            [ Кликните в любом месте для закрытия ]
          </span>
        </div>
      )}

      {/* Red divider stripe */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-red-900/35 to-transparent w-full" />

      <Footer />

    </div>
  );
}

export default function Media() {
  return (
    <LanguageProvider>
      <MediaContent />
    </LanguageProvider>
  );
}
