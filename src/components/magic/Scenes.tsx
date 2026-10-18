import { useState } from "react";
import { wedding } from "@/lib/wedding";
import { playSfx, startMusic } from "@/lib/sfx";
import { Particles, FloatingCandles, Steam, Stars, OptionalVideo, Crest, Divider, Letters, rnd } from "./Effects";

/* ================= SCENE 1: INVITATION ================= */
export function InvitationScene({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const openIt = () => {
    if (open) return;
    playSfx("seal");
    startMusic();
    setOpen(true);
    setTimeout(() => setLeaving(true), 8000);
    setTimeout(onDone, 9200);
  };
  return (
    <section className={`fixed inset-0 overflow-hidden bg-velvet ${open ? "is-open" : ""}`}>
      <OptionalVideo src={wedding.videos.intro} />
      <Particles count={45} />
      {/* light rays */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax]"
        style={{
          background: "repeating-conic-gradient(from 0deg, oklch(0.89 0.08 85 / 0.14) 0deg 4deg, transparent 4deg 16deg)",
          maskImage: "radial-gradient(circle, black 0%, transparent 55%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 55%)",
          opacity: open ? 1 : 0.25,
          transition: "opacity 1.5s",
          animation: "rays-in 1.6s var(--ease-magic) both, rays-spin 60s linear infinite",
        }}
      />
      <div className={`invite-stage relative flex h-full items-center justify-center px-4 ${leaving ? "is-leaving" : ""}`}>
        <button
          onClick={openIt}
          aria-label="Open the invitation"
          className="invite-card relative aspect-[3/4.2] w-[min(82vw,380px)] cursor-pointer text-left focus-visible:outline-none"
          style={{ animation: "fade-up 1.4s var(--ease-magic) both" }}
        >
          {/* inner paper */}
          <div className="invite-inner parchment gold-frame absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-md p-6 text-center">
            <Crest className="h-16 w-16" />
            <p className="font-display text-[0.6rem] tracking-[0.35em]">YOU ARE CORDIALLY INVITED</p>
            <p className="font-script text-4xl text-crimson">{wedding.bride}</p>
            <p className="font-display text-xs tracking-[0.4em]">&amp;</p>
            <p className="font-script text-4xl text-crimson">{wedding.groom}</p>
            <p className="font-serif italic">{wedding.invitation}</p>
          </div>
          {/* cover */}
          <div className="invite-cover velvet-tex gold-frame absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md p-6 text-center">
            <div className="absolute inset-3 rounded border border-gold/40" />
            <Crest className="h-20 w-20 drop-shadow-[0_0_12px_var(--candle)]" />
            <p className="font-display text-[0.6rem] tracking-[0.35em] text-candle sm:text-xs">TOGETHER WITH THEIR FAMILIES</p>
            <h1 className="font-script text-5xl text-gold-shimmer sm:text-6xl">{wedding.bride}</h1>
            <p className="font-display text-sm tracking-[0.5em] text-gold">WEDS</p>
            <h1 className="font-script text-5xl text-gold-shimmer sm:text-6xl">{wedding.groom}</h1>
            <p className="mt-3 animate-pulse font-display text-[0.6rem] tracking-[0.3em] text-candle">TAP THE SEAL TO OPEN</p>
          </div>
          {/* wax seal */}
          <div
            className="seal absolute left-full top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ background: "radial-gradient(circle at 35% 30%, var(--candle), var(--gold) 45%, oklch(0.55 0.1 70))" }}
          >
            <span className="font-deco text-lg text-burgundy">DV</span>
          </div>
          {/* burst */}
          {open &&
            Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-candle"
                style={
                  {
                    "--a": `${i * 10}deg`,
                    "--d": `${-120 - rnd(i, 41) * 220}px`,
                    boxShadow: "var(--glow-candle)",
                    animation: `burst ${1.2 + rnd(i, 42)}s var(--ease-magic) ${0.4 + rnd(i, 43) * 0.3}s both`,
                  } as React.CSSProperties
                }
              />
            ))}
        </button>
      </div>
    </section>
  );
}

