import { useEffect, useState } from "react";
import { wedding, timeLeft } from "@/lib/wedding";
import { HallBackdrop } from "./Scenes";
import { Crest, Divider, Letters } from "./Effects";
import { toggleMusic, getMusicState, subscribeMusic } from "@/lib/sfx";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const t = now ? timeLeft(wedding.countdownTarget, now) : null;
  const items: [string, number | undefined][] = [
    ["Days", t?.days], ["Hours", t?.hours], ["Minutes", t?.minutes], ["Seconds", t?.seconds],
  ];
  return (
    <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
      {items.map(([l, v], i) => (
        <div key={l} className={`reveal reveal-delay-${i} rounded-md border border-gold/40 bg-burgundy/70 py-4 text-center`}>
          <div className="font-display text-2xl text-gold-shimmer sm:text-4xl">{v === undefined ? "--" : String(v).padStart(2, "0")}</div>
          <div className="mt-1 font-display text-[0.55rem] tracking-[0.25em] text-candle sm:text-xs">{l.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

function MusicToggle() {
  const [state, setState] = useState({ playing: false, available: true });
  useEffect(() => {
    setState(getMusicState());
    return subscribeMusic(() => setState(getMusicState()));
  }, []);
  if (!state.available) return null;
  return (
    <button
      onClick={toggleMusic}
      aria-label={state.playing ? "Pause music" : "Play music"}
      className="btn-ghost-gold fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-lg"
    >
      {state.playing ? "❚❚" : "♪"}
    </button>
  );
}

export function WeddingSite() {
  useReveal();
  return (
    <main className="relative min-h-screen bg-velvet" style={{ animation: "fade-in 1.4s both" }}>
      <MusicToggle />
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <HallBackdrop />
        <div className="relative space-y-5">
          <Crest className="mx-auto h-20 w-20" />
          <p className="font-display text-[0.65rem] tracking-[0.4em] text-candle" style={{ animation: "fade-up 1s 0.3s both" }}>TOGETHER WITH THEIR FAMILIES</p>
          <h1 className="font-script text-6xl leading-tight text-gold-crisp sm:text-8xl">
            <Letters text={wedding.bride} delay={0.5} /> <br />
            <span className="font-display text-xl tracking-[0.5em] text-gold sm:text-2xl">WEDS</span> <br />
            <Letters text={wedding.groom} delay={1.2} />
          </h1>
          <div style={{ animation: "fade-in 1s 2s both" }}><Divider /></div>
          <p className="mx-auto max-w-lg font-serif text-lg italic text-ivory/90 sm:text-xl" style={{ animation: "fade-up 1s 2.2s both" }}>{wedding.opening}</p>
          <a href="#events" className="btn-ghost-gold inline-block rounded-full px-6 py-3 text-xs" style={{ animation: "fade-up 1s 2.6s both" }}>VIEW CELEBRATIONS</a>
        </div>
      </section>

      {/* INVITATION */}
      <section className="px-6 py-24 text-center">
        <p className="reveal font-display text-xs tracking-[0.4em] text-candle">THE INVITATION</p>
        <h2 className="reveal reveal-delay-1 mt-4 font-script text-5xl text-gold-shimmer sm:text-6xl">{wedding.invitation}</h2>
        <div className="reveal reveal-delay-2 mt-6"><Divider /></div>
        <p className="reveal reveal-delay-3 mx-auto mt-6 max-w-xl font-serif text-lg text-ivory/85">
          With joy in our hearts, we invite you to celebrate the union of {wedding.bride} and {wedding.groom} at {wedding.venue.name}.
        </p>
      </section>

      {/* COUNTDOWN */}
      <section className="px-4 py-16 text-center">
        <p className="reveal mb-8 font-display text-xs tracking-[0.4em] text-candle">COUNTING THE MOMENTS</p>
        <Countdown />
      </section>

      {/* EVENTS */}
      <section id="events" className="px-6 py-24">
        <h2 className="reveal text-center font-deco text-3xl text-gold-shimmer sm:text-4xl">The Celebrations</h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {wedding.events.map((e, i) => (
            <article key={e.name} className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-lg border border-gold/50 bg-burgundy/80 p-8 text-center transition-transform duration-500 hover:-translate-y-2`} style={{ boxShadow: "var(--shadow-card)" }}>
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-candle/10 opacity-0 transition-opacity group-hover:opacity-100" style={{ animation: "sweep 2.5s ease-in-out infinite" }} />
              <p className="font-display text-xs tracking-[0.4em] text-candle">{i === 0 ? "EVENING" : "MORNING"}</p>
              <h3 className="mt-3 font-script text-5xl text-gold-shimmer">{e.name}</h3>
              <div className="my-5"><Divider /></div>
              <p className="font-serif text-xl text-ivory">{e.date}</p>
              <p className="mt-1 font-display text-sm tracking-[0.2em] text-gold">{e.time}</p>
              <p className="mt-4 font-serif italic text-ivory/80">{wedding.venue.name}</p>
            </article>
          ))}
        </div>
      </section>

      {/* VENUE */}
      <section className="px-6 py-24 text-center">
        <p className="reveal font-display text-xs tracking-[0.4em] text-candle">THE VENUE</p>
        <a href={wedding.venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-1 mt-4 block font-deco text-3xl text-gold-shimmer sm:text-5xl">{wedding.venue.name}</a>
        <p className="reveal reveal-delay-2 mt-3 font-serif text-lg text-ivory/85">{wedding.venue.address}</p>
        <a href={wedding.venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-magic reveal reveal-delay-3 mt-8 inline-block rounded-full px-8 py-4 text-xs">GET DIRECTIONS</a>
      </section>

      {/* CLOSING */}
      <section className="relative overflow-hidden px-6 py-32 text-center">
        <Crest className="reveal mx-auto h-16 w-16" />
        <h2 className="reveal reveal-delay-1 mt-6 font-script text-5xl text-gold-shimmer sm:text-7xl">{wedding.closing}</h2>
        <div className="reveal reveal-delay-2 mt-6"><Divider /></div>
        <p className="reveal reveal-delay-3 mt-6 font-display text-xs tracking-[0.4em] text-candle">{wedding.heading.toUpperCase()}</p>
      </section>
    </main>
  );
}
