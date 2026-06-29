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
  const isGray = block.theme?.name === 'theme-gray'

  const sectionBg = isDark ? 'bg-zinc-950' : isGray ? 'bg-zinc-50' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-zinc-900'
  const mutedColor = isDark ? 'text-zinc-400' : 'text-zinc-600'
  const borderClass = isDark ? 'border-zinc-900' : 'border-zinc-100'

  return (
    <section className={`relative ${sectionBg} ${textColor} border-t ${borderClass}`}>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
        {block.heading && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-balance leading-[1.2]">
            {block.heading}
          </h2>
        )}
        {block.subheading && (
          <p className={`mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto ${mutedColor}`}>
            {block.subheading}
          </p>
        )}
        {block?.content?.length ? (
          <div className={`mt-6 leading-relaxed text-sm md:text-base max-w-xl mx-auto ${mutedColor}`}>
            <PortableText className="" value={block.content as PortableTextBlock[]} />
          </div>
        ) : null}
      </div>
    </section>
  )
}