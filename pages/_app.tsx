// global styles shared across the entire site
import 'styles/global.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// global style overrides for notion
import 'styles/notion.css'

import * as React from 'react'
import * as Fathom from 'fathom-client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import theme from 'theme'

import { bootstrap } from 'lib/bootstrap-client'
import {
  isServer,
  fathomId,
  fathomConfig
} from 'lib/config'

import * as types from "notion-types"
import { Box, ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { NotionPageHeader } from 'components/NotionPageHeader'

if (!isServer) {
  bootstrap()
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: -25,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
      ease: 'circIn'
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      delay: 0.25,
      ease: 'circOut'
    }
  }
}

export default function App({ Component, pageProps }: AppProps, block: types.PageBlock | types.CollectionViewPageBlock) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <NotionPageHeader block={block} />
      <AnimatePresence 
        mode='wait'
        initial={false} 
        onExitComplete={() => { window.scrollTo({ top: 0 })}}
      >
        <Box
          as={motion.div}
          key={router.asPath}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Component {...pageProps} />
        </Box>
      </AnimatePresence>
    </ChakraProvider>
  )
}
