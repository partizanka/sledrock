'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Flame, Disc } from 'lucide-react';

interface Track {
  titleRu: string;
  titleBy: string;
  titleEn: string;
  album: 'proklyaty' | 'sled' | 'singles';
  duration: string;
  src: string;
}

const ALL_TRACKS: Track[] = [
  // Проклятый (2025)
  { titleRu: "Человек с 1000 лиц", titleBy: "Чалавек з 1000 твараў", titleEn: "Man of 1000 Faces", album: "proklyaty", duration: "6:11", src: "/music/proklyaty/chelovek-s-1000-lic.mp3" },
  { titleRu: "Призрак", titleBy: "Прывід", titleEn: "The Ghost", album: "proklyaty", duration: "3:42", src: "/music/proklyaty/prizrak.mp3" },
  { titleRu: "Дуллахан", titleBy: "Дулахан", titleEn: "Dullahan", album: "proklyaty", duration: "4:24", src: "/music/proklyaty/dullahan.mp3" },
  { titleRu: "Кейн", titleBy: "Кейн", titleEn: "Cain", album: "proklyaty", duration: "3:24", src: "/music/proklyaty/keyn.mp3" },
  { titleRu: "Фокусник", titleBy: "Фокуснік", titleEn: "The Magician", album: "proklyaty", duration: "2:46", src: "/music/proklyaty/fokusnik.mp3" },
  { titleRu: "Мессия", titleBy: "Месія", titleEn: "Messiah", album: "proklyaty", duration: "6:03", src: "/music/proklyaty/messiya.mp3" },
  { titleRu: "Проклятый", titleBy: "Пракляты", titleEn: "The Cursed", album: "proklyaty", duration: "3:57", src: "/music/proklyaty/proklyaty.mp3" },
  { titleRu: "Ведьмак", titleBy: "Ведзьмак", titleEn: "The Witcher", album: "proklyaty", duration: "3:06", src: "/music/proklyaty/vedmak.mp3" },
  { titleRu: "Сирены", titleBy: "Сірэны", titleEn: "Sirens", album: "proklyaty", duration: "4:41", src: "/music/proklyaty/sireny.mp3" },
  { titleRu: "Портрет", titleBy: "Партрэт", titleEn: "The Portrait", album: "proklyaty", duration: "3:34", src: "/music/proklyaty/portret.mp3" },
  { titleRu: "Впусти меня", titleBy: "Упусці мяне", titleEn: "Let Me In", album: "proklyaty", duration: "4:35", src: "/music/proklyaty/vpusti-menya.mp3" },
  { titleRu: "Оборотень", titleBy: "Пярэварацень", titleEn: "The Werewolf", album: "proklyaty", duration: "3:30", src: "/music/proklyaty/oboroten.mp3" },
  { titleRu: "Кукольник", titleBy: "Лялечнік", titleEn: "The Puppeteer", album: "proklyaty", duration: "3:31", src: "/music/proklyaty/kukolnik.mp3" },
  { titleRu: "Брат за брата", titleBy: "Брат за брата", titleEn: "Brother for Brother", album: "proklyaty", duration: "3:38", src: "/music/proklyaty/brat-za-brata.mp3" },
  { titleRu: "Поцелуй вампира", titleBy: "Пацалунак вампіра", titleEn: "Vampire's Kiss", album: "proklyaty", duration: "3:10", src: "/music/proklyaty/poceluy-vampira.mp3" },

  // След (2026)
  { titleRu: "Интро", titleBy: "Інтра", titleEn: "Intro", album: "sled", duration: "1:15", src: "/music/sled/intro.mp3" },
  { titleRu: "След", titleBy: "След", titleEn: "SLED (The Trace)", album: "sled", duration: "2:38", src: "/music/sled/sled.mp3" },
  { titleRu: "Ловец снов", titleBy: "Лавец сноў", titleEn: "Dreamcatcher", album: "sled", duration: "3:20", src: "/music/sled/lovec-snov.mp3" },
  { titleRu: "Пиратская история", titleBy: "Пірацкая гісторыя", titleEn: "Pirate Tale", album: "sled", duration: "5:34", src: "/music/sled/piratskaya-istoriya.mp3" },
  { titleRu: "Бой", titleBy: "Бой", titleEn: "The Fight", album: "sled", duration: "5:06", src: "/music/sled/boy.mp3" },
  { titleRu: "Смотритель маяка", titleBy: "Даглядчык маяка", titleEn: "Lighthouse Keeper", album: "sled", duration: "5:04", src: "/music/sled/smotritel-mayaka.mp3" },
  { titleRu: "Беглецы", titleBy: "Уцекачы", titleEn: "The Fugitives", album: "sled", duration: "4:07", src: "/music/sled/beglecy.mp3" },
  { titleRu: "Грустный клоун", titleBy: "Смутны клоўн", titleEn: "Sad Clown", album: "sled", duration: "5:48", src: "/music/sled/grustnyy-kloun.mp3" },
  { titleRu: "Реквием о любви", titleBy: "Рэквіем пра каханне", titleEn: "Requiem for Love", album: "sled", duration: "4:50", src: "/music/sled/rekviem-o-lyubvi.mp3" },
  { titleRu: "Аутро", titleBy: "Аўтра", titleEn: "Outro", album: "sled", duration: "2:50", src: "/music/sled/autro.mp3" },

  // Синглы
  { titleRu: "Новогодняя", titleBy: "Навагодняя", titleEn: "New Year's Song", album: "singles", duration: "2:16", src: "/music/singles/novogodnyaya.mp3" },
  { titleRu: "Мессия (Сингл)", titleBy: "Месія (Сінгл)", titleEn: "Messiah (Single)", album: "singles", duration: "6:13", src: "/music/singles/messiya.mp3" },
  { titleRu: "Бой", titleBy: "Бой", titleEn: "The Fight", album: "singles", duration: "5:06", src: "/music/singles/boy.mp3" }
];

