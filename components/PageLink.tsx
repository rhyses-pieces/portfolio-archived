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
        {...props}
      >
        {children}
      </ChakraLink>
    </Link>
  )
}

export default PageLink