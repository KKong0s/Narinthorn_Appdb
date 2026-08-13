/* =========================================================
   WAVELENGTH — Multi-Genre Music Hub
   script.js

   โครงสร้างไฟล์:
   1. ข้อมูลเพลง (mock data)
   2. ตัวแปร state + การอ้างอิง DOM
   3. ฟังก์ชัน render (genre chips, song grid, hero card)
   4. ฟังก์ชัน filter + search
   5. ฟังก์ชัน audio player (play/pause/seek/volume/next/prev)
   6. Event listeners + init
   ========================================================= */

/* ---------- 1. ข้อมูลเพลง (mock data) ---------------------
   cover: รูปจาก Unsplash (ขนาดย่อผ่าน query param)
   audio: ไฟล์เสียงตัวอย่างฟรีจาก SoundHelix (ใช้สำหรับทดสอบ/เดโมเท่านั้น)
------------------------------------------------------------- */
const GENRES = [
  { id: "pop",       label: "Pop",       color: "#F0529C" },
  { id: "rock",      label: "Rock",      color: "#F97316" },
  { id: "hiphop",    label: "Hip-Hop",   color: "#8B5CF6" },
  { id: "jazz",      label: "Jazz",      color: "#EAB308" },
  { id: "edm",       label: "EDM",       color: "#2DD4EA" },
  { id: "lofi",      label: "Lo-Fi",     color: "#A78BFA" },
  { id: "classical", label: "Classical", color: "#34D399" },
  { id: "indie",     label: "Indie",     color: "#FB7185" },
];

const SONGS = [
  {
    id: 1, title: "Neon Skyline", artist: "Ruen Aurora", genre: "pop",
    duration: "3:24",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2, title: "Glass Heart", artist: "Mint Parade", genre: "pop",
    duration: "3:05",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3, title: "Riot Static", artist: "Iron Foxglove", genre: "rock",
    duration: "4:12",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4, title: "Gravel Road", artist: "The Amber Wolves", genre: "rock",
    duration: "3:48",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5, title: "Concrete Bloom", artist: "Nue Cipher", genre: "hiphop",
    duration: "2:58",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 6, title: "Low Beam", artist: "Kojo Vantage", genre: "hiphop",
    duration: "3:16",
    cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: 7, title: "Blue Room Sessions", artist: "Elm & Reed Trio", genre: "jazz",
    duration: "4:41",
    cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: 8, title: "Midnight Brass", artist: "Sable & Sons", genre: "jazz",
    duration: "5:02",
    cover: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    id: 9, title: "Pulse Reactor", artist: "Vektra", genre: "edm",
    duration: "3:33",
    cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    id: 10, title: "Strobe Garden", artist: "Halcyon Drop", genre: "edm",
    duration: "3:50",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    id: 11, title: "Rainy Window", artist: "Study Hall", genre: "lofi",
    duration: "2:40",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  },
  {
    id: 12, title: "Paper Lanterns", artist: "Kiiro Beats", genre: "lofi",
    duration: "2:52",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
  },
  {
    id: 13, title: "Nocturne in Grey", artist: "Elias Vance", genre: "classical",
    duration: "6:14",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
  },
  {
    id: 14, title: "String Quarter, No.4", artist: "Verlaine Ensemble", genre: "classical",
    duration: "7:02",
    cover: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
  },
  {
    id: 15, title: "Cardboard Wings", artist: "Static Orchard", genre: "indie",
    duration: "3:20",
    cover: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
  },
  {
    id: 16, title: "Yellow Tape Summer", artist: "Poplar June", genre: "indie",
    duration: "3:11",
    cover: "https://images.unsplash.com/photo-1454922915609-78549ad709bd?w=500&q=80&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
  },
];

/* ---------- 2. State + DOM refs --------------------------- */
const state = {
  activeGenre: "all",   // แนวเพลงที่กำลังกรองอยู่
  searchTerm: "",       // คำค้นหาปัจจุบัน
  currentSongIndex: -1, // index ของเพลงที่กำลังเล่นใน filteredSongs
  isPlaying: false,
};