export default function AudioPlayer({ selectedAlbumId }: { selectedAlbumId?: 'proklyaty' | 'sled' | 'singles' }) {
  const { lang, t } = useLanguage();

  const filteredTracks = selectedAlbumId
    ? ALL_TRACKS.filter(track => track.album === selectedAlbumId)
    : ALL_TRACKS;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = filteredTracks[currentTrackIndex] || filteredTracks[0];

  function getTrackTitle(track: Track) {
    if (lang === 'by') return track.titleBy;
    if (lang === 'en') return track.titleEn;
    return track.titleRu;
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  function handleNext() {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= filteredTracks.length) nextIndex = 0;
    setCurrentTrackIndex(nextIndex);
  }

  function handlePrev() {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) prevIndex = filteredTracks.length - 1;
    setCurrentTrackIndex(prevIndex);
  }

  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
    setCurrentTime(val);
  }

  function formatTime(timeInSecs: number) {
    if (isNaN(timeInSecs)) return '0:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Громкость / mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Смена трека: грузим новый src и играем, если был запущен
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  return (
    <div
      id="custom-audio-player"
      className="bg-[#0f0f0f] border border-red-950/60 rounded-xl max-w-lg mx-auto overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
    >
      {/* Реальный аудиоэлемент */}
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleNext}
      />

      {/* Decorative metal rivets/gothic outline grid */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-stone-800 border border-stone-600"></div>
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-stone-800 border border-stone-600"></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-stone-800 border border-stone-600"></div>
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-stone-800 border border-stone-600"></div>

      {/* Screen/Display Portion */}
      <div className="p-6 bg-[#070707] border-b border-red-950/40 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Disc className={`w-5 h-5 text-[#c41e1e] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[9px] text-[#c41e1e] tracking-widest uppercase">
              {currentTime > 0 ? t.playerNowPlaying : t.playerTitle.split(' — ')[0]}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[9px] text-stone-500 uppercase">SYS_ACTIVE</span>
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-600 animate-pulse shadow-[0_0_5px_#ef4444]' : 'bg-red-950'}`}></div>
          </div>
        </div>

        <div className="h-10 overflow-hidden relative mb-2">
          <h3 className="font-sans text-lg font-bold text-white tracking-wide pr-8 truncate">
            {getTrackTitle(currentTrack)}
          </h3>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            {currentTrack.album === 'sled' ? t.albumSledTitle : currentTrack.album === 'proklyaty' ? t.albumProklyatyTitle : 'СИНГЛ / SINGLE'}
          </p>
        </div>

        <div className="h-8 w-full mt-4 rounded bg-[#030303] border border-stone-900 overflow-hidden relative flex items-center justify-center">
          {!isPlaying && (
            <span className="font-mono text-[9px] text-stone-700 tracking-wider uppercase">
              {t.playerPlaceholder.slice(0, 35)}...
            </span>
          )}
        </div>
      </div>

      {/* Control Area */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full accent-[#c41e1e] h-1 bg-stone-900 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-stone-500">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : currentTrack.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 w-24">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-stone-400 hover:text-[#c41e1e] transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full accent-stone-400 h-[3px] bg-stone-900 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handlePrev} className="p-2 border border-stone-900 rounded-full hover:border-red-900 hover:text-[#c41e1e] text-stone-400 transition-all duration-300">
              <SkipBack className="w-4 h-4" />
            </button>
            <button onClick={togglePlay} className="p-4 bg-gradient-to-br from-[#c41e1e] to-[#7f1212] rounded-full text-white shadow-[0_0_15px_rgba(196,30,30,0.5)] hover:scale-105 hover:shadow-[0_0_25px_rgba(196,30,30,0.8)] transition-all duration-300 focus:outline-none">
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-[1px]" />}
            </button>
            <button onClick={handleNext} className="p-2 border border-stone-900 rounded-full hover:border-red-900 hover:text-[#c41e1e] text-stone-400 transition-all duration-300">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-24 text-right flex justify-end">
            <div className="inline-flex items-center px-2 py-0.5 rounded bg-red-950/20 border border-red-950/40 text-stone-500 font-mono text-[8px] tracking-widest uppercase">
              <Flame className="w-2 h-2 text-[#c41e1e] mr-1" />
              <span>S_DECAY</span>
            </div>
          </div>
        </div>

        {/* Track list */}
        <div className="pt-4 border-t border-stone-900">
          <div className="text-stone-400 font-sans text-xs font-bold uppercase mb-2 tracking-widest border-l-2 border-[#c41e1e] pl-1.5 flex justify-between items-center">
            <span>{t.playerTracklist}</span>
            <span className="font-mono text-[9px] text-stone-600 font-normal">TRACKS: {filteredTracks.length}</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
            {filteredTracks.map((track, idx) => {
              const isCurrent = idx === currentTrackIndex;
              return (
                <button
                  key={`${track.titleRu}-${idx}`}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left flex items-center justify-between p-2 rounded text-xs transition-all duration-200 border ${
                    isCurrent
                      ? 'bg-red-950/10 border-red-900/40 text-white font-medium shadow-[inset_0_0_10px_rgba(196,30,30,0.05)]'
                      : 'bg-[#0b0b0b] border-stone-900/50 text-stone-400 hover:border-stone-800/80 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="font-mono text-[10px] text-stone-600 w-4">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="truncate">{getTrackTitle(track)}</span>
                  </div>
                  <span className="font-mono text-[10px] text-stone-600 pl-2">{track.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}