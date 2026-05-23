// SLED Rock Band Standalone Static Vanilla Javascript Co-ordinator

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initHeaderScroll();
  initHamburgerMenu();
  initContactsForm();
  initAudioPlayer();
});

/* ==========================================================================
   LANGUAGE ENGINE
   ========================================================================== */
function initLanguage() {
  const DEFAULT_LANG = 'ru';
  let activeLang = localStorage.getItem('sled_lang') || DEFAULT_LANG;

  // Set active class on lang buttons
  const updateLangUI = (lang) => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all nodes
    document.querySelectorAll('[data-t]').forEach(element => {
      const key = element.getAttribute('data-t');
      if (translations[lang] && translations[lang][key]) {
        // Check if we need to translate attribute or innerHTML
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });

    // Translate document title metadata optionally
    const titleNode = document.querySelector('title');
    if (titleNode && translations[lang] && translations[lang].navTitle) {
      titleNode.innerText = translations[lang].navTitle + " — Рок-группа";
    }
  };

  // Bind click listeners to lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = btn.getAttribute('data-lang');
      localStorage.setItem('sled_lang', selectedLang);
      activeLang = selectedLang;
      updateLangUI(selectedLang);
    });
  });

  // Run initial translations
  updateLangUI(activeLang);
}

/* ==========================================================================
   HEADER SCROLLER EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // initial load
}

/* ==========================================================================
   MOBILE HAMBURGER Side-drawer
   ========================================================================== */
