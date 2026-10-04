import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"

/**
 * SECTION 6 · Gallery — masonry layout; photos flow seamlessly into the
 * lightbox via shared layout transitions.
 */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((o) =>
        o === null ? o : (o + dir + config.gallery.length) % config.gallery.length,
      ),
    [],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close, step])

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Gallery" title="Moments we keep" />

      <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {config.gallery.map((g, i) => (
          <motion.button
            key={g.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group block w-full overflow-hidden rounded-xl photo-frame !p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <motion.img
              layoutId={`gallery-img-${i}`}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="w-full rounded-[7px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
          </motion.button>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded-full bg-ivory/15 p-2 text-ivory transition hover:bg-ivory/30"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/15 p-2 text-ivory transition hover:bg-ivory/30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/15 p-2 text-ivory transition hover:bg-ivory/30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <figure
              className="max-h-[82vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`gallery-img-${open}`}
                src={config.gallery[open].src}
                alt={config.gallery[open].alt}
                className="max-h-[74vh] w-auto rounded-lg object-contain shadow-2xl"
              />
              <motion.figcaption
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-3 text-center font-serif text-lg italic text-ivory/90"
              >
                {config.gallery[open].alt}
              </motion.figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
