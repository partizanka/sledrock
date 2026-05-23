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
}

const ALL_TRACKS: Track[] = [
  // След (2026)
  { titleRu: "След", titleBy: "След", titleEn: "SLED (The Trace)", album: "sled", duration: "3:42" },
  { titleRu: "Ловец снов", titleBy: "Лавец сноў", titleEn: "Dreamcatcher", album: "sled", duration: "4:15" },
  { titleRu: "Пиратская история", titleBy: "Пірацкая гісторыя", titleEn: "Pirate Tale", album: "sled", duration: "3:58" },
  { titleRu: "Бой", titleBy: "Бой", titleEn: "The Fight", album: "sled", duration: "3:20" },
  { titleRu: "Смотритель маяка", titleBy: "Даглядчык маяка", titleEn: "Lighthouse Keeper", album: "sled", duration: "4:50" },
  { titleRu: "Беглецы", titleBy: "Уцекачы", titleEn: "The Fugitives", album: "sled", duration: "3:12" },
  { titleRu: "Грустный клоун", titleBy: "Смутны клоўн", titleEn: "Sad Clown", album: "sled", duration: "3:35" },
  { titleRu: "Реквием о любви", titleBy: "Реквіем аб каханні", titleEn: "Requiem of Love", album: "sled", duration: "4:41" },

  // Проклятый (2025)
  { titleRu: "Человек с 1000 лиц", titleBy: "Чалавек з 1000 твараў", titleEn: "Man with 1000 Faces", album: "proklyaty", duration: "4:05" },
  { titleRu: "Призрак", titleBy: "Прывід", titleEn: "Ghost", album: "proklyaty", duration: "3:40" },
  { titleRu: "Дуллахан", titleBy: "Дулахан", titleEn: "Dullahan", album: "proklyaty", duration: "3:52" },
  { titleRu: "Кейн", titleBy: "Кейн", titleEn: "Kaine", album: "proklyaty", duration: "4:12" },
  { titleRu: "Фокусник", titleBy: "Фокуснік", titleEn: "The Illusionist", album: "proklyaty", duration: "3:28" },
  { titleRu: "Мессия", titleBy: "Месія", titleEn: "Messiah", album: "proklyaty", duration: "4:24" },
  { titleRu: "Проклятый", titleBy: "Пракляты", titleEn: "The Damned", album: "proklyaty", duration: "3:50" },
  { titleRu: "Ведьмак", titleBy: "Ведзьмар", titleEn: "The Witcher", album: "proklyaty", duration: "3:45" },
  { titleRu: "Сирены", titleBy: "Сірэны", titleEn: "Sirens", album: "proklyaty", duration: "4:08" },
  { titleRu: "Портрет", titleBy: "Партрэт", titleEn: "The Portrait", album: "proklyaty", duration: "3:33" },
  { titleRu: "Впусти меня", titleBy: "Упусці мяне", titleEn: "Let Me In", album: "proklyaty", duration: "4:01" },
  { titleRu: "Оборотень", titleBy: "Ваўкалак", titleEn: "Werewolf", album: "proklyaty", duration: "3:55" },
  { titleRu: "Кукольник", titleBy: "Лялечнік", titleEn: "The Puppeteer", album: "proklyaty", duration: "4:19" },
  { titleRu: "Брат за брата", titleBy: "Брат за брата", titleEn: "Brother for Brother", album: "proklyaty", duration: "3:30" },
  { titleRu: "Поцелуй вампира", titleBy: "Пацалунак вампіра", titleEn: "Vampire's Kiss", album: "proklyaty", duration: "5:02" },

  // Синглы
  { titleRu: "Девочка-вампир", titleBy: "Дзяўчынка-вампір", titleEn: "Vampire Girl", album: "singles", duration: "3:15" },
  { titleRu: "Новогодняя", titleBy: "Навагодняя", titleEn: "New Year's Ominous", album: "singles", duration: "3:08" },
  { titleRu: "Мессия (Сингл)", titleBy: "Месія (Сінгл)", titleEn: "Messiah (Single)", album: "singles", duration: "4:24" }
];

