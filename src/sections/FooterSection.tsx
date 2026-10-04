import { Heart } from "lucide-react"
import config from "@/config"
import Reveal from "@/components/Reveal"

/**
 * Soft watercolor-style floral band for the footer.
 */
function WatercolorFloral() {
  return (
    <svg viewBox="0 0 1440 190" className="block w-full" aria-hidden preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e3b89c" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#e9c8b2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e9c8b2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sage" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b3b895" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#b3b895" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="goldw" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6b47c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d6b47c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft washes */}
      <ellipse cx="180" cy="160" rx="180" ry="70" fill="url(#blush)" />
      <ellipse cx="520" cy="175" rx="150" ry="55" fill="url(#sage)" />
      <ellipse cx="900" cy="165" rx="190" ry="70" fill="url(#blush)" />
      <ellipse cx="1260" cy="170" rx="160" ry="60" fill="url(#goldw)" />

      {/* stems */}
      {[
        "M150,190 C155,140 145,110 165,80",
        "M500,190 C495,150 510,120 500,92",
        "M880,190 C885,145 875,118 895,84",
        "M1240,190 C1235,150 1250,125 1242,96",
      ].map((d, i) => (
        <path key={i} d={d} stroke="#a9b08a" strokeWidth="2" fill="none" opacity="0.65" strokeLinecap="round" />
      ))}

      {/* leaves */}
      {[
        [158, 128, -30], [148, 150, 25], [505, 140, -25], [497, 118, 30],
        [888, 132, -28], [880, 155, 22], [1245, 142, -24], [1236, 120, 28],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x} cy={y} rx="14" ry="5.5"
          fill="#b3b895" opacity="0.55"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}

      {/* blossoms — layered petals with watercolor softness */}
      {([
        [165, 74, 26, "#e3b89c"], [500, 86, 21, "#e9c8b2"],
        [895, 78, 27, "#e3b89c"], [1242, 90, 20, "#d6b47c"],
      ] as [number, number, number, string][]).map(([cx, cy, r, col], i) => (
        <g key={i} opacity="0.85">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx={cx}
              cy={cy - (r as number) * 0.62}
              rx={(r as number) * 0.42}
              ry={(r as number) * 0.68}
              fill={col as string}
              opacity="0.55"
              transform={`rotate(${a} ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r={(r as number) * 0.3} fill="#d6b47c" opacity="0.85" />
        </g>
      ))}

      {/* scattered tiny buds */}
      {[
        [320, 160], [680, 170], [1060, 158], [1360, 165], [60, 170],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#d6b47c" opacity="0.5" />
      ))}
    </svg>
  )
}

/**
 * FOOTER · thank-you note, beating heart, watercolor florals.
 */
export default function FooterSection() {
  return (
    <footer className="relative mt-4 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-8 text-center">
        <Reveal>
          <Heart className="heart-beat mx-auto h-6 w-6 fill-gold/90 text-gold" strokeWidth={1} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-script text-4xl text-ink sm:text-5xl">{config.footer.thanks}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="font-serif text-lg italic text-ink/70">
            {config.couple.brideShort} & {config.couple.groomShort}
          </p>
        </Reveal>
      </div>

      <WatercolorFloral />

      <p className="relative z-10 bg-cream/40 pb-2 pt-1 text-center font-body text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground/80">
        {config.footer.copyright}
      </p>
      <a
        href="https://www.instagram.com/invitestory.in/"
        target="_blank"
        rel="noreferrer"
        className="relative z-10 block bg-cream/40 pb-5 text-center font-body text-[0.6rem] uppercase tracking-[0.32em] text-gold/80 transition-colors hover:text-gold"
      >
        Follow @invitestory.in on Instagram
      </a>
    </footer>
  )
}
