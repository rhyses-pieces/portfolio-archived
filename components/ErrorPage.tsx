import { Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'
import { PageHead } from './PageHead'

import styles from './styles.module.css'

export const ErrorPage: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  const title = 'Error'

  return (
    <>
      <PageHead title={title} />

      <div className={styles.container}>
        <main className={styles.main}>
          <Heading as={'h1'}>Error Loading Page</Heading>

          {statusCode && <Text>Error code: {statusCode}</Text>}

          <Image src='/error.png' alt='Error' className={styles.errorImage} />
        </main>
      </div>
    </>
  )
}