export default function AudioPlayer({ selectedAlbumId }: { selectedAlbumId?: 'proklyaty' | 'sled' | 'singles' }) {
  const { lang, t } = useLanguage();
  
  // Filter tracks if an album is pre-selected, otherwise show All
  const filteredTracks = selectedAlbumId 
    ? ALL_TRACKS.filter(track => track.album === selectedAlbumId)
    : ALL_TRACKS;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(222); // default placeholder seconds (3:42)
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // References
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = filteredTracks[currentTrackIndex] || filteredTracks[0];

  // Map track title by language
  function getTrackTitle(track: Track) {
    if (lang === 'by') return track.titleBy;
    if (lang === 'en') return track.titleEn;
    return track.titleRu;
  }

  // Handle Playback State
  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynth();
    } else {
      setIsPlaying(true);
      startSynth();
    }
  }

  // Web Audio Synth implementation for authentic heavy retro goth vibe
  function startSynth() {
    stopSynth();

    // Create AudioContext if not existent
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Set up Analyser node
    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 64;
    }

    const analyser = analyserRef.current;
    
    // Synth engine details: Generates a heavy dark chord progression on a loop!
    // We update simulation timer
    let progress = currentTime;
    const songDuration = parseDuration(currentTrack.duration);
    setDuration(songDuration);

    // Arpeggiator notes (Minsk Horror Punk scale - D minor / A minor dark chords)
    // Coordinated note frequencies:
    const roots = [110, 110, 98, 87.3, 110, 110, 116.5, 130.8]; // Low Goth Bass roots: A2, A2, G2, F2, A, A, A#, C
    const mids = [220, 220, 196, 174.6, 220, 220, 233, 261.6];
    const highs = [440, 523.25, 392, 349.2, 440, 493.8, 466.2, 523.25]; // Higher string patterns

    let step = 0;
    const intervalMs = 280; // 130 BPM Gothic arpeggios

    synthIntervalRef.current = setInterval(() => {
      progress += intervalMs / 1000;
      if (progress >= songDuration) {
        progress = 0;
        handleNext();
      }
      setCurrentTime(progress);

      if (ctx.state === 'suspended') return;

      // Pulse simulation for visuals
      if (analyser) {
        const dummyBuffer = new Uint8Array(analyser.frequencyBinCount);
        for (let i = 0; i < dummyBuffer.length; i++) {
          dummyBuffer[i] = Math.floor(Math.random() * 80) + (step % 2 === 0 ? 100 : 50);
        }
        // Force draw simulation
        drawVisuals(dummyBuffer);
      }

      // Generate a synthesized moody note
      if (!isMuted) {
        try {
          // Sub-bass oscillator
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const osc3 = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc1.type = 'sawtooth';
          osc2.type = 'triangle';
          osc3.type = 'sine';

          const chordIdx = Math.floor(step / 4) % roots.length;
          const noteOffset = step % 4;

          // Arpeggiate notes
          let freq = roots[chordIdx];
          if (noteOffset === 1) freq = mids[chordIdx];
          if (noteOffset === 2) freq = highs[chordIdx];
          if (noteOffset === 3) freq = mids[chordIdx] * 1.5; // perfect fifth

          osc1.frequency.setValueAtTime(freq, ctx.currentTime);
          osc2.frequency.setValueAtTime(freq / 2, ctx.currentTime); // sub octave
          osc3.frequency.setValueAtTime(freq * 2, ctx.currentTime); // high chime

          // Short Gothic plucked decay envelope
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 0.03);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

          // Lowpass filter for analog fatness
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          osc1.connect(filter);
          osc2.connect(filter);
          osc3.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc3.start();
          
          osc1.stop(ctx.currentTime + 0.3);
          osc2.stop(ctx.currentTime + 0.3);
          osc3.stop(ctx.currentTime + 0.3);
        } catch (e) {
          // Web Audio synth safe recovery
        }
      }

      step++;
    }, intervalMs);
  }

  function stopSynth() {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }

  function drawVisuals(freqBuffer: Uint8Array) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const width = canvas.width;
    const height = canvas.height;
    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = (width / freqBuffer.length) * 1.5;
    let x = 0;

    for (let i = 0; i < freqBuffer.length; i++) {
      const value = freqBuffer[i];
      const percent = value / 255;
      const barHeight = height * percent * 0.8;

      // Deep blood red to neon bright red gradient
      const grad = canvasCtx.createLinearGradient(0, height, 0, height - barHeight);
      grad.addColorStop(0, '#3a0000');
      grad.addColorStop(0.5, '#8b0000');
      grad.addColorStop(1, '#c41e1e');

      canvasCtx.fillStyle = grad;
      // Draw double symmetry sound bars
      canvasCtx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
      canvasCtx.fillRect(width - x - barWidth, height - barHeight, barWidth - 1, barHeight);

      x += barWidth;
    }
  }

  // Track switching
  function handleNext() {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= filteredTracks.length) nextIndex = 0;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
  }

  function handlePrev() {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) prevIndex = filteredTracks.length - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
  }

  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (isPlaying) {
      // restart synth loops with customized current time
      stopSynth();
      startSynth();
    }
  }

  // Cleanup synth interval
  useEffect(() => {
    return () => stopSynth();
  }, []);

  // Format Helper: Seconds to MM:SS
  function formatTime(timeInSecs: number) {
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Parse duration helper (e.g. "3:42" -> 222)
  function parseDuration(durStr: string) {
    const parts = durStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 200;
  }

  // Synchronize audio track change
  useEffect(() => {
    if (isPlaying) {
      stopSynth();
      startSynth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);


  return (
    <div 
      id="custom-audio-player" 
      className="bg-[#0f0f0f] border border-red-950/60 rounded-xl max-w-lg mx-auto overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
    >
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
          {/* Signal Light */}
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[9px] text-stone-500 uppercase">SYS_ACTIVE</span>
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-600 animate-pulse shadow-[0_0_5px_#ef4444]' : 'bg-red-950'}`}></div>
          </div>
        </div>

        {/* Dynamic Track Title Scrolling */}
        <div className="h-10 overflow-hidden relative mb-2">
          <h3 className="font-sans text-lg font-bold text-white tracking-wide pr-8 truncate">
            {getTrackTitle(currentTrack)}
          </h3>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            {currentTrack.album === 'sled' ? t.albumSledTitle : currentTrack.album === 'proklyaty' ? t.albumProklyatyTitle : 'СИНГЛ / SINGLE'}
          </p>
        </div>

        {/* Visualizer Canvas overlay */}
        <div className="h-8 w-full mt-4 rounded bg-[#030303] border border-stone-900 overflow-hidden relative">
          <canvas ref={canvasRef} width={400} height={32} className="w-full h-full opacity-60 pointer-events-none" />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[9px] text-stone-700 tracking-wider uppercase">
                {t.playerPlaceholder.slice(0, 35)}...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control Area */}
      <div className="p-6 space-y-4">
        
        {/* Progress seek Slider */}
        <div className="space-y-1">
          <input 
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full accent-[#c41e1e] h-1 bg-stone-900 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-stone-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Buttons grid */}
        <div className="flex items-center justify-between pt-2">
          
          {/* Volume button container */}
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

          {/* Central Controls */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrev}
              className="p-2 border border-stone-900 rounded-full hover:border-red-900 hover:text-[#c41e1e] text-stone-400 transition-all duration-300"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-4 bg-gradient-to-br from-[#c41e1e] to-[#7f1212] rounded-full text-white shadow-[0_0_15px_rgba(196,30,30,0.5)] hover:scale-105 hover:shadow-[0_0_25px_rgba(196,30,30,0.8)] transition-all duration-300 focus:outline-none"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-[1px]" />}
            </button>

            <button 
              onClick={handleNext}
              className="p-2 border border-stone-900 rounded-full hover:border-red-900 hover:text-[#c41e1e] text-stone-400 transition-all duration-300"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* SLED Stamp */}
          <div className="w-24 text-right flex justify-end">
            <div className="inline-flex items-center px-2 py-0.5 rounded bg-red-950/20 border border-red-950/40 text-stone-500 font-mono text-[8px] tracking-widest uppercase">
              <Flame className="w-2 h-2 text-[#c41e1e] mr-1" />
              <span>S_DECAY</span>
            </div>
          </div>

        </div>

        {/* Scrollable Track Selections list */}
        <div className="pt-4 border-t border-stone-900">
          <div className="text-stone-400 font-sans text-xs font-bold uppercase mb-2 tracking-widest border-l-2 border-[#c41e1e] pl-1.5 flex justify-between items-center">
            <span>{t.playerTracklist}</span>
            <span className="font-mono text-[9px] text-stone-600 font-normal">TRACKS: {filteredTracks.length}</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
            {filteredTracks.map((track, idx) => {
              const isCurrent = ALL_TRACKS.indexOf(track) === ALL_TRACKS.indexOf(currentTrack);
              return (
                <button
                  key={`${track.titleRu}-${idx}`}
                  onClick={() => {
                    const absIdx = ALL_TRACKS.indexOf(track);
                    // Filter down to index in filtered list
                    const relativeIdx = filteredTracks.findIndex(ft => ft.titleRu === track.titleRu && ft.album === track.album);
                    if (relativeIdx !== -1) {
                      setCurrentTrackIndex(relativeIdx);
                      setCurrentTime(0);
                      if (!isPlaying) {
                        setIsPlaying(true);
                        setTimeout(() => startSynth(), 50);
                      }
                    }
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