/* ================= SCENE 2: PLATFORM ================= */
function Arch({ x, w, h, depth }: { x: number; w: number; h: number; depth: number }) {
  return (
    <g opacity={depth}>
      <path
        d={`M${x} 600 V${600 - h * 0.6} Q${x} ${600 - h} ${x + w / 2} ${600 - h * 1.1} Q${x + w} ${600 - h} ${x + w} ${600 - h * 0.6} V600`}
        fill="none"
        style={{ stroke: "var(--gold)" }}
        strokeOpacity={0.35}
        strokeWidth={3}
      />
      <rect x={x - 8} y={600 - h * 0.6} width={16} height={h * 0.6} style={{ fill: "var(--cherry)" }} />
    </g>
  );
}

export function PlatformScene({ onBoard }: { onBoard: () => void }) {
  const [boarding, setBoarding] = useState(false);
  const board = () => {
    playSfx("chug");
    setBoarding(true);
    setTimeout(onBoard, 2400);
  };
  return (
    <section className="fixed inset-0 overflow-hidden bg-night" style={{ animation: "scene-in 1.6s var(--ease-magic) both" }}>
      <div className="absolute inset-0" style={boarding ? { animation: "board-push 2.4s var(--ease-cine) forwards" } : undefined}>
        {/* background architecture */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <defs>
            <linearGradient id="roof" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--cherry)" }} />
              <stop offset="1" style={{ stopColor: "var(--burgundy)" }} />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#roof)" />
          {/* roof trusses */}
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M${i * 150} 0 L${600} 260 `} style={{ stroke: "var(--gold)" }} strokeOpacity="0.12" strokeWidth="2" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Arch key={i} x={20 + i * 170} w={150} h={360} depth={0.9} />
          ))}
          {/* clock */}
          <circle cx="600" cy="120" r="34" style={{ fill: "var(--cherry)", stroke: "var(--gold)" }} strokeWidth="3" />
          <line x1="600" y1="120" x2="600" y2="96" style={{ stroke: "var(--candle)" }} strokeWidth="3" />
          <line x1="600" y1="120" x2="616" y2="128" style={{ stroke: "var(--candle)" }} strokeWidth="2" />
          {/* platform floor perspective */}
          <path d="M0 600 L520 420 H680 L1200 600 Z" style={{ fill: "var(--cherry)" }} />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={600 - (i + 1) * 30} y1="420" x2={-200 + i * 40} y2="600" style={{ stroke: "var(--gold)" }} strokeOpacity="0.08" />
          ))}
          <line x1="0" y1="600" x2="520" y2="420" style={{ stroke: "var(--gold)" }} strokeOpacity="0.5" strokeWidth="2" />
          {/* locomotive silhouette on right */}
          <g transform="translate(820 330)">
            <rect x="0" y="40" width="300" height="120" rx="10" style={{ fill: "var(--crimson)" }} />
            <rect x="200" y="0" width="90" height="70" style={{ fill: "var(--burgundy)" }} />
            <rect x="30" y="10" width="26" height="40" style={{ fill: "var(--cherry)" }} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={70 + i * 40} y="60" width="26" height="30" rx="4" style={{ fill: "var(--candle)", animation: `window-glow 3s ${i * 0.4}s infinite` }} />
            ))}
            <circle cx="60" cy="170" r="30" style={{ fill: "var(--cherry)", stroke: "var(--gold)" }} strokeWidth="3" />
            <circle cx="150" cy="170" r="30" style={{ fill: "var(--cherry)", stroke: "var(--gold)" }} strokeWidth="3" />
            <circle cx="240" cy="170" r="30" style={{ fill: "var(--cherry)", stroke: "var(--gold)" }} strokeWidth="3" />
            <line x1="0" y1="100" x2="300" y2="100" style={{ stroke: "var(--gold)" }} strokeWidth="3" />
          </g>
        </svg>
        {/* chimney puffs */}
        <div className="pointer-events-none absolute right-[18%] top-[48%]" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-24 w-24 rounded-full"
              style={{ background: "radial-gradient(circle, oklch(0.94 0.03 80 / 45%), transparent 70%)", filter: "blur(6px)", animation: `puff 4s ease-out ${i * 0.8}s infinite` }}
            />
          ))}
        </div>
        {/* lanterns */}
        {[12, 32, 68, 88].map((l, i) => (
          <div key={i} className="absolute top-0 origin-top" style={{ left: `${l}%`, animation: `lantern-sway ${4 + i}s ease-in-out infinite` }} aria-hidden>
            <div className="mx-auto h-[18vh] w-px bg-gold/50" />
            <div className="h-8 w-6 rounded-sm border border-gold bg-candle" style={{ boxShadow: "var(--glow-candle)", animation: "flicker 1.6s infinite" }} />
          </div>
        ))}
        {/* sign */}
        <div className="absolute left-1/2 top-[6%] -translate-x-1/2 rounded border-2 border-gold bg-burgundy px-5 py-2 text-center shadow-lg" style={{ animation: "fade-up 1.2s 0.4s both" }}>
          <p className="font-display text-[0.55rem] tracking-[0.3em] text-candle">KING'S CROSS · WIZARDING LINE</p>
          <p className="font-deco text-xl text-gold-shimmer sm:text-2xl">Platform 9¾</p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(90deg, transparent, oklch(0.89 0.08 85 / 0.12), transparent)", animation: "light-move 8s ease-in-out infinite" }} />
        <Steam count={7} />
        <Particles count={30} />
      </div>

      {/* materializing invitation */}
      {!boarding && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.89 0.08 85 / 0.45), transparent 65%)", animation: "orb-grow 2s var(--ease-magic) 1s both" }}
          />
          <div
            className="parchment gold-frame relative w-[min(88vw,420px)] rounded-md px-6 py-8 text-center"
            style={{ animation: "materialize 2.4s var(--ease-magic) 1.8s both" }}
          >
            <Crest className="mx-auto h-12 w-12" />
            <p className="mt-2 font-display text-[0.6rem] tracking-[0.35em]">TOGETHER WITH THEIR FAMILIES</p>
            <h2 className="mt-3 font-script text-5xl text-crimson"><Letters text={wedding.bride} delay={3} /></h2>
            <p className="my-1 font-display text-xs tracking-[0.5em]" style={{ animation: "fade-in 1s 3.8s both" }}>WEDS</p>
            <h2 className="font-script text-5xl text-crimson"><Letters text={wedding.groom} delay={4.1} /></h2>
            <div style={{ animation: "fade-up 1s 5s both" }} className="mt-4 space-y-1 font-serif">
              <p className="italic">{wedding.invitation}</p>
              <p className="text-sm">{wedding.events[0]!.date.replace("Saturday, ", "")} &amp; {wedding.events[1]!.date.replace("Sunday, ", "")}</p>
              <p className="font-display text-xs tracking-[0.2em]">{wedding.venue.name.toUpperCase()}</p>
            </div>
            <button onClick={board} className="btn-magic mt-6 rounded-full px-7 py-3 text-xs" style={{ animation: "fade-up 1s 6s both" }}>
              BOARD THE TRAIN
            </button>
          </div>
        </div>
      )}
      {/* carriage doors closing then opening into light */}
      {boarding && (
        <div className="pointer-events-none absolute inset-0 flex" aria-hidden>
          <div className="h-full w-1/2 velvet-tex border-r border-gold" style={{ animation: "fade-in 0.6s 1.2s both" }} />
          <div className="h-full w-1/2 velvet-tex border-l border-gold" style={{ animation: "fade-in 0.6s 1.2s both" }} />
        </div>
      )}
    </section>
  );
}

/* ================= SCENE 3+4: TRAIN JOURNEY ================= */
function Layer({ children, speed, className = "" }: { children: React.ReactNode; speed: number; className?: string }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 flex w-[200%] ${className}`} style={{ animation: `scroll-x ${speed}s linear infinite` }}>
      <div className="w-1/2">{children}</div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}

