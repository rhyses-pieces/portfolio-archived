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
import { ChakraProvider } from '@chakra-ui/react'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
