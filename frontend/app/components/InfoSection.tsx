import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'
import Grid from './Grid'
import ThemeWrapper from './ThemeWrapper'

type InfoProps = {
  block: InfoSection
  index: number
  pageId: string
  pageType: string
}

export default function InfoComponent({block}: InfoProps) {
  return (
    <ThemeWrapper theme={block.theme?.name || 'theme-white'}>
      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {block.heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-balance leading-tight">
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className="mt-4 text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              {block.subheading}
            </p>
          )}
          {block?.content?.length ? (
            <div className="mt-8 text-secondary leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
              <PortableText className="" value={block.content as PortableTextBlock[]} />
            </div>
          ) : null}
        </div>
      </div>
    </ThemeWrapper>
  )
}