import * as React from 'react'
import { Header, Search, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'

import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'
import ColorModeToggle from './ColorModeToggle'
import PageLink from './PageLink'
import { Box, chakra, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, IconButton, List, ListItem, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { HamburgerIcon } from '@chakra-ui/icons'

const ChakraHeader = chakra(Header);
const ChakraSearch = chakra(Search);

const homeLink: Variants = {
  inactive: {
    y: 2.5,
    transition: {
      delayChildren: 1,
      duration: 0.5,
      ease: 'circOut'
    }
  },
  hovered: {
    y: 0,
    transition: {
      duration: 1,
      ease: 'circIn'
    }
  },
}

const lineMotion: Variants = {
  inactive: {
    x: -100,
    transition: {
      duration: 1,
      ease: 'easeOut',
    }
  },
  hovered: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'circInOut'
    }
  }
}

const pageVariant: Variants = {
  inactive: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'backOut'
    }
  },
  hovered: {
    scale: 1.2,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  },
  tapped: {
    scale: 0.9,
    y: 2,
    transition: {
      duration: 0.2,
      ease: 'linear'
    }
  },
}

const staticVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 2,
    scale: 1
  },
  inactive: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  hovered: {
    opacity: 1,
    y: 0,
    scale: 0.5
  },
  tapped: {
    opacity: 1,
    y: 0,
    scale: 0.5
  },
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { mapPageUrl } = useNotionContext()
  const router = useRouter()
  const [isMobile] = useMediaQuery('(max-width: 700px)', {
    ssr: true,
    fallback: false,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

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
        bgGradient: 'linear(to-l, gray.700, blue.800)'
      }}
      boxShadow={'md'}
    >
      <Box
        as={motion.div}
        initial="inactive"
        whileHover="hovered"
        animate="inactive"
      >
        <PageLink
          href={'/'}
          pos="relative"
          fontWeight="bold"
          lineHeight="taller"
          overflowX="hidden"
          overflowY="visible"
          variants={homeLink}
        >
          Home
          <Box
            as={motion.div}
            pos='absolute'
            top='0'
            left='0'
            color='transparent'
            textDecor='underline wavy'
            textDecorationColor='blue.900'
            textUnderlineOffset='5px'
            variants={lineMotion}
            _dark={{
              textDecorationColor: 'white'
            }}
          >
            Home
          </Box>
        </PageLink>
      </Box>

      {isMobile ? 
        <HStack spacing={'5'}>
          <ColorModeToggle size={'lg'} />

          <IconButton 
            aria-label='Open Menu'
            icon={<HamburgerIcon />}
            variant='ghost'
            size={'lg'}
            ref={btnRef}
            onClick={onOpen}
          />

          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            size='lg'
            isFullHeight={true}
            placement='bottom'
            preserveScrollBarGap={true}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent
              bgGradient='linear(to-tl, green.50, cyan.50)'
              _dark={{
                bgGradient: 'linear(to-br, purple.900, blue.900)'
              }}
            >
              <DrawerCloseButton size={'lg'} />

              <DrawerBody
                mt='20'
                textAlign='center'
              >
                <List
                  fontSize='2xl'
                  spacing='10'
                >
              {navigationLinks
                ?.map((link, index) => {
                  if (!link.pageId && !link.url) {
                    return null
                  }

                  if (link.pageId) {
                    return (
                      <ListItem key={index}>
                        <PageLink
                          href={mapPageUrl(link.pageId)} 
                          onClick={onClose}
                          fontWeight='bold'
                          textDecor='underline wavy'
                          textDecorationColor='teal'
                          textUnderlineOffset='10px'
                          bgGradient='linear(to-l, green.100, teal.100)'
                          backgroundPosition='left'
                          backgroundSize='0 100%'
                          backgroundRepeat='no-repeat'
                          py='0.5'
                          px='2'
                          transition='0.4s 0.2s, text-decoration-color 0.2s ease-in-out, background-position 0s'
                          _hover={{
                            textDecorationColor: 'transparent',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'right',
                          }}
                          _dark={{
                            textDecorationColor: 'pink.300',
                            bgGradient: 'linear(to-r, cyan.800, blue.800)',
                            _hover: {
                              textDecorationColor: 'transparent',
                            }
                          }}
                        >
                          {link.title}
                        </PageLink>
                      </ListItem>
                    )
                  } else {
                    return (
                      <ListItem key={index}>
                        <PageLink
                          href={link.url} 
                          onClick={onClose}
                          fontWeight='bold'
                          textDecor='underline wavy'
                          textDecorationColor='teal'
                          textUnderlineOffset='10px'
                          bgGradient='linear(to-l, green.100, teal.100)'
                          backgroundPosition='left'
                          backgroundSize='0 100%'
                          backgroundRepeat='no-repeat'
                          py='0.5'
                          px='2'
                          transition='0.4s 0.2s, text-decoration-color 0.2s ease-in-out, background-position 0s'
                          _hover={{
                            textDecorationColor: 'transparent',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'right',
                          }}
                          _dark={{
                            textDecorationColor: 'pink.300',
                            bgGradient: 'linear(to-r, cyan.800, blue.800)',
                            _hover: {
                              textDecorationColor: 'transparent',
                            }
                          }}
                        >
                          {link.title}
                        </PageLink>
                      </ListItem>
                    )
                  }
                })
                .filter(Boolean)
              }
              </List>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
        : <HStack spacing={'5'}>
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
                  variants={pageVariant}
                  initial="inactive"
                  whileHover="hovered"
                  whileTap="tapped"
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
                      variants={staticVariant}
                      initial="hidden"
                      animate="inactive"
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
                  variants={pageVariant}
                  initial="inactive"
                  whileHover="hovered"
                  whileTap="tapped"
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
                      variants={staticVariant}
                      initial="hidden"
                      animate="inactive"
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
      }
    </HStack>
  )
}