function initHamburgerMenu() {
  const burgerOpenBtn = document.getElementById('burger-open');
  const burgerCloseBtn = document.getElementById('burger-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!burgerOpenBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  };

  burgerOpenBtn.addEventListener('click', openDrawer);
  if (burgerCloseBtn) burgerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when nav links clicked
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   BOOKINGS FEEDBACK FORM VALIDATION
   ========================================================================== */
function initContactsForm() {
  const form = document.getElementById('booking-message-form');
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const subjectInput = document.getElementById('subject-input');
  const messageInput = document.getElementById('message-input');
  const valBanner = document.getElementById('form-validation-banner');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('submit-message-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // reset banner visibility
    if (valBanner) valBanner.style.display = 'none';
    if (successBanner) successBanner.style.display = 'none';

    // validate
    let hasError = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // clean errors
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      if (inp) inp.classList.remove('error-outline');
    });

    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) nameInput.classList.add('error-outline');
      hasError = true;
    }
    if (!subjectInput || !subjectInput.value.trim()) {
      if (subjectInput) subjectInput.classList.add('error-outline');
      hasError = true;
    }
    if (!messageInput || !messageInput.value.trim()) {
      if (messageInput) messageInput.classList.add('error-outline');
      hasError = true;
    }
    if (!emailInput || !emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
      if (emailInput) emailInput.classList.add('error-outline');
      hasError = true;
    }

    if (hasError) {
      if (valBanner) valBanner.style.display = 'flex';
      return;
    }

    // lock submit state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    // Simulate safe dispatch
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Dispatch Summon</span>`;
      }
      if (successBanner) {
        successBanner.style.display = 'flex';
      }
      form.reset();
    }, 1500);
  });
}

/* ==========================================================================
   CUSTOM REVOLUTIONARY AUDIO PLAYER
   ========================================================================== */
function initAudioPlayer() {
  const playPauseBtn = document.getElementById('player-play-btn');
  const playIcon = document.getElementById('player-play-icon');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const seekSlider = document.getElementById('player-seek-slider');
  const volSlider = document.getElementById('player-vol-slider');
  const volIcon = document.getElementById('player-vol-icon');
  const trackTitle = document.getElementById('player-track-title');
  const trackAlbum = document.getElementById('player-track-album');
  const currentTimeLabel = document.getElementById('player-time-current');
  const totalDurationLabel = document.getElementById('player-time-total');
  const statusLight = document.getElementById('player-status-light');
  const playerCanvas = document.getElementById('player-waveform');
  const listScroll = document.getElementById('player-list-scroll');

  if (!playPauseBtn) return;

  // Track definitions
  const TRACKS = [
    { title: "Человек с 1000 лиц", album: "Проклятый", duration: "3:42" },
    { title: "Призрак", album: "Проклятый", duration: "4:05" },
    { title: "Девочка-вампир", album: "Проклятый", duration: "3:18" },
    { title: "Мессия", album: "Проклятый", duration: "3:50" },
    { title: "Новогодняя", album: "Проклятый", duration: "3:30" },
    { title: "След", album: "След", duration: "4:12" },
    { title: "Забытый приют", album: "След", duration: "3:55" },
    { title: "Мрак", album: "След", duration: "3:24" }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;
  let currentPlayTime = 0; // seconds
  let seekInterval = null;

  // Populate HTML Play list container
  if (listScroll) {
    listScroll.innerHTML = '';
    TRACKS.forEach((track, idx) => {
      const item = document.createElement('button');
      item.className = 'player-list-item' + (idx === 0 ? ' active' : '');
      item.innerHTML = `
        <div class="player-item-name-box">
          <span class="player-item-idx font-mono">${String(idx + 1).padStart(2, '0')}</span>
          <span>${track.title}</span>
        </div>
        <span class="player-item-dur font-mono">${track.duration}</span>
      `;
      item.addEventListener('click', () => {
        selectTrack(idx);
      });
      listScroll.appendChild(item);
    });
  }

  // Draw simulated static goth canvas bars on player load
  const drawBars = () => {
    if (!playerCanvas) return;
    const ctx = playerCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    ctx.fillStyle = isPlaying ? '#c41e1e' : '#301010';

    const count = 40;
    const w = playerCanvas.width / count;
    for (let i = 0; i < count; i++) {
      const h = Math.random() * (isPlaying ? playerCanvas.height * 0.9 : 8) + 2;
      ctx.fillRect(i * w + 1, (playerCanvas.height - h) / 2, w - 2, h);
    }
  };
  drawBars();

  const selectTrack = (idx) => {
    currentTrackIdx = idx;
    // update list active classes
    const listItems = document.querySelectorAll('.player-list-item');
    listItems.forEach((item, i) => {
      if (i === idx) item.classList.add('active');
      else item.classList.remove('active');
    });

    const track = TRACKS[idx];
    if (trackTitle) trackTitle.innerText = track.title;
    if (trackAlbum) trackAlbum.innerText = `Альбом — ${track.album}`;
    if (totalDurationLabel) totalDurationLabel.innerText = track.duration;
    if (currentTimeLabel) currentTimeLabel.innerText = "0:00";
    if (seekSlider) seekSlider.value = 0;

    currentPlayTime = 0;

    if (isPlaying) {
      stopSynthesizer();
      startSynthesizer();
    }
  };

  const parseDuration = (durStr) => {
    const parts = durStr.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const startSynthesizer = () => {
    // Generate actual Audio oscillators
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    isPlaying = true;
    if (statusLight) statusLight.classList.add('playing');
    if (playIcon) playIcon.innerHTML = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

    // Keep ticking play time duration
    const trackDur = parseDuration(TRACKS[currentTrackIdx].duration);
    if (seekSlider) seekSlider.max = trackDur;

    seekInterval = setInterval(() => {
      currentPlayTime++;
      if (currentPlayTime > trackDur) {
        // next track
        clearInterval(seekInterval);
        nextTrack();
        return;
      }
      
      const m = Math.floor(currentPlayTime / 60);
      const s = String(currentPlayTime % 60).padStart(2, '0');
      if (currentTimeLabel) currentTimeLabel.innerText = `${m}:${s}`;
      if (seekSlider) seekSlider.value = currentPlayTime;

      // animate canvas bars
      drawBars();
    }, 1000);

    // Occasional retro horror synth note scheduler
    let count = 0;
    synthInterval = setInterval(() => {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        // Gothic chord notes: Am, Dm, E, F
        const notes = [220, 261.63, 329.63, 440, 523.25, 659.25, 415.3, 493.88]; // spooky frequencies
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        
        osc.type = count % 2 === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(randomNote, audioCtx.currentTime);
        
        // set low volume
        const vol = volSlider ? (volSlider.value / 100) * 0.05 : 0.02;
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
        count++;
      } catch (e) {
        console.warn("Synth failed", e);
      }
    }, 450);
  };

  const stopSynthesizer = () => {
    isPlaying = false;
    if (statusLight) statusLight.classList.remove('playing');
    if (playIcon) playIcon.innerHTML = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (seekInterval) {
      clearInterval(seekInterval);
      seekInterval = null;
    }
    drawBars();
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthesizer();
    } else {
      startSynthesizer();
    }
  };

  const nextTrack = () => {
    let nextIdx = currentTrackIdx + 1;
    if (nextIdx >= TRACKS.length) nextIdx = 0;
    selectTrack(nextIdx);
  };

  const prevTrack = () => {
    let prevIdx = currentTrackIdx - 1;
    if (prevIdx < 0) prevIdx = TRACKS.length - 1;
    selectTrack(prevIdx);
  };

  // Bind controls
  playPauseBtn.addEventListener('click', togglePlay);
  if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  if (prevBtn) prevBtn.addEventListener('click', prevTrack);

  if (seekSlider) {
    seekSlider.addEventListener('input', (e) => {
      currentPlayTime = parseInt(e.target.value, 10);
      const m = Math.floor(currentPlayTime / 60);
      const s = String(currentPlayTime % 60).padStart(2, '0');
      if (currentTimeLabel) currentTimeLabel.innerText = `${m}:${s}`;
    });
  }
}