const el = {
  genreRail: document.getElementById("genreRail"),
  songGrid: document.getElementById("songGrid"),
  resultCount: document.getElementById("resultCount"),
  emptyState: document.getElementById("emptyState"),
  searchInput: document.getElementById("searchInput"),
  heroCard: document.getElementById("heroCard"),
  heroPlayBtn: document.getElementById("heroPlayBtn"),
  heroBars: document.getElementById("heroBars"),

  navToggle: document.getElementById("navToggle"),
  mainNav: document.getElementById("mainNav"),
  navLinks: document.querySelectorAll(".nav-link"),

  audio: document.getElementById("audioPlayer"),
  playerBar: document.getElementById("playerBar"),
  playerCover: document.getElementById("playerCover"),
  playerTitle: document.getElementById("playerTitle"),
  playerArtist: document.getElementById("playerArtist"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  playIcon: document.getElementById("playIcon"),
  pauseIcon: document.getElementById("pauseIcon"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  progressBar: document.getElementById("progressBar"),
  currentTime: document.getElementById("currentTime"),
  durationTime: document.getElementById("durationTime"),
  volumeBar: document.getElementById("volumeBar"),
  miniBars: document.getElementById("miniBars"),
};

/* เพลงที่ผ่านการกรองแล้ว (ตามแนวเพลง + คำค้นหา) — ใช้เป็น "playlist" ของปุ่ม prev/next ด้วย */
let filteredSongs = [...SONGS];

/* ---------- 3. Render functions ---------------------------- */

function genreMeta(genreId) {
  return GENRES.find((g) => g.id === genreId);
}

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/** สร้างแท็บ/การ์ดแนวเพลงด้านบนสุดของ song list */
function renderGenreChips() {
  const allChip = `
    <button class="genre-chip active" data-genre="all">
      <span class="dot" style="--chip-color:#F2F2F5"></span> ทั้งหมด
    </button>`;

  const chips = GENRES.map(
    (g) => `
    <button class="genre-chip" data-genre="${g.id}" style="--chip-color:${g.color}">
      <span class="dot"></span> ${g.label}
    </button>`
  ).join("");

  el.genreRail.innerHTML = allChip + chips;

  el.genreRail.querySelectorAll(".genre-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeGenre = btn.dataset.genre;
      el.genreRail.querySelectorAll(".genre-chip").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
}

/** วาดการ์ดเพลงทั้งหมดที่ผ่านการกรองแล้วลงใน grid */
function renderSongGrid() {
  el.songGrid.innerHTML = filteredSongs
    .map((song, i) => {
      const g = genreMeta(song.genre);
      const isActive = i === state.currentSongIndex;
      return `
      <article class="song-card ${isActive ? "is-active" : ""} ${isActive && state.isPlaying ? "is-playing" : ""}" data-index="${i}">
        <div class="song-cover-wrap">
          <img src="${song.cover}" alt="ปกเพลง ${song.title}" loading="lazy">
          <span class="song-genre-tag" style="--tag-color:${g.color}">${g.label}</span>
          <button class="song-play-btn" data-index="${i}" aria-label="เล่น ${song.title}">
            <svg class="play-ic" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <svg class="pause-ic" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
          </button>
        </div>
        <h3 class="song-title">${song.title}</h3>
        <p class="song-artist">${song.artist}</p>
        <div class="song-meta">
          <span>${g.label}</span>
          <span>${song.duration}</span>
        </div>
      </article>`;
    })
    .join("");

  el.resultCount.textContent = `พบ ${filteredSongs.length} เพลง`;
  el.emptyState.hidden = filteredSongs.length !== 0;
  el.songGrid.hidden = filteredSongs.length === 0;

  // ผูก event ให้ปุ่ม play บนการ์ดแต่ละใบ
  el.songGrid.querySelectorAll(".song-play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleCardPlayClick(Number(btn.dataset.index));
    });
  });
  // คลิกที่ตัวการ์ดก็เล่นเพลงได้เช่นกัน
  el.songGrid.querySelectorAll(".song-card").forEach((card) => {
    card.addEventListener("click", () => handleCardPlayClick(Number(card.dataset.index)));
  });
}

