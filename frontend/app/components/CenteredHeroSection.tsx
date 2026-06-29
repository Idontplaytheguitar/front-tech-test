import CenteredHero from '@/app/components/CenteredHero'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

/**
 * Renders a `centeredHero` block coming from the Sanity `pageBuilder` field,
 * mapping the structured Sanity data onto the existing (unmodified) React
 * `CenteredHero` component from `app/components/CenteredHero`.
 *
 * This keeps a clean separation: the Studio owns the *shape* of the content,
 * while this thin adapter is the only place that knows how to turn that shape
 * into component props. See `BlockRenderer` for how blocks are dispatched.
 */
type CenteredHeroSectionProps = {
  block: ExtractPageBuilderType<'centeredHero'>
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

export default function CenteredHeroSection({block}: CenteredHeroSectionProps) {
  const {theme, eyebrow, title, description} = block

  return (
    <CenteredHero
      theme={theme?.name}
      eyebrow={eyebrow}
      title={title || ''}
      description={description}
    />
  )
}