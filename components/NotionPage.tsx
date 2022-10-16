import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSearchParam } from 'react-use'
import { PageBlock } from 'notion-types'

// core notion renderer
import { NotionRenderer } from 'react-notion-x'

// utils
import { getBlockTitle, getPageProperty, formatDate } from 'notion-utils'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapImageUrl } from 'lib/map-image-url'
import { searchNotion } from 'lib/search-notion'
import * as types from 'lib/types'
import * as config from 'lib/config'

// components
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
import { PageAside } from './PageAside'
import { Footer } from './Footer'
import { chakra, useColorModeValue } from '@chakra-ui/react'

// dynamic imports for optional components

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
)

const propertyLastEditedTimeValue = (
  { block, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: 'long'
    })}`
  }

  return defaultFn()
}

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `Published ${formatDate(publishDate, {
        month: 'long'
      })}`
    }
  }

  return defaultFn()
}

const propertyTextValue = (
  { schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }

  return defaultFn()
}

// chakra stuff
const ChakraNotion = chakra(NotionRenderer)

const ChakraPdf = chakra(Pdf, {
  baseStyle: {
    marginTop: '90vh',
    display: 'grid',
    justifyContent: 'space-evenly'
  }
})

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()
  const lite = useSearchParam('lite')

  const darkMode = useColorModeValue(false, true)

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Pdf: ChakraPdf,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  // const isRootPage =
  //   parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)
  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection'

  const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const pageAside = React.useMemo(
    () => (
      <PageAside block={block} recordMap={recordMap} isBlogPost={isBlogPost} />
    ),
    [block, recordMap, isBlogPost]
  )

  const footer = React.useMemo(() => <Footer />, [])

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  console.log('notion page', {
    isDev: config.isDev,
    title,
    pageId,
    rootNotionPageId: site.rootNotionPageId,
    recordMap
  })

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  return (
    <>
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />

      <ChakraNotion
        darkMode={darkMode}
        components={components}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        rootDomain={site.domain}
        fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        searchNotion={config.isSearchEnabled ? searchNotion : null}
        pageAside={pageAside}
        footer={footer}
        lineHeight={'taller'}
        sx={{
          '--bg-color': 'colors.green.50',
          '--bg-color-0': 'colors.green.100',
          '--fg-color': 'colors.blue.900',
          '--chakra-colors-chakra-border-color': 'colors.blackAlpha.300',
          '.notion-page-scroller': {
            marginTop: '5vh'
          },
          '.notion-header': {
            display: 'none',
          },
          '.notion-page-icon-hero .notion-page-icon': {
            transition: 'all 0.25s ease-in',
            _hover: {
              transform: 'rotate(10deg)'
            }
          },
          '.notion-collection-card': {
            transition: 'all 0.3s ease-in',
            _hover: {
              bg: 'transparent'
            }
          },
          '.notion-collection-card-cover': {
            borderBottom: 'none',
            boxShadow: 'md',
            borderRadius: 'lg',
            transition: 'filter 0.5s ease-in-out',
            filter: 'none',
          },
          '.notion-collection-card .notion-property-title': {
            display: 'grid',
            justifyContent: 'center',
          },
          '.notion-collection-card .notion-page-title-text': {
            bgGradient: 'linear(to-l, green.100, teal.100)',
            backgroundPosition: 'left',
            backgroundSize: '0 100%',
            backgroundRepeat: 'no-repeat',
            py: '0.5',
            px: '2',
            transition: '.4s, background-position 0s'
          },
          '.notion-collection-card:hover .notion-collection-card-cover': {
            filter: 'contrast(0.8)'
          },
          '.notion-collection-card:hover .notion-page-title-text': {
            backgroundSize: '100% 100%',
            backgroundPosition: 'right',
          },
          '.notion-bookmark': {
            transition: 'all 0.2s ease-in',
            _hover: {
              bg: 'green.100'
            }
          },
          '.notion-link': {
            display: 'inline-block',
            color: 'teal.600',
            borderBottom: 'none',
            textDecor: 'underline wavy',
            textDecorationColor: 'inherit',
            textDecorationSkip: 'none',
            textUnderlineOffset: '5px',
            opacity: 1,
            transition: 'color 0.5s ease, text-decoration-color 0.3s ease-in-out',
            _hover: {
              color: 'black',
              textDecorationColor: 'transparent',
              transform: 'rotate(2deg)',
            },
            _focusVisible: {
              boxShadow: 'var(--chakra-shadows-outline)',
              textDecor: 'underline solid',
              transform: 'rotate(0deg)'
            }
          },
          '_dark': {
            '--bg-color': 'colors.purple.900',
            '--bg-color-0': 'colors.purple.800',
            '--fg-color': 'colors.gray.50',
            '.notion-link': {
              color: 'pink.300',
              _hover: {
                color: 'white'
              }
            },
            '.notion-bookmark': {
              _hover: {
                bg: 'purple.800'
              }
            },
            '.notion-collection-card .notion-page-title-text': {
              bgGradient: 'linear(to-r, cyan.800, pink.800)'
            },
            '.notion-collection-card:hover .notion-collection-card-cover': {
              filter: 'contrast(0.6)'
            },
            '--chakra-colors-chakra-border-color': 'colors.whiteAlpha.300',
          },
        }}
      />
    </>
  )
}
