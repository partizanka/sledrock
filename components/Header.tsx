'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { Menu, X, Skull, Radio, Flame } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.navHome, path: '/' },
    { name: t.navAbout, path: '/about' },
    { name: t.navDiscography, path: '/discography' },
    { name: t.navMedia, path: '/media' },
    { name: t.navConcerts, path: '/concerts' },
    { name: t.navContacts, path: '/contacts' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[#0a0a0add]/95 backdrop-blur-md py-3 border-red-950/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" id="header-logo" className="flex items-center space-x-2 group">
            <div className="relative">
              <Flame className="w-8 h-8 text-[#c41e1e] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#c41e1e]" />
              <Skull className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] opacity-80" />
            </div>
            
            {/* Custom SVG logo typeface for "СЛЕD" with a distinct horror serif feel */}
            <span className="font-sans text-3xl font-extrabold tracking-widest text-white transition-all duration-300 group-hover:text-[#c41e1e] group-hover:drop-shadow-[0_0_8px_#c41e1e] relative">
              СЛЕ<span className="text-[#c41e1e]">D</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c41e1e] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  id={`nav-link-${item.path.replace('/', 'home')}`}
                  href={item.path}
                  className={`font-sans text-sm tracking-wider uppercase font-medium relative py-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-[#c41e1e] drop-shadow-[0_0_4px_rgba(196,30,30,0.4)]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {/* Underline indicators */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#c41e1e] transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_5px_#c41e1e]' : 'w-0 hover:w-full'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* LANGUAGE SELECTOR & BURGER BUTTON */}
          <div className="flex items-center space-x-4">
            
            {/* LANGUAGE SELECTOR */}
            <div id="language-selector" className="flex items-center bg-[#151515] border border-stone-800 rounded px-1 py-1 text-xs">
              {(['ru', 'by', 'en'] as const).map((l) => (
                <button
                  key={l}
                  id={`lang-btn-${l}`}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded font-bold uppercase transition-all duration-300 ${
                    lang === l
                      ? 'bg-[#c41e1e] text-white shadow-[0_0_8px_rgba(196,30,30,0.6)]'
                      : 'text-gray-400 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-red-800 rounded transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#c41e1e]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        id="mobile-drawer"
        className={`fixed inset-y-0 right-0 w-64 bg-[#0d0d0dfc]/95 backdrop-blur-lg border-l border-red-950/40 p-6 z-40 transform transition-transform duration-500 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden flex flex-col justify-between`}
      >
        <div className="mt-16">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-4 mb-6">
            <Radio className="w-5 h-5 text-[#c41e1e] animate-pulse" />
            <span className="font-sans text-xl font-bold uppercase tracking-wider text-white">
              МЕНЮ <span className="text-[#c41e1e]">СЛЕD</span>
            </span>
          </div>

          <nav id="mobile-nav" className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  id={`mobile-nav-link-${item.path.replace('/', 'home')}`}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-sans block text-base uppercase tracking-wider py-2 border-b border-stone-900 transition-colors duration-300 ${
                    isActive ? 'text-[#c41e1e] font-semibold pl-2 border-l-2 border-l-[#c41e1e]' : 'text-gray-300 hover:text-white hover:pl-2'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Brand stamp inside Drawer */}
        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="font-sans text-xs text-gray-500 tracking-wider uppercase mb-1">MINSK HORROR PUNK</p>
          <p className="font-mono text-[10px] text-[#c41e1e] tracking-widest">EST. 2019</p>
        </div>
      </div>

      {/* Backdrop for open drawer */}
      {isOpen && (
        <div
          id="mobile-backdrop"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 z-30 lg:hidden cursor-pointer backdrop-blur-xs"
        />
      )}
    </header>
  );
}
