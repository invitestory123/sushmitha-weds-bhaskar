import { motion } from "framer-motion"
import { Heart, Users, Gem, Church } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"

const ICONS = [Heart, Users, Gem, Church]

/**
 * SECTION 2 · Our Story — timeline cards that unfold into view.
 */
export default function Story() {
  return (
    <section className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Our Story" title="The road to forever" />

      <div className="relative">
        {/* spine */}
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-gold/10 via-gold/50 to-gold/10 sm:left-1/2"
        />

        <div className="flex flex-col gap-10 sm:gap-14">
          {config.story.map((m, i) => {
            const Icon = ICONS[i % ICONS.length]
            const left = i % 2 === 0
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 34, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-14% 0px" }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-5 pl-12 sm:w-1/2 sm:pl-0 ${
                  left
                    ? "sm:flex-row-reverse sm:self-start sm:pr-12 sm:text-right"
                    : "sm:self-end sm:pl-12"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-[7px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-ivory shadow-sm sm:top-0 ${
                    left ? "sm:-right-3 sm:left-auto" : "sm:-left-3"
                  }`}
                >
                  <Icon className="h-3 w-3 text-gold" />
                </span>

                <motion.div
                  whileHover={{ y: -6, rotate: left ? -0.6 : 0.6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="photo-frame w-full rounded-xl bg-ivory/80 p-5 sm:p-6"
                >
                  <span className="eyebrow !tracking-[0.3em]">{m.date}</span>
                  <h3 className="mt-1 font-serif text-2xl text-ink">{m.title}</h3>
                  <p className="mt-2 font-body text-sm font-light leading-relaxed text-ink/70">
                    {m.text}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
