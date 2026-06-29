import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
  pageId: string
  pageType: string
}

export default function InfoComponent({block}: InfoProps) {
  const isDark = block.theme?.name === 'theme-dark-violet'
  const sectionBg = isDark ? 'bg-zinc-950' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-zinc-900'
  const mutedColor = isDark ? 'text-zinc-400' : 'text-zinc-600'
  const borderClass = isDark ? 'border-zinc-900' : 'border-zinc-100'

  return (
    <section className={`relative ${sectionBg} ${textColor} border-t ${borderClass}`}>
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-balance leading-[1.1]">
            {block.heading}
          </h2>
        )}
        {block.subheading && (
          <p className={`mt-5 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${mutedColor}`}>
            {block.subheading}
          </p>
        )}
        {block?.content?.length ? (
          <div className={`mt-8 leading-relaxed text-base md:text-lg max-w-2xl mx-auto ${mutedColor}`}>
            <PortableText className="" value={block.content as PortableTextBlock[]} />
          </div>
        ) : null}

        {/* Accent line */}
        <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>
    </section>
  )
}