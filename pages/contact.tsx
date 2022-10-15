import * as React from "react"
import { useRouter } from "next/router"
import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Input, Text, Textarea, useToast } from "@chakra-ui/react"

import { Loading } from "components/Loading"
import { PageHead } from "components/PageHead"
import * as config from "lib/config"
import { Footer } from "components/Footer"

const Contact = () => {
  const router = useRouter()
  const toast = useToast()

  if (router.isFallback) {
    return <Loading />
  }

  const description = config.description
  const canonicalPageUrl = `${config.host}${router.asPath}`

  return (
    <>
      <PageHead
        title="Contact"
        description={description}
        url={canonicalPageUrl}
      />

      <Box className="notion-page-scroller" mt="5vh">
        <Container
          as="main"
          className="notion-page notion-page-no-cover notion-page-has-icon notion-page-has-text-icon"
        >
          <Box className="notion-page-icon-hero notion-page-icon-span">
            <Box
              as="span"
              className="notion-page-icon" 
              role="img" 
              aria-label="💌"
              transition="all 0.25s ease-in"
              _hover={{
                transform: 'rotate(10deg)'
              }}
            >
              💌
            </Box>
          </Box>
          <h1 className="notion-title">Contact</h1>

          <Text>You can contact me at lev.k.kim@gmail.com or fill out the contact form below to get in touch with me!</Text>

          <form>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>Your email will be used to correspond with you.</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea />
              <FormHelperText>Do you have feedback or an idea in mind? Feel free to write it here!</FormHelperText>
            </FormControl>
            {Error && (
              toast({
                description: 'error!',
                isClosable: true,
                status: 'error'
              })
            )}

            <Button>Submit</Button>
          </form>

        </Container>
      </Box>

      <Footer />
    </>
  )
}

export default Contact