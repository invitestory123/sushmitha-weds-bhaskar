import { Sparkles, Calendar, Clock, MapPin, Shirt, PartyPopper, ExternalLink } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

/**
 * SECTION 4 · Wedding Details — Wedding Ceremony & Grand Reception.
 */
export default function Details() {
  const d = config.details

  const events = [
    {
      icon: Sparkles,
      tag: "Sacred Vows",
      title: d.ceremony.title,
      date: d.ceremony.date,
      venue: d.ceremony.venue,
      time: d.ceremony.time,
      note: d.ceremony.note,
      mapUrl: d.ceremony.mapUrl,
    },
    ...(d.reception
      ? [
          {
            icon: PartyPopper,
            tag: "Celebration",
            title: d.reception.title,
            date: d.reception.date,
            venue: d.reception.venue,
            time: d.reception.time,
            note: d.reception.note,
            mapUrl: d.reception.mapUrl,
          },
        ]
      : []),
  ]

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Wedding Details" title="When & where" />

      <div className="grid gap-8 md:grid-cols-2">
        {events.map((ev, i) => (
          <Reveal key={ev.title} delay={i * 0.15}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 bg-ivory/85 p-7 text-center shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl sm:p-8">
              {/* Top tag badge */}
              <div>
                <span className="inline-block rounded-full bg-gold/15 px-3 py-1 font-body text-[0.62rem] uppercase tracking-[0.22em] text-gold-dark">
                  {ev.tag}
                </span>

                <div className="mx-auto my-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-cream/80 transition-transform duration-500 group-hover:scale-110">
                  <ev.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-2xl text-ink sm:text-3xl">{ev.title}</h3>

                <div className="mt-3 flex items-center justify-center gap-2 text-ink/80">
                  <Calendar className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <span className="font-body text-xs font-medium uppercase tracking-[0.16em]">
                    {ev.date}
                  </span>
                </div>

                <div className="my-2.5 flex items-center justify-center gap-2 text-gold">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="font-body text-xs uppercase tracking-[0.18em]">{ev.time}</span>
                </div>

                <div className="my-4 rounded-xl border border-gold/20 bg-cream/40 p-4">
                  <p className="flex items-start justify-center gap-2 text-center font-body text-sm font-medium text-ink/85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    <span>{ev.venue}</span>
                  </p>
                </div>

                <p className="font-body text-xs font-light italic text-muted-foreground">
                  {ev.note}
                </p>
              </div>

              {/* Map CTA Link */}
              <div className="mt-6 pt-4 border-t border-gold/15">
                <a
                  href={ev.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-body text-[0.7rem] uppercase tracking-[0.2em] text-gold-dark transition-all duration-300 hover:bg-gold hover:text-ivory"
                >
                  <span>Open Venue Map</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25} className="mt-10">
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-gold/25 bg-ivory/70 px-6 py-3 shadow-sm">
          <Shirt className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          <p className="text-center font-body text-xs uppercase tracking-[0.16em] text-ink/75">
            {d.dressCode}
          </p>
        </div>
      </Reveal>
    </section>
  )
}