import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type CtaProps = {
  block: ExtractPageBuilderType<'callToAction'>
  index: number
  pageType: string
  pageId: string
}

export default function CTA({block}: CtaProps) {
  const {heading, eyebrow, body = [], button, image, theme, contentAlignment, variant} = block

  const isImageFirst = stegaClean(contentAlignment) === 'imageFirst'
  const variantName = stegaClean(variant) || 'default'
  const isFeatured = variantName === 'featured'
  const isCompact = variantName === 'compact'
  const isDark = theme?.name === 'theme-dark-violet' || isFeatured

  const hasImage = Boolean(image?.asset?._ref)

  // Palette
  const sectionBg = isDark ? 'bg-zinc-950' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-zinc-900'
  const mutedColor = isDark ? 'text-zinc-400' : 'text-zinc-600'
  const eyebrowColor = isDark ? 'text-violet-300' : 'text-zinc-500'
  const borderClass = isDark ? 'border-zinc-800/60' : 'border-zinc-200'
  const cardBg = isDark ? 'bg-zinc-900/40' : 'bg-white'

  // Button styles
  const buttonPrimary = isDark
    ? 'bg-white text-zinc-900 hover:bg-zinc-200'
    : 'bg-zinc-900 text-white hover:bg-zinc-700'
  const buttonSecondary = isDark
    ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white'
    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'

  return (
    <section className={`relative ${sectionBg} ${textColor}`}>
      <div
        className={[
          'mx-auto px-6',
          isFeatured
            ? 'max-w-7xl py-24 md:py-32'
            : isCompact
              ? 'max-w-6xl py-16 md:py-20'
              : 'max-w-6xl py-20 md:py-28',
        ].join(' ')}
      >
        <div
          className={[
            'grid items-center',
            isFeatured
              ? 'gap-8 md:gap-12 md:grid-cols-12'
              : isCompact
                ? 'gap-6 md:gap-8 md:grid-cols-2'
                : 'gap-8 md:gap-12 md:grid-cols-2',
          ].join(' ')}
        >
          {/* Text column */}
          <div className={isImageFirst ? 'md:order-2' : 'md:order-1'}>
            {eyebrow && (
              <div
                className={[
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur',
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600',
                ].join(' ')}
              >
                {eyebrow.includes('★') && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                )}
                {eyebrow}
              </div>
            )}
            {heading && (
              <h2
                className={[
                  'mt-6 font-semibold tracking-tighter text-balance',
                  isFeatured
                    ? 'text-4xl md:text-5xl lg:text-6xl leading-[1.05]'
                    : isCompact
                      ? 'text-2xl md:text-3xl leading-tight'
                      : 'text-3xl md:text-4xl lg:text-5xl leading-[1.1]',
                ].join(' ')}
              >
                {heading}
              </h2>
            )}
            {body && body.length > 0 && (
              <div
                className={[
                  'mt-5 leading-relaxed',
                  isFeatured
                    ? 'text-lg max-w-xl'
                    : isCompact
                      ? 'text-sm'
                      : 'text-base md:text-lg',
                  mutedColor,
                ].join(' ')}
              >
                <PortableText
                  value={body as PortableTextBlock[]}
                  className="dark:prose-invert"
                />
              </div>
            )}
            {button?.buttonText && button?.link && (
              <div className={isCompact ? 'mt-5' : 'mt-8'}>
                <ResolvedLink
                  link={button?.link}
                  className={[
                    'inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-200',
                    isFeatured ? buttonPrimary : buttonSecondary,
                    'border',
                    borderClass,
                    isFeatured
                      ? 'px-6 py-3 text-sm'
                      : isCompact
                        ? 'px-4 py-2 text-xs'
                        : 'px-5 py-2.5 text-sm',
                  ].join(' ')}
                >
                  {button?.buttonText}
                  <span aria-hidden="true">→</span>
                </ResolvedLink>
              </div>
            )}
          </div>

          {/* Image column */}
          {hasImage ? (
            <div
              className={[
                'relative overflow-hidden rounded-2xl border',
                borderClass,
                isFeatured
                  ? `md:col-span-7 aspect-[16/10] ${cardBg} shadow-2xl`
                  : isCompact
                    ? `aspect-[4/3] ${cardBg} shadow-md`
                    : `aspect-[16/10] ${cardBg} shadow-xl`,
                isImageFirst ? 'md:order-1' : 'md:order-2',
              ].join(' ')}
            >
              <div className="group h-full w-full">
                <SanityImage
                  id={image!.asset!._ref}
                  alt={heading || 'Project screenshot'}
                  width={1200}
                  height={800}
                  mode="cover"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Gradient overlay */}
                <div
                  aria-hidden="true"
                  className={[
                    'absolute inset-0 bg-gradient-to-t via-transparent to-transparent',
                    isDark ? 'from-zinc-950/30' : 'from-white/10',
                  ].join(' ')}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}