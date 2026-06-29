import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({value}) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <figure className="my-8">
            <Image
              id={value.asset._ref}
              alt={value.alt || ''}
              width={672}
              crop={value.crop}
              mode="cover"
              className="rounded-lg"
            />
          </figure>
        )
      },
    },
    block: {
      h1: ({children}) => <h1 className="group relative">{children}</h1>,
      h2: ({children}) => <h2 className="group relative">{children}</h2>,
    },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  // Override prose defaults: no extra margins, inherit font size from parent
  return (
    <div
      className={`[&_p]:m-0 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:leading-relaxed prose-a:text-brand dark:prose-invert ${className}`}
    >
      <PortableText components={components} value={value} />
    </div>
  )
}