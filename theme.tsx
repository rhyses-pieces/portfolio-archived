import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, defineStyle, defineStyleConfig, extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/bluu-next";
import "@fontsource/victor-mono";
import "@fontsource/work-sans";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: 'mono'
  },
})

const baseStyle = definePartsStyle({
  field: {
    fontFamily: 'mono',
    fontWeight: 'bold',
  }
})

const fillStyle = {
  bg: 'white',
  borderColor: 'gray.200',
  _hover: {
    bg: 'gray.50'
  },
  _focusVisible: {
    bg: 'white'
  },
  _dark: {
    borderColor: 'whiteAlpha.400',
    bg: 'whiteAlpha.200',
    _hover: {
      bg: 'purple.800'
    },
    _focusVisible: {
      borderColor: 'white'
    }
  },
}

const fillInput = definePartsStyle(() => {
  return {
    field: fillStyle
  }
})

const inputTheme = defineMultiStyleConfig({
  baseStyle: baseStyle,
  variants: {
    filled: fillInput
  },
  defaultProps: {
    variant: 'filled'
  }
})

const Textarea = defineStyleConfig({
  baseStyle: {
    fontFamily: 'mono',
    fontWeight: 'bold',
  },
  variants: {
    filled: defineStyle(fillStyle)
  },
  defaultProps: {
    variant: 'filled'
  }
})

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
  components: {
    Button,
    Input: inputTheme,
    Textarea
  },
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