import { Box, Spinner } from '@chakra-ui/react'
import * as React from 'react'

export const Loading: React.FC = () => (
  <Box
    minH="100vh"
    bgGradient="linear(to-tl, green.50, teal.100)"
    display="grid"
    placeContent="center"
    _dark={{
      bgGradient: "linear(to-br, purple.900, blue.900)"
    }}
  >
    <Spinner size={'xl'} />
  </Box>
)
