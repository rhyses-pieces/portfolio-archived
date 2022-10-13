import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
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
  fonts,
  config
})

export default theme