import { useState } from "react"
import { MapPin, Navigation, Calendar } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import Magnetic from "@/components/Magnetic"

/**
 * SECTION 5 · Venue — Interactive tabs for Wedding (Meghalaya) and Reception (Assam)
 * with embedded Google Maps & direct navigation links.
 */
export default function Venue() {
  const venues = [
    {
      key: "wedding",
      label: "Wedding Venue",
      sublabel: "Tura, Meghalaya",
      date: config.venue.wedding.date,
      name: config.venue.wedding.name,
      address: config.venue.wedding.address,
      mapQuery: config.venue.wedding.mapQuery,
      mapUrl: config.venue.wedding.mapUrl,
    },
    {
      key: "reception",
      label: "Reception Venue",
      sublabel: "Bongaigaon, Assam",
      date: config.venue.reception.date,
      name: config.venue.reception.name,
      address: config.venue.reception.address,
      mapQuery: config.venue.reception.mapQuery,
      mapUrl: config.venue.reception.mapUrl,
    },
  ]

  const [activeTab, setActiveTab] = useState<"wedding" | "reception">("wedding")
  const activeVenue = venues.find((v) => v.key === activeTab) || venues[0]

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(activeVenue.mapQuery)}&output=embed`

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="The Venues" title="Find your way to us" />

      {/* Animated route line decoration */}
      <Reveal className="mx-auto mb-8 max-w-sm">
        <svg viewBox="0 0 320 44" className="w-full" aria-hidden>
          <path
            d="M10,30 C80,6 240,6 310,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="route-line text-gold"
          />
          <circle cx="10" cy="30" r="4" fill="currentColor" className="text-gold/70" />
          <g transform="translate(302,20)">
            <path
              d="M8,0 C12.4,0 16,3.6 16,8 C16,14 8,22 8,22 C8,22 0,14 0,8 C0,3.6 3.6,0 8,0 Z"
              fill="currentColor"
              className="text-gold"
            />
            <circle cx="8" cy="8" r="3" fill="#fffdf8" />
          </g>
        </svg>
      </Reveal>

      {/* Venue Switcher Tabs */}
      <Reveal className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border border-gold/30 bg-ivory/90 p-1 shadow-sm">
          {venues.map((v) => {
            const isActive = activeTab === v.key
            return (
              <button
                key={v.key}
                type="button"
                onClick={() => setActiveTab(v.key as "wedding" | "reception")}
                className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 sm:py-2.5 sm:text-xs ${
                  isActive
                    ? "bg-gold text-ivory shadow-md"
                    : "text-ink/75 hover:text-ink hover:bg-gold/10"
                }`}
              >
                <span>{v.label}</span>
                <span className="ml-1.5 hidden opacity-80 sm:inline">({v.sublabel})</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Map Card */}
      <Reveal delay={0.1}>
        <div className="photo-frame overflow-hidden rounded-2xl bg-ivory/85 shadow-lg">
          <div className="relative">
            <iframe
              key={activeVenue.key}
              title={`Map to ${activeVenue.name}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 sm:h-96"
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(70,57,44,0.12)]" />
          </div>

          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left sm:p-8">
            <div>
              <div className="flex items-center justify-center gap-2 text-gold sm:justify-start">
                <Calendar className="h-3.5 w-3.5" />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em]">
                  {activeVenue.date}
                </span>
              </div>
              <h3 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">{activeVenue.name}</h3>
              <p className="mt-1.5 flex items-center justify-center gap-1.5 font-body text-sm font-light text-ink/75 sm:justify-start">
                <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{activeVenue.address}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button
                  asChild
                  className="rounded-full bg-gold px-6 py-5 font-body text-xs uppercase tracking-[0.2em] text-ivory shadow-md transition-all hover:bg-gold-dark hover:shadow-lg"
                >
                  <a href={activeVenue.mapUrl} target="_blank" rel="noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
