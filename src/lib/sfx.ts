// Sound effects + background music player for the cinematic experience.
// All calls are safe no-ops when audio is unavailable (SSR, missing files, autoplay blocks).

const sfxCache: Record<string, HTMLAudioElement> = {};

/** Play a one-shot sound effect from /audio/sfx/<name>.mp3 */
export function playSfx(name: string, volume = 0.5) {
  if (typeof Audio === "undefined") return;
  try {
    const a = (sfxCache[name] ??= new Audio(`/audio/sfx/${name}.mp3`));
    a.volume = volume;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch {
    /* audio unavailable — ignore */
  }
}

/* ---------- background music (shared singleton) ---------- */

let music: HTMLAudioElement | null = null;
let playing = false;
let available = true;
const subs = new Set<() => void>();
const notify = () => subs.forEach((f) => f());

function getMusic(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!music) {
    music = new Audio("/audio/wedding-music.mp3");
    music.loop = true;
    music.preload = "auto";
    music.volume = 0.35;
    music.addEventListener("error", () => {
      available = false;
      notify();
    });
    music.addEventListener("play", () => {
      playing = true;
      notify();
    });
    music.addEventListener("pause", () => {
      playing = false;
      notify();
    });
  }
  return music;
}

/** Start music (must be called from a user gesture, e.g. the seal tap). */
export function startMusic() {
  const m = getMusic();
  if (!m || !m.paused) return;
  m.play().catch(() => {});
}

/** Pause/resume music; returns nothing — state is observed via subscribeMusic. */
export function toggleMusic() {
  const m = getMusic();
  if (!m) return;
  if (m.paused) {
    m.play().catch(() => {
      available = false;
      notify();
    });
  } else {
    m.pause();
  }
}

export function getMusicState() {
  return { playing, available };
}

export function subscribeMusic(cb: () => void) {
  getMusic();
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}
