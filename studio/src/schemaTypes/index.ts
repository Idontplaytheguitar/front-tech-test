import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {centeredHero} from './objects/centeredHero'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {theme} from './objects/theme'
import {textCombination} from './objects/textCombination'
import {buttonPair} from './objects/buttonPair'
import quote from './documents/quote'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  quote,

  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  centeredHero,
  link,
  theme,
  textCombination,
  buttonPair,
]
