import '@/styles/reset/normalize.css'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '@/apollo/client'
import Head from 'next/head'
import Script from 'next/script'
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
        <title>Fine Arts 2026</title>
        <meta name="description" content="Fine Arts 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BC4P7KDJQD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BC4P7KDJQD');
        `}
      </Script>
      
      {showComingSoon ? (
        <Home {...pageProps} showComingSoon={showComingSoon} />
      ) : (
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  )
}
