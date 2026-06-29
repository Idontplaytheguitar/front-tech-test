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

  const sectionBg = isDark ? 'bg-zinc-950' : theme?.name === 'theme-gray' ? 'bg-zinc-50' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-zinc-900'
  const mutedColor = isDark ? 'text-zinc-400' : 'text-zinc-600'
  const borderClass = isDark ? 'border-zinc-800' : 'border-zinc-200'
  const cardBg = isDark ? 'bg-zinc-900/30' : 'bg-white'

  return (
    <section className={`relative ${sectionBg} ${textColor} border-t ${isDark ? 'border-zinc-900' : 'border-zinc-100'}`}>
      <div
        className={[
          'mx-auto px-6',
          isFeatured
            ? 'max-w-6xl py-20 md:py-28'
            : isCompact
              ? 'max-w-4xl py-16 md:py-20'
              : 'max-w-6xl py-16 md:py-24',
        ].join(' ')}
      >
        <div
          className={[
            'grid items-center',
            isFeatured
              ? 'gap-10 md:gap-16 md:grid-cols-12'
              : isCompact
                ? 'gap-6 md:gap-12 md:grid-cols-2'
                : 'gap-8 md:gap-12 md:grid-cols-2',
          ].join(' ')}
        >
          {/* Text column */}
          <div
            className={isImageFirst ? 'md:order-2' : 'md:order-1'}
            style={isFeatured ? {gridColumn: 'span 5 / span 5'} : undefined}
          >
            {eyebrow && (
              <div
                className={[
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-500',
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
                  'mt-5 font-semibold tracking-tight text-balance',
                  isFeatured
                    ? 'text-3xl md:text-4xl lg:text-5xl leading-[1.1]'
                    : isCompact
                      ? 'text-2xl md:text-3xl leading-tight'
                      : 'text-2xl md:text-3xl lg:text-4xl leading-[1.15]',
                ].join(' ')}
              >
                {heading}
              </h2>
            )}
            {body && body.length > 0 && (
              <div
                className={[
                  'mt-4 leading-relaxed max-w-md',
                  isFeatured ? 'text-base md:text-lg' : isCompact ? 'text-sm' : 'text-sm md:text-base',
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
              <div className="mt-8">
                <ResolvedLink
                  link={button?.link}
                  className={[
                    'group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-lg font-medium transition-all duration-300',
                    isDark
                      ? 'bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]',
                    isFeatured
                      ? 'px-6 py-3 text-sm'
                      : isCompact
                        ? 'px-4 py-2 text-xs'
                        : 'px-5 py-2.5 text-sm',
                  ].join(' ')}
                >
                  <span className="relative z-10">{button?.buttonText}</span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
                  >
                    →
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover/btn:translate-x-0',
                      isDark
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600',
                    ].join(' ')}
                    style={{zIndex: 0}}
                  />
                </ResolvedLink>
              </div>
            )}
          </div>

          {/* Image column */}
          {hasImage ? (
            <div
              className={[
                'group relative overflow-hidden rounded-xl border',
                borderClass,
                isFeatured
                  ? `aspect-[16/10] ${cardBg} shadow-[0_0_50px_rgba(0,0,0,0.3)]`
                  : isCompact
                    ? `aspect-[4/3] ${cardBg} shadow-md`
                    : `aspect-[16/10] ${cardBg} shadow-lg`,
                isImageFirst ? 'md:order-1' : 'md:order-2',
              ].join(' ')}
              style={isFeatured ? {gridColumn: 'span 7 / span 7'} : undefined}
            >
              {/* Hover border glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{zIndex: -1}}
              />
              <SanityImage
                id={image!.asset!._ref}
                alt={heading || 'Project screenshot'}
                width={1200}
                height={800}
                mode="cover"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}