import { useRef, useState } from "react"
import { Music, VolumeX } from "lucide-react"
import config from "@/config"

/**
 * Floating music toggle — rendered only when config.music.src is set.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  if (!config.music.src) return null

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
    } else {
      void el.play()
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src={config.music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : `Play ${config.music.label}`}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory/90 shadow-lg backdrop-blur transition hover:scale-105"
      >
        {playing ? (
          <Music className="h-4 w-4 text-gold" />
        ) : (
          <VolumeX className="h-4 w-4 text-gold/70" />
        )}
      </button>
    </>
  )
}
