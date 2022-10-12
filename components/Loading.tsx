import { Box, Spinner } from '@chakra-ui/react'
import * as React from 'react'

export const Loading: React.FC = () => (
  <Box
    minH="100vh"
    display="grid"
    placeContent="center"
  >
    <Spinner size={'lg'} />
  </Box>
)
