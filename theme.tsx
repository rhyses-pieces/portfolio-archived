import { extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/bluu-next";
import "@fontsource/victor-mono";
import "@fontsource/work-sans";

const fonts = {
  heading: `"Bluu Next", Georgia, serif`,
  body: `"Work Sans", sans-serif`,
  mono: `"Victor Mono", sans-serif`
}

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
}

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('green.50', 'purple.900')(props),
        color: mode('blue.900', 'gray.50')(props),
      }
    })
  },
  fonts,
  config
})

export default theme