import { useState, type CSSProperties } from "react";

// deterministic pseudo-random so SSR and client match
export const rnd = (i: number, s = 1) => {
  const x = Math.sin(i * 9301 + s * 49297) * 233280;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

export function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const size = 1.5 + rnd(i, 2) * 3.5;
        const style: CSSProperties & Record<string, string> = {
          left: `${rnd(i, 1) * 100}%`,
          bottom: `-${rnd(i, 5) * 20}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `float-up ${8 + rnd(i, 3) * 10}s linear ${-rnd(i, 4) * 15}s infinite`,
          "--dx": `${(rnd(i, 6) - 0.5) * 160}px`,
          background: "var(--candle)",
          boxShadow: "0 0 8px 2px oklch(0.89 0.08 85 / 60%)",
        };
        return <span key={i} className="absolute rounded-full" style={style} />;
      })}
    </div>
  );
}

export function Candle({ x, y, scale = 1, delay = 0 }: { x: string; y: string; scale?: number; delay?: number }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: x, top: y, transform: `scale(${scale})`, opacity: 0.4 + scale * 0.6 }}
      aria-hidden
    >
      <div style={{ animation: `candle-float ${4 + delay}s ease-in-out ${-delay}s infinite` }}>
        <div className="relative mx-auto h-4 w-3">
          <div
            className="absolute inset-0 rounded-[50%_50%_45%_45%/60%_60%_40%_40%]"
            style={{
              background: "radial-gradient(ellipse at 50% 70%, var(--ivory), var(--candle) 40%, var(--gold) 80%, transparent)",
              boxShadow: "var(--glow-candle)",
              animation: `flicker ${0.8 + delay * 0.2}s ease-in-out infinite`,
              transformOrigin: "50% 100%",
            }}
          />
        </div>
        <div
          className="mx-auto h-12 w-3 rounded-sm"
          style={{ background: "linear-gradient(90deg, oklch(0.85 0.03 80), var(--ivory), oklch(0.8 0.03 80))" }}
        />
      </div>
    </div>
  );
}

export function FloatingCandles({ count = 14 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Candle
          key={i}
          x={`${4 + rnd(i, 11) * 90}%`}
          y={`${4 + rnd(i, 12) * 40}%`}
          scale={0.45 + rnd(i, 13) * 0.75}
          delay={rnd(i, 14) * 3}
        />
      ))}
    </>
  );
}

export function Steam({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${rnd(i, 21) * 60 - 10}%`,
            top: `${30 + rnd(i, 22) * 55}%`,
            width: `${40 + rnd(i, 23) * 40}vw`,
            height: `${20 + rnd(i, 24) * 20}vh`,
            background: "radial-gradient(ellipse, oklch(0.94 0.03 80 / 22%), transparent 70%)",
            filter: "blur(20px)",
            animation: `steam-drift ${10 + rnd(i, 25) * 8}s ease-in-out ${-rnd(i, 26) * 10}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Stars({ count = 60 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${rnd(i, 31) * 100}%`,
            top: `${rnd(i, 32) * 55}%`,
            width: rnd(i, 33) > 0.85 ? 3 : 1.5,
            height: rnd(i, 33) > 0.85 ? 3 : 1.5,
            background: "var(--ivory)",
            animation: `twinkle ${2 + rnd(i, 34) * 4}s ease-in-out ${-rnd(i, 35) * 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Optional video layer: renders nothing until the file actually loads. */
export function OptionalVideo({ src }: { src: string }) {
  const [ok, setOk] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
      style={{ opacity: ok ? 0.55 : 0, mixBlendMode: "screen" }}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setOk(true)}
      onError={() => setFailed(true)}
      aria-hidden
    />
  );
}

export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--candle)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "oklch(0.6 0.1 70)" }} />
        </linearGradient>
      </defs>
      <path d="M60 6 L108 24 V70 C108 102 86 124 60 134 C34 124 12 102 12 70 V24 Z" fill="none" stroke="url(#cg)" strokeWidth="2.5" />
      <path d="M60 16 L98 31 V70 C98 96 81 114 60 123 C39 114 22 96 22 70 V31 Z" fill="none" stroke="url(#cg)" strokeWidth="1" />
      <line x1="60" y1="16" x2="60" y2="123" stroke="url(#cg)" strokeWidth="0.8" />
      <line x1="22" y1="66" x2="98" y2="66" stroke="url(#cg)" strokeWidth="0.8" />
      <text x="60" y="76" textAnchor="middle" fontFamily="Cinzel Decorative" fontSize="28" fill="url(#cg)">D&amp;V</text>
      <path d="M60 32 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="url(#cg)" />
      <path d="M40 100 q20 12 40 0" fill="none" stroke="url(#cg)" strokeWidth="1.2" />
    </svg>
  );
}

export function Divider() {
  return (
    <div className="mx-auto flex w-56 max-w-full items-center gap-3" aria-hidden>
      <span className="h-px flex-1 origin-right bg-gold" style={{ animation: "divider-grow 1.4s var(--ease-magic) both" }} />
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className="h-px flex-1 origin-left bg-gold" style={{ animation: "divider-grow 1.4s var(--ease-magic) both" }} />
    </div>
  );
}

export function Letters({ text, delay = 0, step = 0.08 }: { text: string; delay?: number; step?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={{ animation: `letter-in 0.9s var(--ease-magic) ${delay + i * step}s both` }}
        >
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </span>
  );
}
