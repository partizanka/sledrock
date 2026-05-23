'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Youtube, Instagram, Flame, Send } from 'lucide-react';

// Custom VK icon since Lucide doesn't include it directly
function VkIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M15.071 2H8.93C3.344 2 2 3.344 2 8.93v6.14C2 20.656 3.344 22 8.93 22h6.14c5.586 0 6.93-1.344 6.93-6.93V8.93C22 3.344 20.656 2 15.07 2zm3.303 13.903c-.27.42-.876.812-1.391.815-1.144.004-3.136-.07-5.068-1.785-1.92-1.705-3.359-4.223-4.522-6.52-.164-.326-.062-.516.326-.516h1.722c.307 0 .463.155.556.368c.594 1.353 1.488 2.858 2.302 3.52c.28.228.435.303.585.122c.15-.18.12-.663.12-1.146v-2.031c0-.627-.152-.862-.647-.905c-.217-.02-.352-.102-.232-.234c.18-.198.63-.393 1.17-.393h1.411c.49 0 .616.223.616.786V13.04c0 .356.096.471.218.328c.365-.43 1.189-1.905 1.765-3.411c.094-.249.25-.369.56-.369h1.722c.489 0 .616.208.487.585c-.452 1.328-2.071 4.144-2.228 4.492c-.22.483.056.68.21.802c.592.47 1.551 1.411 1.944 1.914c.394.502.138.86-.33.86z"/>
    </svg>
  );
}

// Custom TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12.525.02c1.31.02 2.61.1 3.91.24v3.4c-.74-.08-1.5-.1-2.24-.07v12.02c.01 4.45-5.18 6.55-7.85 3.55c-2.18-2.45-1.12-6.55 2.13-6.66V16c-1.55.13-2.19 1.55-1.6 2.65c.67 1.25 3.02 1.15 3.12-.48V.02h2.53zm5.72 3.6c.92.83 2.11 1.35 3.4 1.47v3.35c-1.3-.06-2.52-.64-3.4-1.55c-.01 1.25-.38 2.45-1.07 3.46c-.7-.95-1.35-1.99-1.93-3.08c1.1-.92 2.1-2.3 3-3.65z"/>
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  
  const socialLinks = [
    { name: 'VKontakte', icon: VkIcon, url: 'https://vk.com/sled.rockband', color: 'hover:text-[#4c75a3]' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/sled.rockband', color: 'hover:text-[#e1306c]' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@sledrockband', color: 'hover:text-[#00f2fe]' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@sled.rockband', color: 'hover:text-[#ff0000]' },
  ];

  const quickLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navAbout, path: '/about' },
    { name: t.navDiscography, path: '/discography' },
    { name: t.navMedia, path: '/media' },
    { name: t.navConcerts, path: '/concerts' },
    { name: t.navContacts, path: '/contacts' },
  ];

  return (
    <footer id="main-footer" className="bg-[#050505] text-gray-400 border-t border-red-950/40 relative overflow-hidden">
      
      {/* Subtle Blood-Splat Red Vignette Layer */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c41e1e]/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-2 group mb-4">
              <Flame className="w-6 h-6 text-[#c41e1e] transition-all duration-300 group-hover:scale-110" />
              <span className="font-sans text-2xl font-extrabold tracking-widest text-white">
                СЛЕ<span className="text-[#c41e1e]">D</span>
              </span>
            </Link>
            <p className="font-sans text-xs leading-relaxed text-gray-500 mb-6">
              {t.heroSubtitle}. {t.aboutTeaserText.split('.')[0]}.
            </p>
          </div>

          {/* Core Directory Column */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#c41e1e] mb-4 border-b border-red-950 pb-2">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center"
                  >
                    <span className="text-[#c41e1e] mr-1.5 opacity-50">•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Portals Column */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#c41e1e] mb-4 border-b border-red-950 pb-2">
              {t.followUs}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 p-2 bg-[#101010] border border-stone-900 rounded-md transition-all duration-300 hover:border-red-950/60 text-stone-300 hover:text-white ${social.color}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-sans text-[11px] font-medium">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter / Direct summon Column */}
          <div className="md:col-span-1">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#c41e1e] mb-4 border-b border-red-950 pb-2">
              Букинг
            </h4>
            <p className="font-sans text-xs text-stone-400 mb-3 leading-relaxed">
              {t.bookingText.split(',')[0]}...
            </p>
            <Link 
              href="/contacts" 
              className="inline-flex items-center space-x-2 text-xs text-white bg-gradient-to-r from-red-950 to-stone-950 border border-red-900/40 rounded px-3 py-2 hover:border-[#c41e1e]/60 transition-all duration-300 group shadow-md"
            >
              <Send className="w-3.5 h-3.5 text-[#c41e1e] group-hover:translate-x-0.5" />
              <span>Оставить заявку</span>
            </Link>
          </div>

        </div>

        {/* Separator / Blood Line */}
        <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-[11px] text-stone-600">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} СЛЕD ROCK BAND. Все права защищены.
          </p>
          <p className="font-mono mt-2 sm:mt-0 tracking-widest text-stone-700 uppercase">
            Minsk Horror Punk • Est 2019
          </p>
        </div>
      </div>
    </footer>
  );
}
