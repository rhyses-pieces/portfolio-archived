import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/bluu-next";
import "@fontsource/victor-mono";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  fonts: {
    heading: `'Bluu Next', Georgia, serif`,
    body: `'Victor Mono', sans-serif`
  },
  config
})

export default theme