export function JourneyScene({ duration }: { duration: number }) {
  return (
    <section className="fixed inset-0 overflow-hidden bg-night">
      <OptionalVideo src={wedding.videos.train} />
      {/* doors opening */}
      <div className="pointer-events-none absolute inset-0 z-30 flex" aria-hidden>
        <div className="h-full w-1/2 velvet-tex border-r border-gold" style={{ animation: "doors-open-l 1.6s var(--ease-cine) 0.2s forwards" }} />
        <div className="h-full w-1/2 velvet-tex border-l border-gold" style={{ animation: "doors-open-r 1.6s var(--ease-cine) 0.2s forwards" }} />
      </div>
      <div className="absolute inset-0" style={{ animation: `camera-push ${duration}ms ease-in-out both` }}>
        <Stars count={80} />
        <div className="absolute right-[15%] top-[10%] h-20 w-20 rounded-full bg-ivory" style={{ boxShadow: "0 0 60px 20px oklch(0.94 0.03 80 / 25%)" }} />
        {/* far mountains */}
        <Layer speed={60}>
          <svg viewBox="0 0 1000 300" className="h-[55vh] w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 300 L0 180 L90 90 L170 170 L260 60 L360 160 L460 80 L560 190 L650 70 L760 160 L860 100 L1000 180 L1000 300Z" style={{ fill: "var(--burgundy)" }} opacity="0.7" />
          </svg>
        </Layer>
        {/* gothic silhouettes + forest */}
        <Layer speed={28}>
          <svg viewBox="0 0 1000 300" className="h-[42vh] w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 300 V220 L40 160 L80 220 L120 140 L160 220 L210 170 L250 220 L300 120 L330 200 L380 150 L420 220 L470 130 L520 220 L560 160 L610 220 L660 140 L700 220 L750 170 L800 220 L850 120 L890 210 L940 150 L1000 220 V300Z" style={{ fill: "var(--cherry)" }} />
            <g style={{ fill: "var(--cherry)" }}>
              <rect x="580" y="90" width="20" height="140" /><path d="M576 90 L590 50 L604 90Z" />
            </g>
            <rect x="584" y="120" width="5" height="8" style={{ fill: "var(--candle)" }} />
          </svg>
        </Layer>
        {/* viaduct bridge */}
        <Layer speed={14} className="bottom-[8vh]">
          <svg viewBox="0 0 1000 120" className="h-[16vh] w-full" preserveAspectRatio="none" aria-hidden>
            <rect x="0" y="0" width="1000" height="14" style={{ fill: "var(--crimson)" }} />
            {Array.from({ length: 10 }).map((_, i) => (
              <path key={i} d={`M${i * 100} 14 h100 v106 h-14 q-36 -70 -72 0 h-14z`} style={{ fill: "var(--crimson)" }} opacity="0.9" />
            ))}
          </svg>
        </Layer>
        {/* train */}
        <div className="absolute bottom-[calc(8vh+16vh-4px)] left-1/2 w-[min(150vw,1100px)] -translate-x-1/2" style={{ animation: "train-bob 0.5s ease-in-out infinite" }}>
          <svg viewBox="0 0 1100 120" className="w-full" aria-hidden>
            {[0, 1, 2].map((c) => (
              <g key={c} transform={`translate(${c * 270} 20)`}>
                <rect width="260" height="80" rx="6" style={{ fill: "var(--crimson)", stroke: "var(--gold)" }} strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((w) => (
                  <rect key={w} x={18 + w * 48} y="16" width="30" height="30" rx="3" style={{ fill: "var(--candle)", animation: `window-glow ${2 + w * 0.3}s infinite` }} />
                ))}
                <circle cx="50" cy="92" r="10" style={{ fill: "var(--cherry)" }} /><circle cx="210" cy="92" r="10" style={{ fill: "var(--cherry)" }} />
              </g>
            ))}
            <g transform="translate(810 0)">
              <rect y="30" width="230" height="70" rx="8" style={{ fill: "var(--crimson)", stroke: "var(--gold)" }} strokeWidth="2" />
              <rect x="10" y="0" width="70" height="50" style={{ fill: "var(--burgundy)" }} />
              <rect x="180" y="6" width="22" height="26" style={{ fill: "var(--cherry)" }} />
              <rect x="22" y="12" width="40" height="22" style={{ fill: "var(--candle)" }} />
              <circle cx="235" cy="65" r="8" style={{ fill: "var(--candle)" }} />
              {[40, 110, 180].map((x) => <circle key={x} cx={x} cy="100" r="16" style={{ fill: "var(--cherry)", stroke: "var(--gold)" }} strokeWidth="2" />)}
            </g>
          </svg>
          <div className="absolute right-[6%] top-0" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="absolute h-20 w-20 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.94 0.03 80 / 50%), transparent 70%)", animation: `puff 2.5s ease-out ${i * 0.5}s infinite` }} />
            ))}
          </div>
        </div>
        {/* foreground mist */}
        <Layer speed={8} className="bottom-0">
          <div className="h-[12vh] w-full" style={{ background: "radial-gradient(ellipse at 30% 100%, oklch(0.94 0.03 80 / 25%), transparent 60%), radial-gradient(ellipse at 80% 100%, oklch(0.94 0.03 80 / 20%), transparent 60%)" }} />
        </Layer>
        <Particles count={25} />
      </div>
      <div className="absolute inset-x-0 top-8 z-20 text-center" style={{ animation: "fade-up 1.2s 1.8s both" }}>
        <p className="font-display text-[0.65rem] tracking-[0.4em] text-candle">THE JOURNEY BEGINS</p>
        <p className="mt-2 font-script text-4xl text-gold-shimmer">to a love written in the stars</p>
        <div className="mx-auto mt-4 h-px w-48 origin-left bg-gold" style={{ animation: `progress ${duration}ms linear both` }} />
      </div>
    </section>
  );
}

