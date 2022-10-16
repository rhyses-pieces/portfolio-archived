import * as React from "react"
import { useRouter } from "next/router"
import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, Textarea, useToast, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { Footer } from "components/Footer"
import { Loading } from "components/Loading"
import { PageHead } from "components/PageHead"
import * as config from "lib/config"

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })
  const router = useRouter()
  const toast = useToast()

  if (router.isFallback) {
    return <Loading />
  }

  const description = config.description
  const canonicalPageUrl = `${config.host}${router.asPath}`

  const onSubmit = async (data: any) => {
    const res = await fetch(`${config.host}/api/submit-form`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (res.status === 201) {
      toast({
        description: 'Successfully sent message!',
        status: 'success'
      })
    }
  }

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

          <Box margin='2em auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={'5'}>
                <FormControl
                  isInvalid={!!errors?.name}
                  isRequired
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input 
                    id="name"
                    type="text"
                    {...register('name', { 
                      required: 'Name is required.',
                      maxLength: {
                        value: 80,
                        message: 'Your name is way too long!'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>
                  
                <FormControl 
                  isInvalid={!!errors?.email}
                  isRequired
                >
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email format!'
                      }
                    })}
                  />
                  <FormHelperText>Your email will be used to correspond with you.</FormHelperText>
                  <FormErrorMessage>
                    {errors?.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.message}
                  isRequired
                >
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    id="message"
                    {...register('message', {
                      required: 'You can’t send an empty message.',
                      minLength: { 
                        value: 5,
                        message: 'Brevity is cool, but let’s get some more details!'
                      }
                    })}
                  />
                  <FormHelperText>Do you have feedback or an idea in mind? Feel free to write it here!</FormHelperText>
                  <FormErrorMessage>{errors?.message?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  colorScheme='teal'
                  size='lg'
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>

        </Container>
      </Box>

      <Footer />
    </>
  )
}

export default Contact