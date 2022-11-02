import * as React from "react"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const ColorModeToggle = ({...props}) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Theme mode toggle"
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="unstyled"
      color="teal"
      _hover={{ bg: 'blackAlpha.100' }}
      _dark={{
        color: 'purple.200',
        _hover: {
          bg: 'whiteAlpha.200'
        }
      }}
      {...props}
    />
  )
}

export default ColorModeToggle