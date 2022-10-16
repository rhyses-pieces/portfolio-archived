import * as React from "react"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"

const ColorModeToggle = () => {
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
      as={motion.button}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      transition='all 0.5s ease-in-out'
    />
  )
}

export default ColorModeToggle