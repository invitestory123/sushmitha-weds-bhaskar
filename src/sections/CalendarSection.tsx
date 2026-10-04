import { CalendarDays, Apple, CalendarCheck } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import Magnetic from "@/components/Magnetic"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

/** YYYYMMDDTHHMMSSZ in UTC */
function toStamp(d: Date) {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  )
}

/**
 * SECTION 9 · Add to Calendar — Google, Apple (.ics), Outlook.
 */
export default function CalendarSection() {
  const start = new Date(config.weddingDate)
  const end = new Date(start.getTime() + config.calendar.durationHours * 3_600_000)
  const dates = `${toStamp(start)}/${toStamp(end)}`
  const text = encodeURIComponent(config.calendar.title)
  const details = encodeURIComponent(config.calendar.description)
  const location = encodeURIComponent(`${config.venue.name}, ${config.venue.address}`)

  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}` +
    `&dates=${dates}&details=${details}&location=${location}`
  const outlookUrl =
    `https://outlook.live.com/calendar/0/deeplink/compose?subject=${text}` +
    `&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${details}&location=${location}`

  const downloadIcs = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invite`,
      `DTSTAMP:${toStamp(new Date())}`,
      `DTSTART:${toStamp(start)}`,
      `DTEND:${toStamp(end)}`,
      `SUMMARY:${config.calendar.title}`,
      `DESCRIPTION:${config.calendar.description}`,
      `LOCATION:${config.venue.name}\\, ${config.venue.address}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }))
    const a = document.createElement("a")
    a.href = url
    a.download = "wedding-invitation.ics"
    a.click()
    URL.revokeObjectURL(url)
  }

  const buttons = [
    { label: "Google Calendar", icon: CalendarDays, href: googleUrl },
    { label: "Apple Calendar", icon: Apple, onClick: downloadIcs },
    { label: "Outlook", icon: CalendarCheck, href: outlookUrl },
  ]

  return (
    <section className="mx-auto max-w-xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Save the moment" title="Add to calendar" />

      <Reveal className="flex flex-col gap-3">
        {buttons.map((b) => {
          const inner = (
            <>
              <b.icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="font-body text-xs uppercase tracking-[0.24em] text-ink/85">
                {b.label}
              </span>
            </>
          )
          const cls =
            "flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-ivory/85 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
          return (
            <Magnetic key={b.label} strength={0.18}>
              {b.href ? (
                <a href={b.href} target="_blank" rel="noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={b.onClick} className={cls}>
                  {inner}
                </button>
              )}
            </Magnetic>
          )
        })}
      </Reveal>
    </section>
  )
}
