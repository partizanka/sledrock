'use client';

import React from 'react';
import Image from 'next/image';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Skull, Flame, Star, Quote, Award } from 'lucide-react';

interface Member {
  name: string;
  instrumentKey: 'memberRoleGuitars' | 'memberRoleBass' | 'memberRoleVocals' | 'memberRoleDrums' | 'memberRoleViolin';
  id: string;
  photo: string;
}

const MEMBERS: Member[] = [
  { name: "Александр Дробязко", instrumentKey: "memberRoleGuitars", id: "guitar", photo: "/images/band/members/drobyazko.webp" },
  { name: "Виталий Сарока", instrumentKey: "memberRoleBass", id: "bass", photo: "/images/band/members/saroka.webp" },
  { name: "Юрий Леонов", instrumentKey: "memberRoleVocals", id: "vocals", photo: "/images/band/members/leonov.webp" },
  { name: "Олег Лозовой", instrumentKey: "memberRoleDrums", id: "drums", photo: "/images/band/members/lozovoy.webp" },
  { name: "Татьяна Асиевская-Ахламенок", instrumentKey: "memberRoleViolin", id: "violin", photo: "/images/band/members/ahlamenok.webp" }
];

function AboutContent() {
  const { t } = useLanguage();

  const achievementsList = [
    t.ach1,
    t.ach2,
    t.ach3,
    t.ach4,
    t.ach5,
    t.ach6,
    t.ach7
  ];

  const factsList = [
    { num: "I", text: t.fact1, label: "Акроним СЛЕD" },
    { num: "II", text: t.fact2, label: "Возвращение Леонова" },
    { num: "III", text: t.fact3, label: "Алёна Коробейник 2024" }
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Noise layer background */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      <Header />

      {/* Hero Header Space */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#1a0505] to-[#060606] overflow-hidden">
        
        {/* Absolute Glowing Circle behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c41e1e]/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-red-950/20 border border-red-950/40 text-[#c41e1e] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Skull className="w-3.5 h-3.5" />
            <span>Minsk Noir</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-wider text-white"
          >
            {t.aboutTitle}
          </motion.h1>
          <div className="w-24 h-[1.5px] bg-[#c41e1e] mx-auto mt-4" />
        </div>
      </section>

      {/* SECTION 1: DETAILED BIOGRAPHY / КТО МЫ ТАККИЕ */}
      <section className="py-20 relative bg-[#060606]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Quote decoration */}
            <div className="lg:col-span-4 relative">
              <div className="relative p-8 bg-[#0b0b0b] border-l-4 border-[#c41e1e] rounded-r-lg space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <Quote className="w-10 h-10 text-[#c41e1e] opacity-45 absolute top-4 right-4" />
                <h3 className="font-sans text-lg font-bold text-white tracking-wide uppercase">
                  {t.navTitle}
                </h3>
                <p className="font-sans text-xs italic text-stone-400 leading-relaxed pt-2">
                  «Наша музыка сочетает в себе атмосферу ужаса, киноцитаты и драйвовое гитарное соло со скрипкой... Мы хотим оставить глубокий СЛЕD в ваших душах.»
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-stone-600 block">EST. MINSK, 2019</span>
                  <span className="font-mono text-[9px] text-[#c41e1e] uppercase tracking-widest block">HORROR PUNK ROCK</span>
                </div>
              </div>
            </div>

            {/* Core Narrative */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-sans text-2xl font-black uppercase text-white tracking-widest border-l-2 border-[#c41e1e] pl-3.5">
                {t.aboutBioTitle}
              </h2>
              <p className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed">
                {t.aboutBioText1}
              </p>
              <p className="font-sans text-[#a5a5a5] text-sm sm:text-base leading-relaxed">
                {t.aboutBioText2}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: BAND MEMBERS GRIDS / СОСТАВ ГРУППЫ */}
      <section className="py-20 border-t border-red-950/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.2em] font-bold block mb-2">
              LINEUP
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-wider text-white uppercase">
              {t.bandMembersTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e1e] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MEMBERS.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#0b0b0b] border border-stone-900 rounded-lg overflow-hidden shadow-lg hover:border-red-950/60 transition-all duration-300 group"
              >
                 {/* Member Photo */}
                 <div className="relative aspect-[3/4] w-full bg-[#121212] overflow-hidden flex items-center justify-center">

                   {/* Fallback skull (shown behind photo) */}
                   <div className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center p-4">
                     <Skull className="w-10 h-10 text-stone-800 mb-2 opacity-50" />
                     <span className="font-mono text-[9px] text-stone-600 tracking-wider">NO_SIGNAL</span>
                   </div>

                   <Image
                     src={member.photo}
                     alt={member.name}
                     fill
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                     className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                   />

                   {/* Dark gradient overlay at bottom */}
                   <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060606]/80 to-transparent pointer-events-none" />

                   {/* Red Frame Overlay on hover */}
                   <div className="absolute inset-2 border border-transparent group-hover:border-[#c41e1e]/40 transition-all duration-500 pointer-events-none" />

                   {/* Member index stripe */}
                   <span className="absolute top-3 left-3 z-10 font-mono text-[10px] text-stone-400 font-bold">
                     S_0{idx + 1}
                   </span>
                 </div>

                {/* Info and Role details */}
                <div className="p-4 bg-[#0a0a0b] border-t border-stone-900">
                  <h4 className="font-sans text-sm font-bold text-white tracking-wide truncate group-hover:text-[#c41e1e] transition-colors">
                    {member.name}
                  </h4>
                  <p className="font-mono text-[9px] text-[#c41e1e] uppercase tracking-widest mt-1">
                    {t[member.instrumentKey]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: INTERESTING FACTS / ИНТЕРЕСНЫЕ ФАКТЫ */}
      <section className="py-20 bg-gradient-to-b from-[#080808] to-[#050505] relative overflow-hidden">
        
        {/* Spot light overlay */}
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[#c41e1e]/3 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.2em] font-bold block mb-2">
              LORE & MYSTERY
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-wider text-white uppercase">
              {t.factsTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e1e] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {factsList.map((fact, idx) => (
              <div 
                key={fact.num}
                className="bg-[#0b0b0b] border border-stone-900 rounded-lg p-8 relative shadow-xl hover:border-red-950/60 transition-all duration-300 group"
              >
                {/* Index marker */}
                <div className="w-10 h-10 rounded-full border border-red-950/40 flex items-center justify-center bg-[#070707] text-[#c41e1e] font-sans font-bold text-sm mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                  {fact.num}
                </div>

                <h4 className="font-sans text-sm font-extrabold text-white tracking-widest uppercase mb-3 border-b border-stone-900 pb-2">
                  {fact.label}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                  {fact.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: DETAILED CHRONICLES ACHLIST / ДОСТИЖЕНИЯ */}
      <section className="py-20 border-t border-red-950/10 bg-[#060606]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[#c41e1e] uppercase tracking-[0.2em] font-bold block mb-2">
              CHRONOLOGY
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-wider text-white uppercase">
              {t.achievementsTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e1e] mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {achievementsList.map((ach, idx) => (
              <motion.div
                key={`ach-full-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-start bg-[#0b0b0b] border border-stone-900/40 p-5 rounded-lg hover:border-red-950/60 hover:bg-[#0e0e0f] transition-all duration-300"
              >
                {/* Award icon container */}
                <div className="p-2.5 bg-[#050505] border border-stone-800 rounded-md text-[#c41e1e] mr-4 flex-shrink-0 shadow-md">
                  <Award className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#c41e1e] font-semibold tracking-wider block uppercase">
                    MILESTONE_0{idx + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {ach}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Accent Blood divider strip */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c41e1e]/45 to-transparent w-full" />

      <Footer />

    </div>
  );
}

export default function About() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
}
