import { useEffect, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import config from "@/config"

const EASE = [0.22, 1, 0.36, 1] as const

/** Script name revealed letter by letter */
function ScriptName({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.045, ease: EASE }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * HERO — Sushmita & Bhaskar.
 * Opening first photo is immediately visible on page load.
 * On scroll down, it gracefully transitions to reveal royal palace & casual portraits.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  /* ── pointer parallax (desktop only) ─────────────────────── */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })
  const cardPX = useTransform(sx, (v) => v * 14)
  const cardPY = useTransform(sy, (v) => v * 10)
  const glowX = useTransform(sx, (v) => v * 28)
  const glowY = useTransform(sy, (v) => v * 18)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  /* ── scroll morph (crisp, hardware-accelerated transitions) ── */
  /* First photo is 100% visible at the top (0 to 0.32), then gently transitions */
  const firstPhotoOpacity = useTransform(p, [0.32, 0.68], [1, 0])
  const firstPhotoScale = useTransform(p, [0.32, 0.68], [1, 0.92])
  const firstPhotoY = useTransform(p, [0.32, 0.68], [0, -25])
  const firstPhotoPointer = useTransform(p, (v) => (v < 0.5 ? "auto" : "none"))

  /* Scrolled portraits bloom into view from 0.45 onwards */
  const secondPhotoOpacity = useTransform(p, [0.45, 0.82], [0, 1])
  const secondPhotoScale = useTransform(p, [0.45, 0.88], [0.92, 1])
  const secondPhotoY = useTransform(p, [0.45, 0.88], [30, 0])
  const secondPhotoPointer = useTransform(p, (v) => (v >= 0.5 ? "auto" : "none"))

  /* Header + footer text scroll transitions */
  const topTextY = useTransform(p, [0, 0.38], [0, -50])
  const topTextOpacity = useTransform(p, [0, 0.32], [1, 0])
  const bottomTextY = useTransform(p, [0, 0.3], [0, 30])
  const bottomTextOpacity = useTransform(p, [0, 0.26], [1, 0])
  const cueOpacity = useTransform(p, [0, 0.1], [1, 0])

  const [tagline1, tagline2] = config.tagline.split("\n")

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-10">
        {/* Warm romantic glow that follows pointer */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(38_75%_80%/0.55),transparent)] blur-3xl"
        />

        {/* SAVE THE DATE */}
        <motion.div
          style={{ y: topTextY, opacity: topTextOpacity }}
          className="relative z-10 flex flex-col items-center gap-2.5"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-3 w-3 text-gold/80" />
            <span className="eyebrow">Save the Date</span>
            <Sparkles className="h-3 w-3 text-gold/80" />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="gold-hairline w-28"
          />
        </motion.div>

        {/* ── THE COUPLE (Opening Portrait & Scroll Reveal) ──────── */}
        <div className="relative flex w-full max-w-lg flex-1 items-center justify-center py-2">
          {/* Opening First Photo: Traditional Stone Pillars Portrait (Immediately Visible) */}
          <motion.div
            style={{
              opacity: firstPhotoOpacity,
              scale: firstPhotoScale,
              y: firstPhotoY,
              x: cardPX,
              pointerEvents: firstPhotoPointer,
            }}
            className="relative z-10 flex h-[48vh] max-h-[440px] min-h-[280px] items-center justify-center"
          >
            <motion.div
              style={{ y: cardPY }}
              className="group relative h-full aspect-[2/3] overflow-hidden rounded-t-[72px] rounded-b-2xl border-2 border-gold/45 bg-ivory/95 p-2 shadow-2xl ring-1 ring-gold/25 sm:rounded-t-[90px] sm:p-2.5"
            >
              {/* Gold inner filigree border */}
              <div className="relative h-full w-full overflow-hidden rounded-t-[64px] rounded-b-xl sm:rounded-t-[82px] bg-cream">
                <img
                  src={config.hero.firstPhoto}
                  alt={`${config.couple.brideShort} & ${config.couple.groomShort}`}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle vignette and warm lighting */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/25" />
              </div>
            </motion.div>
          </motion.div>

          {/* Scrolled State: Couple's Royal & Casual Portraits bloom into view */}
          <motion.div
            style={{
              opacity: secondPhotoOpacity,
              scale: secondPhotoScale,
              y: secondPhotoY,
              pointerEvents: secondPhotoPointer,
            }}
            className="absolute inset-0 z-20 flex items-center justify-center gap-3 sm:gap-5"
          >
            {[
              {
                src: config.hero.royalPhoto,
                alt: `${config.couple.brideShort} & ${config.couple.groomShort} · Royal Palace`,
                caption: "The Royal Union",
              },
              {
                src: config.hero.casualPhoto,
                alt: `${config.couple.brideShort} & ${config.couple.groomShort} · Together`,
                caption: "Forever Begins",
              },
            ].map((item) => (
              <div
                key={item.src}
                className="group relative w-[38vw] max-w-44 overflow-hidden rounded-xl border border-gold/35 bg-ivory/90 p-1.5 shadow-xl ring-1 ring-gold/15 transition-transform duration-500 hover:-translate-y-1 sm:max-w-48 sm:p-2"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
                </div>
                <p className="mt-1.5 text-center font-serif text-[0.72rem] italic tracking-wide text-ink/75 sm:text-xs">
                  {item.caption}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Date · Tagline · Names */}
        <motion.div
          style={{ y: bottomTextY, opacity: bottomTextOpacity }}
          className="relative z-10 flex flex-col items-center gap-1.5 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground"
          >
            {config.displayDate}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.0 }}
            className="font-serif text-lg italic text-ink/80 sm:text-xl"
          >
            “{tagline1} {tagline2}”
          </motion.p>
          <h1 className="mt-1 font-script text-5xl leading-tight text-ink sm:text-6xl">
            <ScriptName text={config.couple.brideShort} delay={1.1} />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
              className="mx-3 inline-block font-serif text-3xl italic text-gold sm:text-4xl"
            >
              &
            </motion.span>
            <ScriptName text={config.couple.groomShort} delay={1.6} />
          </h1>
        </motion.div>

        {/* Scroll cue */}
        <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-gold"
          >
            <span className="font-body text-[0.55rem] uppercase tracking-[0.35em]">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
