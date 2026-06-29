import {defineField, defineType} from 'sanity'
import {
  BlockElementIcon,
  ComposeSparklesIcon,
  ControlsIcon,
} from '@sanity/icons'

/**
 * Centered Hero schema object.
 *
 * Mirrors the existing `CenteredHero` React component found in
 * `frontend/app/components/CenteredHero`. It exposes the same editable
 * props (`eyebrow`, `title`, `description` and a `theme`) so non-technical
 * editors can compose hero sections from the Sanity page builder without
 * touching code.
 *
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

export const centeredHero = defineType({
  name: 'centeredHero',
  title: 'Centered Hero',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'contents',
      title: 'Contents',
      icon: ComposeSparklesIcon,
      default: true,
    },
    {
      name: 'designSystem',
      title: 'Design System',
      icon: ControlsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Optional small label rendered above the title.',
      group: 'contents',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main H1 heading of the hero section.',
      validation: (Rule) => Rule.required().max(120),
      group: 'contents',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Supporting copy below the title.',
      group: 'contents',
    }),
    defineField({
      name: 'theme',
      type: 'theme',
      title: 'Theme',
      description: 'Visual theme (background / text tokens) applied to this hero.',
      group: 'designSystem',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      themeName: 'theme.name',
    },
    prepare({title, subtitle, themeName}) {
      return {
        title: title || 'Untitled Centered Hero',
        subtitle: [subtitle, themeName].filter(Boolean).join(' — ') || 'Centered Hero',
      }
    },
  },
})