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

type Palette = {
  bg: string
  text: string
  muted: string
  eyebrow: string
  button: string
  buttonHover: string
  border: string
  ring: string
}

const PALETTES: Record<string, Palette> = {
  light: {
    bg: 'bg-white',
    text: 'text-neutral-900',
    muted: 'text-neutral-600',
    eyebrow: 'text-neutral-500',
    button: 'bg-neutral-900 text-white',
    buttonHover: 'hover:bg-neutral-700',
    border: '',
    ring: '',
  },
  gray: {
    bg: 'bg-neutral-50',
    text: 'text-neutral-900',
    muted: 'text-neutral-600',
    eyebrow: 'text-neutral-500',
    button: 'bg-neutral-900 text-white',
    buttonHover: 'hover:bg-neutral-700',
    border: '',
    ring: '',
  },
  dark: {
    bg: 'bg-neutral-950',
    text: 'text-white',
    muted: 'text-neutral-300',
    eyebrow: 'text-violet-300',
    button: 'bg-white text-neutral-900',
    buttonHover: 'hover:bg-violet-100',
    border: '',
    ring: 'ring-1 ring-white/10',
  },
}

function paletteFor(theme: string | undefined, variant: string | undefined): Palette {
  if (variant === 'featured') return PALETTES.dark
  if (theme === 'theme-dark-violet') return PALETTES.dark
  if (theme === 'theme-gray') return PALETTES.gray
  return PALETTES.light
}

export default function CTA({block}: CtaProps) {
  const {heading, eyebrow, body = [], button, image, theme, contentAlignment, variant} = block

  const isImageFirst = stegaClean(contentAlignment) === 'imageFirst'
  const variantName = stegaClean(variant) || 'default'
  const isFeatured = variantName === 'featured'
  const isCompact = variantName === 'compact'

  const p = paletteFor(theme?.name, variantName)
  const hasImage = Boolean(image?.asset?._ref)

  return (
    <section className={`${p.bg} ${p.text}`}>
      <div
        className={[
          'mx-auto px-6',
          isFeatured ? 'max-w-7xl py-28 md:py-40' : isCompact ? 'max-w-6xl py-16 md:py-20' : 'max-w-6xl py-24 md:py-32',
        ].join(' ')}
      >
        <div
          className={[
            'grid items-center',
            isFeatured ? 'gap-10 md:gap-16 md:grid-cols-12' : isCompact ? 'gap-6 md:gap-8 md:grid-cols-2' : 'gap-10 md:gap-16 md:grid-cols-2',
          ].join(' ')}
        >
          {/* Text column */}
          <div className={isImageFirst ? 'md:order-2' : 'md:order-1'}>
            {eyebrow && (
              <p
                className={[
                  'mb-4 text-xs font-medium uppercase tracking-[0.2em]',
                  p.eyebrow,
                ].join(' ')}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={[
                  'font-semibold tracking-tight text-balance',
                  isFeatured
                    ? 'text-4xl md:text-5xl lg:text-7xl leading-[1.05]'
                    : isCompact
                      ? 'text-2xl md:text-3xl leading-tight'
                      : 'text-3xl md:text-5xl leading-[1.1]',
                ].join(' ')}
              >
                {heading}
              </h2>
            )}
            {body && body.length > 0 && (
              <div
                className={[
                  'mt-6 leading-relaxed',
                  isFeatured ? 'text-lg md:text-xl max-w-xl' : isCompact ? 'text-sm' : 'text-base md:text-lg',
                  p.muted,
                ].join(' ')}
              >
                <PortableText
                  value={body as PortableTextBlock[]}
                  className="dark:prose-invert"
                />
              </div>
            )}
            {button?.buttonText && button?.link && (
              <div className={isCompact ? 'mt-5' : 'mt-10'}>
                <ResolvedLink
                  link={button?.link}
                  className={[
                    'inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-200',
                    p.button,
                    p.buttonHover,
                    isFeatured ? 'px-7 py-3.5 text-base' : isCompact ? 'px-5 py-2 text-sm' : 'px-6 py-3 text-sm',
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
                'relative overflow-hidden rounded-2xl',
                isFeatured
                  ? `md:col-span-7 aspect-[16/10] shadow-2xl ${p.ring}`
                  : isCompact
                    ? 'aspect-[4/3] shadow-md'
                    : 'aspect-[16/10] shadow-xl',
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
          ) : null}
        </div>
      </div>
    </section>
  )
}