/** วาดการ์ด "เพลงเด่นประจำสัปดาห์" ใน Hero */
function renderHeroCard() {
  const featured = SONGS[0];
  const g = genreMeta(featured.genre);
  el.heroCard.innerHTML = `
    <img class="hero-card-cover" src="${featured.cover}" alt="ปกเพลง ${featured.title}">
    <div class="hero-card-info">
      <div>
        <p class="hero-card-genre">${g.label}</p>
        <p class="hero-card-title">${featured.title}</p>
        <p class="hero-card-artist">${featured.artist}</p>
      </div>
      <button class="hero-card-play" id="heroCardPlay" aria-label="เล่น ${featured.title}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>`;

  const playFeatured = () => {
    // เพลงเด่นต้องอยู่ใน playlist ปัจจุบันเสมอเพื่อให้ prev/next ทำงานได้
    const idx = filteredSongs.findIndex((s) => s.id === featured.id);
    if (idx !== -1) {
      playSongAt(idx);
    } else {
      // ถ้าเพลงเด่นไม่อยู่ในตัวกรองปัจจุบัน ให้เล่นแบบเดี่ยว
      filteredSongs = [...SONGS];
      playSongAt(0);
    }
  };
  document.getElementById("heroCardPlay").addEventListener("click", playFeatured);
  el.heroPlayBtn.addEventListener("click", playFeatured);
}

/** สร้างแท่ง equalizer แบบสุ่มความสูง/ความเร็ว สำหรับพื้นหลัง Hero */
function renderHeroBars() {
  const bars = Array.from({ length: 48 })
    .map(() => {
      const dur = (1.6 + Math.random() * 1.6).toFixed(2);
      const delay = (Math.random() * -2).toFixed(2);
      const h = 20 + Math.random() * 80;
      return `<i style="height:${h}%; animation-duration:${dur}s; animation-delay:${delay}s;"></i>`;
    })
    .join("");
  el.heroBars.innerHTML = bars;
}

/* ---------- 4. Filter + Search ------------------------------ */

/** รวม logic การกรองแนวเพลง + คำค้นหา แล้ว re-render grid */
function applyFilters() {
  const term = state.searchTerm.trim().toLowerCase();

  filteredSongs = SONGS.filter((song) => {
    const matchesGenre = state.activeGenre === "all" || song.genre === state.activeGenre;
    const matchesSearch =
      term === "" ||
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term);
    return matchesGenre && matchesSearch;
  });

  // ถ้าเพลงที่กำลังเล่นอยู่ไม่ได้อยู่ใน list ที่กรองใหม่แล้ว ให้ index เป็น -1 (ไม่ไฮไลต์การ์ดไหน)
  // แต่ตัวเล่นเพลงด้านล่างยังคงเล่นต่อไปตามปกติ ไม่หยุดเพลง
  if (state.currentSongIndex !== -1) {
    const currentSong = getCurrentSong();
    state.currentSongIndex = currentSong
      ? filteredSongs.findIndex((s) => s.id === currentSong.id)
      : -1;
  }

  renderSongGrid();
}

/* Real-time search: ทุกครั้งที่พิมพ์จะกรองทันที (debounce เล็กน้อยเพื่อความลื่นไหล) */
let searchDebounce;
el.searchInput.addEventListener("input", (e) => {
  clearTimeout(searchDebounce);
  const value = e.target.value;
  searchDebounce = setTimeout(() => {
    state.searchTerm = value;
    applyFilters();
  }, 120);
});

/* ---------- 5. Audio player logic --------------------------- */

let currentSongRef = null; // เก็บอ้างอิงเพลงปัจจุบันไว้ เผื่อ filteredSongs เปลี่ยนแล้วหาไม่เจอ

