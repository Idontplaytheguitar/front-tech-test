import {ExtractPageBuilderType} from '@/sanity/lib/types'

type CenteredHeroSectionProps = {
  block: ExtractPageBuilderType<'centeredHero'>
  index: number
  pageId: string
  pageType: string
}

export default function CenteredHeroSection({block}: CenteredHeroSectionProps) {
  const {theme, eyebrow, title, description} = block
  const isDark = theme?.name === 'theme-dark-violet'

  // Split title on " — " to create a two-line layout with gradient on the second
  const parts = (title || '').split(' — ')
  const titleMain = parts[0]
  const titleAccent = parts.slice(1).join(' — ')

  return (
    <section
      className={[
        'relative min-h-[85vh] overflow-hidden flex items-center',
        isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900',
      ].join(' ')}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-0 bg-[size:3.5rem_3.5rem]',
          isDark
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_0%,transparent_100%)]'
            : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_0%,transparent_100%)]',
        ].join(' ')}
      />

      {/* Gradient blobs */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/15 rounded-full blur-[140px]"
        />
      )}

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-32 text-center">
        {/* Status badge */}
        {eyebrow && (
          <div
            className={[
              'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur',
              isDark
                ? 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
                : 'border-zinc-200 bg-zinc-50 text-zinc-500',
            ].join(' ')}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {eyebrow}
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 className="mt-10 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] text-balance">
            {isDark && titleAccent ? (
              <>
                <span className="block text-white">{titleMain}</span>
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </>
            ) : (
              <span className="block">{title}</span>
            )}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            className={[
              'mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto text-pretty',
              isDark ? 'text-zinc-400' : 'text-zinc-600',
            ].join(' ')}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className={[
          'absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t to-transparent',
          isDark ? 'from-zinc-950' : 'from-white',
        ].join(' ')}
      />
    </section>
  )
}