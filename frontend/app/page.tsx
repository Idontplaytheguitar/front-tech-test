import type {Metadata} from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'

const HOME_SLUG = 'home'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: HOME_SLUG},
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: HOME_SLUG},
  })

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="">
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
