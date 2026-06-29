import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import ThemeWrapper from './ThemeWrapper'

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

  const hasImage = Boolean(image?.asset?._ref)

  return (
    <ThemeWrapper theme={theme?.name || 'theme-white'}>
      <div
        className={[
          'relative',
          isFeatured ? 'py-24 md:py-32' : isCompact ? 'py-12 md:py-16' : 'py-20 md:py-28',
        ].join(' ')}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={[
              'grid gap-8 md:gap-12 items-center',
              isFeatured ? 'md:grid-cols-12' : 'md:grid-cols-2',
              isCompact ? 'gap-6' : '',
            ].join(' ')}
          >
            {/* Text column */}
            <div
              className={[
                isFeatured ? 'md:col-span-5' : '',
                isImageFirst ? 'md:order-2' : 'md:order-1',
              ].join(' ')}
            >
              {eyebrow && (
                <p
                  className={[
                    'mb-3 text-xs font-medium uppercase tracking-widest',
                    isFeatured ? 'text-violet-300' : 'text-secondary',
                  ].join(' ')}
                >
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2
                  className={[
                    'font-semibold text-primary text-balance',
                    isFeatured
                      ? 'text-4xl md:text-5xl lg:text-6xl leading-tight'
                      : isCompact
                        ? 'text-2xl md:text-3xl'
                        : 'text-3xl md:text-4xl lg:text-5xl leading-tight',
                  ].join(' ')}
                >
                  {heading}
                </h2>
              )}
              {body && body.length > 0 && (
                <div
                  className={[
                    'mt-5 text-secondary leading-relaxed',
                    isFeatured ? 'text-lg md:text-xl max-w-xl' : 'text-base md:text-lg',
                    isCompact ? 'mt-3 text-sm' : '',
                  ].join(' ')}
                >
                  <PortableText
                    value={body as PortableTextBlock[]}
                    className="dark:prose-invert"
                  />
                </div>
              )}
              {button?.buttonText && button?.link && (
                <div className={isCompact ? 'mt-4' : 'mt-8'}>
                  <ResolvedLink
                    link={button?.link}
                    className={[
                      'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
                      isFeatured
                        ? 'bg-white text-black hover:bg-violet-100 px-7 py-3.5 text-base'
                        : isCompact
                          ? 'bg-foreground text-background hover:opacity-80 px-5 py-2 text-sm'
                          : 'bg-foreground text-background hover:opacity-80 px-6 py-3 text-sm',
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
                  'relative overflow-hidden rounded-xl',
                  isFeatured
                    ? 'md:col-span-7 aspect-[16/10] shadow-2xl ring-1 ring-white/10'
                    : isCompact
                      ? 'aspect-[4/3] shadow-md'
                      : 'aspect-[16/10] shadow-lg',
                  isImageFirst ? 'md:order-1' : 'md:order-2',
                ].join(' ')}
              >
                <SanityImage
                  id={image!.asset!._ref}
                  alt={heading || 'Project screenshot'}
                  width={1200}
                  height={800}
                  mode="cover"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  )
}