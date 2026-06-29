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
        'relative overflow-hidden',
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900',
      ].join(' ')}
    >
      {/* Background gradient */}
      {isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            }}
          />
        </>
      )}
      {!isDark && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
          }}
        />
      )}

      <div className="relative mx-auto max-w-5xl px-6 py-32 md:py-48 text-center">
        {eyebrow && (
          <p
            className={[
              'mb-8 text-xs font-medium uppercase tracking-[0.2em]',
              isDark ? 'text-violet-300' : 'text-neutral-500',
            ].join(' ')}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h1
            className={[
              'text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-balance',
              isDark ? 'text-white' : 'text-neutral-900',
            ].join(' ')}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={[
              'mt-10 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-pretty',
              isDark ? 'text-neutral-300' : 'text-neutral-600',
            ].join(' ')}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}