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

  return (
    <section
      className={[
        'relative min-h-[90vh] overflow-hidden flex items-center',
        isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900',
      ].join(' ')}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-0 bg-[size:4rem_4rem]',
          isDark
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_0%,transparent_100%)]'
            : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_0%,transparent_100%)]',
        ].join(' ')}
      />

      {/* Gradient blobs */}
      {isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px]"
          />
        </>
      )}

      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        {/* Status badge */}
        {eyebrow && (
          <div
            className={[
              'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur',
              isDark
                ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300'
                : 'border-zinc-200 bg-white/80 text-zinc-600',
            ].join(' ')}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {eyebrow}
          </div>
        )}

        {/* Title with gradient */}
        {title && (
          <h1
            className={[
              'mt-10 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.95] text-balance',
            ].join(' ')}
          >
            {isDark ? (
              <>
                <span className="block text-white">{title.split('—')[0].trim()}</span>
                {title.includes('—') && (
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    {title.split('—').slice(1).join('—').trim()}
                  </span>
                )}
              </>
            ) : (
              <span className="block text-zinc-900">{title}</span>
            )}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            className={[
              'mt-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-pretty',
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
          'absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t to-transparent',
          isDark ? 'from-zinc-950' : 'from-white',
        ].join(' ')}
      />
    </section>
  )
}