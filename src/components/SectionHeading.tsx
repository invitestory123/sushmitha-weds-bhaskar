import Reveal from "./Reveal"

/**
 * Consistent section header: gold eyebrow, script flourish, hairlines.
 */
export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <Reveal className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
      <span className="eyebrow">{eyebrow}</span>
      <div className="flex items-center gap-4">
        <span className="gold-hairline w-10 sm:w-16" />
        <h2 className="font-script text-4xl text-ink sm:text-5xl">{title}</h2>
        <span className="gold-hairline w-10 sm:w-16" />
      </div>
    </Reveal>
  )
}
