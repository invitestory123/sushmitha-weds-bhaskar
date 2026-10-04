import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

function useCountdown(target: string) {
  const compute = () => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now())
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor(diff / 3_600_000) % 24,
      minutes: Math.floor(diff / 60_000) % 60,
      seconds: Math.floor(diff / 1_000) % 60,
    }
  }
  const [t, setT] = useState(compute)
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  return t
}

function Digit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="digit-cell relative flex h-20 w-16 items-center justify-center overflow-hidden rounded-xl sm:h-28 sm:w-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 22, opacity: 0, filter: "blur(3px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -22, opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl text-ink sm:text-6xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow !text-[0.55rem] sm:!text-[0.65rem]">{label}</span>
    </div>
  )
}

/**
 * SECTION 3 · Countdown — large elegant animated digits.
 */
export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(config.weddingDate)

  return (
    <section className="relative px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Counting the moments" title="Until we say I do" />
      <Reveal className="flex items-start justify-center gap-3 sm:gap-6">
        <Digit value={days} label="Days" />
        <span className="mt-7 font-serif text-3xl text-gold/60 sm:mt-10 sm:text-5xl">·</span>
        <Digit value={hours} label="Hours" />
        <span className="mt-7 font-serif text-3xl text-gold/60 sm:mt-10 sm:text-5xl">·</span>
        <Digit value={minutes} label="Minutes" />
        <span className="mt-7 hidden font-serif text-3xl text-gold/60 sm:mt-10 sm:block sm:text-5xl">·</span>
        <div className="hidden sm:block">
          <Digit value={seconds} label="Seconds" />
        </div>
      </Reveal>
      <Reveal delay={0.15} className="mt-8 text-center">
        <p className="font-serif text-base italic text-ink/60">{config.displayDate}</p>
      </Reveal>
    </section>
  )
}
