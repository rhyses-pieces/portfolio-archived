import * as React from "react"
import Link from "next/link"
import { Link as ChakraLink } from "@chakra-ui/react"
import { motion } from "framer-motion"

const PageLink = ({ href, children, ...props}) => {
  return (
    <Link href={href} passHref scroll={false}>
      <ChakraLink
        as={motion.a}
        display={'inline-block'}
        _hover={{
          textDecor: 'none'
        }}
        initial={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: 0 }}
        whileTap={{ scale: 0.9, y: 2 }}
        {...props}
      >
        {children}
      </ChakraLink>
    </Link>
  )
}

export default PageLink