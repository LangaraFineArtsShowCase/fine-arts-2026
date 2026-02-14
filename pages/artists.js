import client from '../apollo/client'
import { GET_ARTISTS_MAJOR, GET_ARTIST_LIST } from '../apollo/queries/queries'
import { studioArray } from '../config/data_config'
import styles from '../styles/Artists.module.css'
import ArtworkContainer from '../components/ArtworksContainer'
import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

const Artists = ({ artistList, majorArtworks }) => {
  const [vw, setVw] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [headerStyle] = useState('transparent')
  const [headerOrigin, setHeaderOrigin] = useState('artists')

  useEffect(() => {
    // let alist = getArtistList()
    // let a = getArtists()
    // a.then((result) => {
    //   setMajorArtworks(result)
    //   console.log({ result })
    // })
    // // alist.then(result=>{
    // //     setArtistList(result)
    // //     console.log({result})
    // // })

    const handleScroll = (event) => {
      const width = window.innerWidth * 0.01
      const position = window.pageYOffset

      setVw(width)
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (scrollPosition >= 35 * vw) {
      setHeaderOrigin('about')
    } else {
      setHeaderOrigin('artists')
    }
  }, [scrollPosition])

  return (
    <div className={styles.headerWrapper}>
      {/* header */}
      <div
        className={styles.artistsHeader}
        style={{ backgroundColor: headerStyle }}
      >
        {artistList?.length > 0 && (
          <Header
            artistList={artistList}
            studioList={studioArray}
            originPage={headerOrigin}
            bgColor={headerStyle}
          />
        )}
      </div>

      <div className={styles.heroSection}>
        <Image
          src="/images/NewArtistsPage1.jpg"
          alt="cover image"
          layout="fill"
          style={{
            layout: 'fill',
            objectFit: 'cover',
            objectPosition: 'right',
          }}
        />
        <h1 className={styles.pageTitle} style={{ textTransform: 'uppercase' }}>
          Artists
        </h1>
      </div>

      <div>
        <ArtworkContainer items={majorArtworks} originPage="artists" />
      </div>
      <Footer />
    </div>
  )
}

export default Artists

export async function getStaticProps(context) {
  try {
    const { data: artistList } = await client.query({
      query: GET_ARTIST_LIST,
    })

    const { data: majorArtworks } = await client.query({
      query: GET_ARTISTS_MAJOR,
    })

    return {
      props: {
        artistList: artistList?.artists2025?.nodes,
        majorArtworks: majorArtworks?.artworks2025?.nodes,
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  } catch (error) {
    console.log('error', error)

    return {
      props: {
        artistList: [],
        majorArtworks: [],
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  }
}
