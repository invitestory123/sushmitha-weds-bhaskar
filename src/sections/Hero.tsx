import { ChevronDown, Sparkles } from "lucide-react"
import config from "@/config"

/**
 * HERO — Sushmita & Bhaskar.
 * Clean, immediate, non-animated opening couple portrait above the wedding details & names.
 */
export default function Hero() {
  const [tagline1, tagline2] = config.tagline.split("\n")

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-10">
      {/* Warm romantic ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(38_75%_80%/0.55),transparent)] blur-3xl" />

      {/* SAVE THE DATE */}
      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-gold/80" />
          <span className="eyebrow">Save the Date</span>
          <Sparkles className="h-3 w-3 text-gold/80" />
        </div>
        <div className="gold-hairline w-28" />
      </div>

      {/* ── THE COUPLE (First Photo above the text - Static, No Animation) ──────── */}
      <div className="relative flex w-full max-w-lg flex-1 items-center justify-center py-3">
        <div className="relative z-10 flex h-[48vh] max-h-[440px] min-h-[280px] items-center justify-center">
          <div className="relative h-full aspect-[2/3] overflow-hidden rounded-t-[72px] rounded-b-2xl border-2 border-gold/45 bg-ivory/95 p-2 shadow-2xl ring-1 ring-gold/25 sm:rounded-t-[90px] sm:p-2.5">
            {/* Gold inner filigree border */}
            <div className="relative h-full w-full overflow-hidden rounded-t-[64px] rounded-b-xl sm:rounded-t-[82px] bg-cream">
              <img
                src={config.hero.firstPhoto}
                alt={`${config.couple.brideShort} & ${config.couple.groomShort}`}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-center"
              />
              {/* Subtle vignette and warm lighting */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/25" />
            </div>
          </div>
        </div>
      </div>

      {/* Date · Tagline · Names (Immediately visible below the photo) */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
          {config.displayDate}
        </p>
        <p className="font-serif text-lg italic text-ink/80 sm:text-xl">
          “{tagline1} {tagline2}”
        </p>
        <h1 className="mt-1 font-script text-5xl leading-tight text-ink sm:text-6xl">
          <span>{config.couple.brideShort}</span>
          <span className="mx-3 inline-block font-serif text-3xl italic text-gold sm:text-4xl">
            &
          </span>
          <span>{config.couple.groomShort}</span>
        </h1>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mt-4 flex flex-col items-center gap-1 text-gold">
        <span className="font-body text-[0.55rem] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
