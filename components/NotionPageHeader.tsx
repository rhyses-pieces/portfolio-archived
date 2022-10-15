import * as React from 'react'
import { Header, Search, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'

import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'
import ColorModeToggle from './ColorModeToggle'
import PageLink from './PageLink'
import { Box, chakra, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const ChakraHeader = chakra(Header);
const ChakraSearch = chakra(Search);

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { mapPageUrl } = useNotionContext()
  const router = useRouter()

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
      bgGradient={'linear(to-r, teal.50, purple.50)'}
      _dark={{
        bgGradient: 'linear(to-l, blue.900, pink.900)'
      }}
      boxShadow={'md'}
    >
      <PageLink href={'/'}>
        Home
      </PageLink>

      <HStack spacing={'5'}>
        {navigationLinks
          ?.map((link, index) => {
            if (!link.pageId && !link.url) {
              return null
            }

            if (link.pageId) {
              return (
                <PageLink
                  href={mapPageUrl(link.pageId)}
                  key={index}
                  pos='relative'
                >
                  {link.title}
                  {router.asPath === mapPageUrl(link.pageId) && (
                    <Box
                      as={motion.div}
                      pos='absolute'
                      bottom='-1px'
                      left='0'
                      width='100%'
                      height='2px'
                      bg='blue.700'
                      _dark={{
                        bg: 'white'
                      }}
                      layoutId="navigate"
                      animate
                    />
                  )}
                </PageLink>
              )
            } else {
              return (
                <PageLink
                  href={link.url}
                  key={index}
                  pos='relative'
                >
                  {link.title}
                  {router.asPath === link.url && (
                    <Box
                      as={motion.div}
                      pos='absolute'
                      bottom='-1px'
                      left='0'
                      width='100%'
                      height='2px'
                      bg='blue.700'
                      _dark={{
                        bg: 'white'
                      }}
                      layoutId="navigate"
                      animate
                    />
                  )}
                </PageLink>
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
