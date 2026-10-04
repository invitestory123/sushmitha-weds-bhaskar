import Petals from "@/components/Petals"
import MusicToggle from "@/components/MusicToggle"
import ScrollProgress from "@/components/ScrollProgress"
import Hero from "@/sections/Hero"
import Story from "@/sections/Story"
import Countdown from "@/sections/Countdown"
import Details from "@/sections/Details"
import Venue from "@/sections/Venue"
import Gallery from "@/sections/Gallery"
import Family from "@/sections/Family"
import CalendarSection from "@/sections/CalendarSection"
import FooterSection from "@/sections/FooterSection"
import config from "@/config"

export default function Home() {
  const textureCls = config.theme.texture === "paper" ? "paper-bg paper-grain" : ""

  return (
    <main className={`relative min-h-screen ${textureCls}`}>
      <ScrollProgress />
      <Petals />
      <MusicToggle />
      <Hero />
      {config.sections?.story !== false && <Story />}
      {config.sections?.countdown !== false && <Countdown />}
      {config.sections?.events !== false && <Details />}
      {config.sections?.venue !== false && <Venue />}
      {config.sections?.gallery !== false && <Gallery />}
      {config.sections?.family !== false && <Family />}
      <CalendarSection />
      <FooterSection />
    </main>
  )
}