/* ================= SCENE 5: CASTLE ================= */
function Tower({ x, w, h, roof }: { x: number; w: number; h: number; roof: number }) {
  return (
    <g>
      <rect x={x} y={500 - h} width={w} height={h} style={{ fill: "var(--cherry)" }} />
      <path d={`M${x - 6} ${500 - h} L${x + w / 2} ${500 - h - roof} L${x + w + 6} ${500 - h}Z`} style={{ fill: "var(--burgundy)" }} />
      {Array.from({ length: Math.floor(h / 60) }).map((_, i) => (
        <path
          key={i}
          d={`M${x + w / 2 - 5} ${500 - h + 30 + i * 60} v-8 q5 -8 10 0 v8z`}
          transform={`translate(0 14)`}
          style={{ fill: "var(--candle)", animation: `window-on 0.8s ${1.8 + rnd(x + i, 51) * 2.5}s both, window-glow 3s ${i * 0.3}s infinite` }}
        />
      ))}
    </g>
  );
}

export function CastleScene() {
  return (
    <section className="fixed inset-0 overflow-hidden bg-night" style={{ animation: "scene-in 1.4s var(--ease-magic) both" }}>
      <div className="absolute inset-0" style={{ animation: "camera-push 7s ease-out both" }}>
        <Stars count={90} />
        <div className="absolute inset-0 flex items-end justify-center">
          <svg viewBox="0 0 1000 500" className="w-[240vw] max-w-none sm:h-[78vh] sm:w-full" preserveAspectRatio="xMidYMax meet" style={{ animation: "castle-rise 4s var(--ease-magic) 0.4s both" }} aria-hidden>
            {/* distant towers */}
            <g opacity="0.55">
              <Tower x={120} w={30} h={180} roof={60} />
              <Tower x={820} w={34} h={200} roof={70} />
            </g>
            {/* cliff */}
            <path d="M0 500 L0 420 Q200 380 320 400 L400 360 H620 L700 390 Q850 380 1000 430 V500Z" style={{ fill: "var(--cherry)" }} />
            {/* main body */}
            <rect x="330" y="250" width="340" height="120" style={{ fill: "var(--cherry)" }} />
            <Tower x={300} w={50} h={300} roof={110} />
            <Tower x={470} w={60} h={390} roof={140} />
            <Tower x={650} w={50} h={280} roof={100} />
            <Tower x={390} w={40} h={240} roof={80} />
            <Tower x={570} w={40} h={260} roof={90} />
            <Tower x={230} w={34} h={200} roof={70} />
            <Tower x={730} w={34} h={210} roof={70} />
            {/* great hall windows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <path key={i} d={`M${355 + i * 52} 340 v-40 q12 -22 24 0 v40z`} style={{ fill: "var(--candle)", animation: `window-on 1s ${2.2 + i * 0.2}s both` }} />
            ))}
          </svg>
        </div>
        {/* clouds / mist parting */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="pointer-events-none absolute inset-x-[-20%]" style={{ top: `${25 + i * 22}%`, height: "30vh", animation: `cloud-drift ${14 + i * 4}s ease-in-out infinite alternate` }} aria-hidden>
            <div className="h-full w-full" style={{ background: "radial-gradient(ellipse at 30% 50%, oklch(0.94 0.03 80 / 18%), transparent 60%), radial-gradient(ellipse at 75% 50%, oklch(0.94 0.03 80 / 14%), transparent 55%)", filter: "blur(10px)" }} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 velvet-tex opacity-80" style={{ filter: "blur(30px)", animation: "mist-part 3s var(--ease-cine) 0.2s both", "--mx": "-80%" } as React.CSSProperties} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 velvet-tex opacity-80" style={{ filter: "blur(30px)", animation: "mist-part 3s var(--ease-cine) 0.2s both", "--mx": "80%" } as React.CSSProperties} />
        <FloatingCandles count={8} />
        <Particles count={35} />
      </div>
      <div className="absolute inset-x-0 top-[8%] text-center" style={{ animation: "fade-up 1.5s 2.6s both" }}>
        <p className="font-display text-[0.65rem] tracking-[0.4em] text-candle">ARRIVING AT</p>
        <p className="font-deco text-3xl text-gold-shimmer sm:text-5xl">The Enchanted Castle</p>
      </div>
    </section>
  );
}

/* ================= SCENE 6: GREAT HALL ================= */
export function HallBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 40 + i * 190;
          return (
            <path key={i} d={`M${x} 600 V260 Q${x} 120 ${x + 80} 80 Q${x + 160} 120 ${x + 160} 260 V600`} fill="none" style={{ stroke: "var(--gold)" }} strokeOpacity="0.18" strokeWidth="3" />
          );
        })}
        <path d="M0 600 L380 380 H620 L1000 600Z" style={{ fill: "var(--cherry)" }} opacity="0.7" />
      </svg>
      <FloatingCandles count={22} />
      <Particles count={30} />
    </div>
  );
}

export function HallScene() {
  return (
    <section className="fixed inset-0 overflow-hidden bg-velvet" style={{ animation: "iris-out 1.8s var(--ease-cine) both" }}>
      <OptionalVideo src={wedding.videos.hall} />
      <HallBackdrop />
      <div className="pointer-events-none absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, oklch(0.89 0.08 85 / 0.18), transparent)", animation: "sweep 3s var(--ease-cine) 0.6s both" }} />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-[0.65rem] tracking-[0.4em] text-candle" style={{ animation: "fade-up 1s 0.6s both" }}>WELCOME TO THE GREAT HALL</p>
        <h2 className="font-script text-4xl text-gold-crisp sm:text-7xl"><Letters text={wedding.heading} delay={0.6} step={0.03} /></h2>
        <div style={{ animation: "fade-in 1s 2s both" }}><Divider /></div>
      </div>
    </section>
  );
}
