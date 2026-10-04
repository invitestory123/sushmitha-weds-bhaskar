import { useMemo } from "react"

/**
 * Tiny flower petals drifting slowly down the page.
 * Pure CSS animation (transform/opacity only) → 60 FPS.
 */
export default function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 8 + Math.random() * 10
        const colors = ["#e9c8b4", "#dcb8a4", "#d6b47c", "#e6d3bd"]
        return {
          id: i,
          left: Math.random() * 100,
          size,
          color: colors[i % colors.length],
          duration: 13 + Math.random() * 12,
          delay: -Math.random() * 24,
          drift: (Math.random() - 0.5) * 140,
          opacity: 0.35 + Math.random() * 0.4,
          round: Math.random() > 0.5,
        }
      }),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.82,
              background: `radial-gradient(circle at 30% 30%, #fff8, transparent 60%), ${p.color}`,
              borderRadius: p.round ? "60% 40% 60% 40%" : "50% 50% 60% 40%",
              "--petal-duration": `${p.duration}s`,
              "--petal-delay": `${p.delay}s`,
              "--petal-drift": `${p.drift}px`,
              "--petal-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