function getCurrentSong() {
  return currentSongRef;
}

function handleCardPlayClick(index) {
  const isSameSong = index === state.currentSongIndex;
  if (isSameSong) {
    togglePlayPause();
  } else {
    playSongAt(index);
  }
}

/** เริ่มเล่นเพลงลำดับที่ index ใน filteredSongs และอัปเดต UI ของ sticky player */
function playSongAt(index) {
  const song = filteredSongs[index];
  if (!song) return;

  state.currentSongIndex = index;
  currentSongRef = song;

  el.audio.src = song.audio;
  el.audio.play().catch(() => {
    /* บาง browser ต้องมี user interaction ก่อนเล่นเสียงได้ — ปุ่มถูกคลิกแล้วจึงไม่ควรมีปัญหา */
  });

  updatePlayerUI(song);
  setPlayingState(true);
  renderSongGrid(); // เพื่ออัปเดตว่าการ์ดไหนกำลังเล่นอยู่
}

/** อัปเดตข้อความ/รูปภาพในแถบเล่นเพลงด้านล่าง */
function updatePlayerUI(song) {
  el.playerCover.src = song.cover;
  el.playerCover.alt = `ปกเพลง ${song.title}`;
  el.playerTitle.textContent = song.title;
  el.playerArtist.textContent = song.artist;
}

function setPlayingState(playing) {
  state.isPlaying = playing;
  el.playIcon.hidden = playing;
  el.pauseIcon.hidden = !playing;
  el.miniBars.classList.toggle("is-playing", playing);
  el.playerBar.classList.toggle("is-playing", playing);
}

function togglePlayPause() {
  if (state.currentSongIndex === -1) return; // ยังไม่มีเพลงถูกเลือก
  if (el.audio.paused) {
    el.audio.play();
    setPlayingState(true);
  } else {
    el.audio.pause();
    setPlayingState(false);
  }
  renderSongGrid();
}

function playNext() {
  if (filteredSongs.length === 0) return;
  const next = (state.currentSongIndex + 1) % filteredSongs.length;
  playSongAt(next);
}

function playPrev() {
  if (filteredSongs.length === 0) return;
  const prev = (state.currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
  playSongAt(prev);
}

/* --- Audio element events: sync progress bar / time / auto-next --- */
el.audio.addEventListener("loadedmetadata", () => {
  el.progressBar.max = el.audio.duration || 0;
  el.durationTime.textContent = formatTime(el.audio.duration);
});

el.audio.addEventListener("timeupdate", () => {
  el.progressBar.value = el.audio.currentTime;
  el.currentTime.textContent = formatTime(el.audio.currentTime);
});

el.audio.addEventListener("ended", playNext);

el.audio.addEventListener("play", () => setPlayingState(true));
el.audio.addEventListener("pause", () => setPlayingState(false));

/* --- Player controls --- */
el.playPauseBtn.addEventListener("click", togglePlayPause);
el.nextBtn.addEventListener("click", playNext);
el.prevBtn.addEventListener("click", playPrev);

el.progressBar.addEventListener("input", () => {
  el.audio.currentTime = Number(el.progressBar.value);
});

el.volumeBar.addEventListener("input", () => {
  el.audio.volume = Number(el.volumeBar.value);
});
el.audio.volume = Number(el.volumeBar.value);

/* ---------- 6. Nav (mobile toggle + active link on scroll) --- */
el.navToggle.addEventListener("click", () => {
  const isOpen = el.mainNav.classList.toggle("open");
  el.navToggle.classList.toggle("open", isOpen);
  el.navToggle.setAttribute("aria-expanded", String(isOpen));
});

el.navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    el.navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    el.mainNav.classList.remove("open");
    el.navToggle.classList.remove("open");
  });
});

/* ---------- Init -------------------------------------------- */
function init() {
  renderGenreChips();
  renderHeroBars();
  renderHeroCard();
  applyFilters(); // จะเรียก renderSongGrid() ให้อัตโนมัติ
}

init();
