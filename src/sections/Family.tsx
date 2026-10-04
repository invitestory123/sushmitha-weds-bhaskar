import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

/**
 * SECTION 7 · Family — elegant cards for both families.
 */
export default function Family() {
  const sides = [config.families.bride, config.families.groom]

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="With love, our families" title="The ones who raised us" />

      <div className="grid gap-8 sm:grid-cols-2">
        {sides.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.14}>
            <div className="photo-frame flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ivory/85 shadow-md">
              <div className="overflow-hidden bg-cream/50">
                <img
                  src={f.photo}
                  alt={f.title}
                  loading="lazy"
                  className="h-72 sm:h-80 w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
              <div className="flex-1 p-6 text-center sm:p-7">
                <span className="eyebrow !text-[0.6rem]">{f.label}</span>
                <h3 className="mt-1 font-script text-3xl text-ink">{f.title}</h3>
                <div className="gold-hairline mx-auto my-4 w-16" />
                <ul className="flex flex-col gap-3">
                  {f.members.map((m) => (
                    <li key={m.name}>
                      <p className="font-serif text-lg text-ink">{m.name}</p>
                      <p className="font-body text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                        {m.relation}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
