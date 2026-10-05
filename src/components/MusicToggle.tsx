import { useEffect, useRef, useState } from "react"
import { Music, VolumeX } from "lucide-react"
import config from "@/config"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  )
  if (match) return match[1]
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim()
  return null
}

/**
 * Floating music toggle — supports YouTube background audio stream (with looping)
 * and direct HTML5 audio sources.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)

  const youtubeId = getYouTubeId(config.music.src)

  useEffect(() => {
    if (!youtubeId) return

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return
      try {
        playerRef.current = new window.YT.Player("yt-bgm-player", {
          height: "1",
          width: "1",
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: youtubeId, // loop=1 requires playlist with videoId on YouTube
            playsinline: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setPlaying(true)
              } else if (event.data === 2) {
                setPlaying(false)
              } else if (event.data === 0) {
                // Guarantee loop continuity
                event.target.seekTo(0)
                event.target.playVideo()
                setPlaying(true)
              }
            },
          },
        })
      } catch (err) {
        console.error("YouTube Player init error:", err)
      }
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      const existingScript = document.getElementById("yt-iframe-api")
      if (!existingScript) {
        const tag = document.createElement("script")
        tag.id = "yt-iframe-api"
        tag.src = "https://www.youtube.com/iframe_api"
        document.body.appendChild(tag)
      }
      const prevCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback()
        initPlayer()
      }
    }

    return () => {
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy()
        }
      } catch {
        // ignore
      }
    }
  }, [youtubeId])

  if (!config.music.src) return null

  const toggle = () => {
    if (youtubeId) {
      if (!playerRef.current || typeof playerRef.current.getPlayerState !== "function") return
      try {
        const state = playerRef.current.getPlayerState()
        if (state === 1) {
          playerRef.current.pauseVideo()
          setPlaying(false)
        } else {
          playerRef.current.playVideo()
          setPlaying(true)
        }
      } catch (e) {
        console.error("Error toggling YT video:", e)
      }
    } else {
      const el = audioRef.current
      if (!el) return
      if (playing) {
        el.pause()
        setPlaying(false)
      } else {
        void el.play()
        setPlaying(true)
      }
    }
  }

  return (
    <>
      {youtubeId ? (
        <div
          id="yt-bgm-container"
          aria-hidden="true"
          className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-1 w-1 opacity-0"
        >
          <div id="yt-bgm-player" />
        </div>
      ) : (
        <audio
          ref={audioRef}
          src={config.music.src}
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : `Play ${config.music.label}`}
        title={playing ? `Pause: ${config.music.label}` : `Play: ${config.music.label}`}
        className="group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-ivory/95 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {playing ? (
          <span className="relative flex items-center justify-center">
            <span className="absolute h-9 w-9 animate-ping rounded-full bg-gold/25" />
            <Music className="h-5 w-5 text-gold drop-shadow-sm" />
          </span>
        ) : (
          <VolumeX className="h-5 w-5 text-gold/70 transition-colors group-hover:text-gold" />
        )}
      </button>
    </>
  )
}
