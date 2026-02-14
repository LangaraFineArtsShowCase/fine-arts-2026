import { useEffect, useState } from 'react'
import client from '@/apollo/client'
import { GET_ARTIST_LIST } from '@/apollo/queries/queries'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import RightArrow from '@/components/svg/RightArrow'
import { studioArray } from '@/config/data_config'

const Home = ({ artistList, showComingSoon }) => {
  const [arrowColor, setArrowColor] = useState('#FFFFFF')

  return (
    <>
      <Head>
        <title>Langara snəw̓eyəɬ leləm̓ Fine Arts Grad Show 2025</title>
      </Head>
      <Header
        artistList={artistList}
        studioList={studioArray}
        originPage="home"
      />
      <main className={styles.main}>
        <div className={styles.title}>
          <div className={styles.splashTextImgWrapper}>
            <img
              src={'/images/home/Splash_Page_Text.png'}
              alt="Splash Page Text"
              aria-hidden="true"
              className={styles.splashTextImg}
            />
          </div>
          <h1 className={styles.visuallyHidden}>Fine Arts Grad Show 2025</h1>
        </div>
        {showComingSoon && (
          <span className={styles.coming_soon}>Coming Soon!</span>
        )}
      </main>

      {!showComingSoon && (
        <div className={styles.buttonWrapper}>
          <Link
            href="/artists"
            onMouseEnter={() => setArrowColor('#000000')}
            onMouseLeave={() => setArrowColor('#FFFFFF')}
          >
            Enter Exhibition <RightArrow fill={arrowColor} />
          </Link>
        </div>
      )}
      <div className={styles.langaraLogoWrapper}>
        <img
          aria-hidden="true"
          src="/images/home/Splash_Logo.png"
          id="langaraLogo"
        />
      </div>
    </>
  )
}

export default Home

export async function getStaticProps(context) {
  try {
    const { data } = await client.query({
      query: GET_ARTIST_LIST,
    })

    return {
      props: {
        artistList: data?.artists2025?.nodes,
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  } catch (error) {
    console.log('error', error)

    return {
      props: {
        artistList: [],
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  }
}
