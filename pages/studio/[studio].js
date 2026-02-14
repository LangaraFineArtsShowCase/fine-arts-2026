import client from '../../apollo/client'
import {
  GET_ARTISTS_MAJOR,
  GET_ARTIST_LIST,
  GET_STUDIO_WORKS,
  GET_CUSTOM_ARTWORKS,
} from '../../apollo/queries/queries'
import { studioArray } from '../../config/data_config'
import styles from '../../styles/Studio.module.css'
import ArtworkContainer from '../../components/ArtworksContainer'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'

import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArtistArtworks from '@/components/ArtistArtworks'

const Studio = ({ artistList, customArtworks }) => {
  const [artist, setArtist] = useState({})
  const [studioName, setStudioName] = useState('')
  const [artistsNames, setArtistsNames] = useState({})

  const [studioWork, setStudioWork] = useState({})

  const [display, setDisplay] = useState(false)
  const [studioDetail, setStudioDetail] = useState({})
  const [studioFallbackImages, setStudioFallbackImages] = useState([])
  const [vh, setVh] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [headerStyle, setHeaderStyle] = useState('transparent')
  const [headerOrigin, setHeaderOrigin] = useState('studio')

  const router = useRouter()
  let { studio } = router.query

  const items = useMemo(
    () => [
      ...(studioWork?.data?.artworks2025?.nodes ?? []),
      ...(customArtworks
        ?.filter((data) => data?.artworkFields?.studio === studio)
        ?.map((data) => ({ ...data, custom: true })) ?? []),
    ],
    [studioWork, customArtworks, studio]
  )
  useEffect(() => {
    const handleScroll = () => {
      const height = window.innerHeight * 0.01
      const position = window.pageYOffset

      setVh(height)
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (scrollPosition >= 90 * vh) {
      setHeaderOrigin('about')
    } else {
      setHeaderOrigin('studio')
    }
  }, [scrollPosition])

  useEffect(() => {
    if (studio) {
      const foundStudio = studioArray.find(
        (studioObj) => studioObj.studioSlug == studio.toLowerCase()
      )

      if (foundStudio) {
        setDisplay(true)
        setStudioDetail(foundStudio)
        let alist = getArtistList()
        let a = getArtists()
        if (studio == 'media') {
          studio = 'media studio'
        }
        let s = getStudioWorks(studio)
        if (studio == 'indigenous carving & toolmaking') {
          studio = 'indigenous carving'
        }
        setStudioName(studio)
        a.then((result) => {
          setArtist(result)
        })

        alist.then((result) => {
          artistList = result
        })

        s.then((result) => {
          setStudioWork(result)
          const studioArtists = []
          result?.data.artworks2025.nodes.map((element) => {
            let add = true
            studioArtists.map((a) => {
              if (a.userId === element.author.node.userId) {
                add = false
              }
            })
            if (add) {
              let studioArtist = {
                userId: element.author?.node?.userId,
                name: element.author?.node?.artists2025?.nodes[0]?.artistFields
                  ?.artistName,
              }
              studioArtists.push(studioArtist)
            }
          })
          setArtistsNames(studioArtists)
        })
      }
    }
  }, [studio])

  return (
    <>
      {/* header */}
      {display && (
        <>
          {artistList.length > 0 && (
            <Header
              artistList={artistList}
              studioList={studioArray}
              originPage={headerOrigin}
              bgColor={headerStyle}
            />
          )}

          <div className={styles.heroSection}>
            <Image
              src={studioDetail.studioImage[1]}
              alt="cover image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className={styles.desc}>
              {studioDetail.studioDescription}
              <div className={styles.faculty}>
                Studio Faculty:{' '}
                {studioDetail.studioFaculty.map((item, index) => (
                  <span key={item}>
                    {item.startsWith('&') && <br />}
                    {item.startsWith('&')
                      ? item.substring(1, item.length)
                      : item}
                    {index !== studioDetail.studioFaculty.length - 1 && ', '}
                  </span>
                ))}
              </div>
              {studio == 'public art' && (
                <a href="https://thecanadaline.com/art-program/out-of-the-tunnel/">
                  Student Project: Langara 49th Station Project
                </a>
              )}
            </div>
            <div className={styles.title}>
              {display && <h1>{studioName}</h1>}
            </div>
          </div>

          {items.length > 0 && (
            <>
              {artistsNames.length > 0 ? (
                <div>
                  <ArtworkContainer
                    items={items}
                    artistsNames={artistsNames}
                    originPage="studio"
                    fallbackImages={{
                      images: [],
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    paddingLeft: '3vw',
                  }}
                >
                  <ArtistArtworks
                    items={items}
                    fallbackImages={{
                      images: [],
                    }}
                  />
                  <ArtistArtworks
                    items={[]}
                    fallbackImages={{
                      images: studioDetail.fallbackImages
                        ? [...studioDetail.fallbackImages]
                        : [],
                    }}
                  />
                </div>
              )}
            </>
          )}
          {studioDetail.fallbackImages && (
            <div
              style={{
                paddingLeft: '3vw',
              }}
            >
              <ArtistArtworks
                items={[]}
                fallbackImages={{
                  images: [...studioDetail.fallbackImages],
                }}
              />
            </div>
          )}
          {items.length == 0 && !studioDetail.fallbackImages && (
            <div className={styles.noArt}>No art work to show.</div>
          )}
        </>
      )}

      <Footer />
    </>
  )
}

export default Studio

async function getArtistList() {
  let aList

  try {
    let aList = await client.query({
      query: GET_ARTIST_LIST,
    })

    return aList
  } catch (err) {
    console.log(err)
  }
}

async function getArtists() {
  let a
  try {
    let a = await client.query({
      query: GET_ARTISTS_MAJOR,
    })

    return a
  } catch (err) {
    console.log(err)
  }
}

async function getStudioWorks(s) {
  let a
  try {
    a = await client.query({
      query: GET_STUDIO_WORKS,
      variables: {
        studio: s,
      },
    })
    return a
  } catch (err) {
    console.log(err)
  }
}

export async function getStaticProps(context) {
  try {
    const { data } = await client.query({
      query: GET_ARTIST_LIST,
    })

    const { data: custom } = await client.query({
      query: GET_CUSTOM_ARTWORKS,
    })

    return {
      props: {
        artistList: data?.artists2025?.nodes,
        customArtworks: custom?.customArtworks?.nodes?.filter(
          (data) => data?.customArtworkYear?.year === 2025
        ),
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  } catch (error) {
    console.log('error', error)

    return {
      props: {
        artistList: [],
        customArtworks: [],
      },
      revalidate: process.env.REVALIDATE_DATA === 'true' ? 30 : false,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: studioArray.map((studio) => {
      return {
        params: {
          studio: studio.studioName,
        },
      }
    }),
    fallback: process.env.REVALIDATE_DATA === 'true' ? 'blocking' : false,
  }
}
