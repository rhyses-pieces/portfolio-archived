import * as React from 'react'
import { Block, ExtendedRecordMap } from 'notion-types'

import { PageSocial } from './PageSocial'

export const PageAside: React.FC<{
  block: Block
  recordMap: ExtendedRecordMap
  isBlogPost: boolean
}> = ({ block, isBlogPost }) => {
  if (!block) {
    return null
  }

  // only display comments and page actions on blog post pages
  if (isBlogPost) {
    return null;
  }

  return <PageSocial />
}
