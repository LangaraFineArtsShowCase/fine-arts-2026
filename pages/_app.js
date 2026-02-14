import '@/styles/reset/normalize.css'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '@/apollo/client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Home from '.'

export default function App({ Component, pageProps }) {
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    console.log(
      process.env.NEXT_PUBLIC_ENABLE_COMING_SOON,
      process.env.NEXT_PUBLIC_ENABLE_COMING_SOON === 'true'
    )
    setShowComingSoon(process.env.NEXT_PUBLIC_ENABLE_COMING_SOON === 'true')
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Fine Arts 2025</title>
        <meta name="description" content="Fine Arts 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showComingSoon ? (
        <Home {...pageProps} showComingSoon={showComingSoon} />
      ) : (
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  )
}
