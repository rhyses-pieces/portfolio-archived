import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: 'd747c3bf9aee495dbe1ddcc212b81aed',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Rhyses Pieces',
  domain: 'portfolio-leventii.vercel.app',
  author: 'Rhys Kim',

  // open graph metadata (optional)
  description: 'Portfolio for Rhys Kim',

  // social usernames (optional)
  // twitter: 'transitive_bs',
  github: 'rhyses-pieces',
  linkedin: 'irene-kim-1a8079115',
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,
  isSearchEnabled: false,
  isTweetEmbedSupportEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/about': '0fda07c00a51458d8dc81685d885735a',
    '/projects': '08598f44622243f7b9d26520b4f3c0de',
    '/resume': '8bf7d56317f2456f8916c91937d96597'
  },
  // pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      url: '/about'
    },
    {
      title: 'Contact',
      url: '/contact'
    },
    {
      title: 'Projects',
      url: '/projects'
    },
    {
      title: 'Resume',
      url: '/resume'
    }
  ]
})
