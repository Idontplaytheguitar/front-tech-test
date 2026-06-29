import {ExtractPageBuilderType} from '@/sanity/lib/types'

/**
 * Renders a `centeredHero` block coming from the Sanity `pageBuilder` field.
 * Maps the structured Sanity data onto a clean, modern hero layout. All visual
 * choices (eyebrow text, title, description, theme) are editable in Sanity
 * Studio; this component is only the rendering layer.
 */
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
      data-theme={theme?.name}
      className={[
        'relative overflow-hidden',
        isDark ? 'bg-violet-950 text-white' : 'bg-white text-neutral-900',
      ].join(' ')}
    >
      {/* Subtle background element */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
          }}
        />
      )}

      <div className="relative mx-auto max-w-4xl px-6 py-28 md:py-40 text-center">
        {eyebrow && (
          <p
            className={[
              'mb-6 text-xs font-medium uppercase tracking-[0.2em]',
              isDark ? 'text-violet-300' : 'text-neutral-500',
            ].join(' ')}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h1
            className={[
              'text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-balance',
              isDark ? 'text-white' : 'text-neutral-900',
            ].join(' ')}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={[
              'mt-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-pretty',
              isDark ? 'text-violet-100' : 'text-neutral-600',
            ].join(' ')}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}