import * as React from "react"
import { useRouter } from "next/router"
import { Box, Button, Container } from "@chakra-ui/react"

import { Footer } from "components/Footer"
import { Loading } from "components/Loading"
import { PageHead } from "components/PageHead"
import * as config from "lib/config"
import { DownloadIcon } from "@chakra-ui/icons"

import styles from './resume.module.css'

const Resume = () => {
  const router = useRouter()

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
              aria-label="⚡"
              transition="all 0.25s ease-in"
              _hover={{
                transform: 'rotate(10deg)'
              }}
            >
              ⚡
            </Box>
          </Box>
          <h1 className="notion-title">Resume</h1>

          <Box
            mt='10'
            mb='20'
            w='100%'
          >
            <iframe
              src="/Rhys Kim - Resume.pdf#toolbar=0&navpanes=0&view=fitH" 
              width="100%" 
              height="100%"
              className={styles.resume}
            />
          </Box>
          
          <Button
            as='a'
            href='/Rhys Kim - Resume.pdf'
            target='_blank'
            leftIcon={<DownloadIcon />}
            colorScheme='teal'
            size='lg'
            alignSelf='center'
            mb='5'
          >
            Download PDF
          </Button>
        </Container>
      </Box>

      <Footer />
    </>
  )
}

export default Resume