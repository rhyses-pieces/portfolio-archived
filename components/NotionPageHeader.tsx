import * as React from 'react'
import { Header, Breadcrumbs, Search, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'

import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'
import ColorModeToggle from './ColorModeToggle'
import { chakra, HStack, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

const ChakraBreadcrumbs = chakra(Breadcrumbs);
const ChakraHeader = chakra(Header);
const ChakraSearch = chakra(Search);

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <ChakraHeader block={block} />
  }

  return (
    <HStack
      top="0"
      left="0"
      position="sticky"
      zIndex="sticky"
      justifyContent="space-between"
      px="5"
      py="2.5"
      background={'chakra-body-bg'}
    >
      <ChakraBreadcrumbs
        block={block}
        rootOnly={true}
        textColor={'chakra-body-text'}
      />

      <HStack spacing={'5'}>
        {navigationLinks
          ?.map((link, index) => {
            if (!link.pageId && !link.url) {
              return null
            }

            if (link.pageId) {
              return (
                <Link
                  href={mapPageUrl(link.pageId)}
                  key={index}
                  passHref
                >
                  <ChakraLink>
                    {link.title}
                  </ChakraLink>
                </Link>
              )
            } else {
              return (
                <Link
                  href={link.url}
                  key={index}
                >
                  <ChakraLink>
                    {link.title}
                  </ChakraLink>
                </Link>
              )
            }
          })
          .filter(Boolean)
        }

        <ColorModeToggle />

        {isSearchEnabled && <ChakraSearch block={block} title={null} />}
      </HStack>
    </HStack>
  )
}
