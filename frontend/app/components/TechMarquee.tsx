const TECH = [
  'Next.js',
  'TypeScript',
  'React',
  'Prisma',
  'PostgreSQL',
  'Three.js',
  'WebGL',
  'GLSL',
  'Tailwind CSS',
  'Sanity',
  'Vercel',
  'Node.js',
  'Framer Motion',
  'Zustand',
  'MongoDB',
  'NextAuth',
]

/**
 * Infinite-scrolling tech stack marquee. Renders the developer's core
 * stack as a visual element between the hero and the first project.
 */
export default function TechMarquee() {
  return (
    <section className="relative bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <div className="relative flex overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12">
          {[...TECH, ...TECH].map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex items-center gap-3 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <span className="text-sm font-medium tracking-wide whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}