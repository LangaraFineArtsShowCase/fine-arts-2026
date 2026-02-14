import client from '../../apollo/client'
import { GET_ARTIST_LIST, GET_ARTIST } from '../../apollo/queries/queries'
import { studioArray, awardWinners } from '../../config/data_config'
import styles from '../../styles/Artist.module.css'
import ArtistArtworks from '@/components/ArtistArtworks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import LeftLeaf from '@/components/svg/LeftLeaf'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import unescape from 'lodash/unescape'

const Artist = ({ artistList }) => {
  const [currentArtist, setCurrentArtist] = useState({})
  const [artistDetail, setArtistDetail] = useState({})

  const [artistWork, setArtistWork] = useState({})
  const [artField, setArtField] = useState({})

  const [display, setDisplay] = useState(false)
  const [displayAwardWinner, setAwardWinner] = useState(false)
  const [awardIndex, setAwardIndex] = useState('')

  const router = useRouter()
  const { artistId } = router.query

  useEffect(() => {
    if (artistId) {
      const alist = getArtistList()
      alist.then((result) => {
        result.data.artists2025.nodes.map((a, i) => {
          if (a.author.node.userId == artistId) {
            setDisplay(true)
            setCurrentArtist(a)
          }
        })
      })
    }
  }, [artistId])

  useEffect(() => {
    // console.log("changed");
    setAwardWinner(false)

    if (currentArtist) {
      const currentArtistId = currentArtist.author?.node?.userId

      const detail = getArtistWork(currentArtistId)
      detail.then((result) => {
        if (result.data.artists2025.nodes.length == 1) {
          const nodes = result.data?.artists2025?.nodes[0]
          const artistInfo = nodes?.artistFields
          const artworkArray = nodes?.author?.node?.artworks2025?.nodes
          if (artistInfo) {
            setArtistDetail(artistInfo)
          }
          if (artworkArray) {
            setArtistWork(artworkArray)
          }
        }
      })

      awardWinners.map((a, i) => {
        if (a.winnerArtistID == currentArtistId) {
          setAwardWinner(true)
          setAwardIndex(i)
        }
      })
    }
  }, [currentArtist])

  useEffect(() => {
    const artF = []
    console.log(artistWork)
    if (artistWork.length > 0) {
      artistWork.map((art, index) => {
        if (!artF.includes(art.artworkFields.studio)) {
          artF.push(art.artworkFields.studio)
        }
      })
      artF.map((item, index) => {
        if (item) {
          const words = item.split(' ')
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
          }
          artF[index] = words.join(' ')
        }
      })

      setArtField(artF.filter((art) => !!art))
    }
  }, [artistWork])

  return (
    <div className={styles.artistPage}>
      {artistList.length > 0 && (
        <Header
          artistList={artistList}
          studioList={studioArray}
          originPage="about"
        />
      )}

      {display && (
        <div className={styles.artistContainer}>
          <div className={styles.heroSection}>
            <div className={styles.artistNameHolder}>
              <h1 className={styles.artistName}>
                {unescape(artistDetail.artistName)}
              </h1>

              {displayAwardWinner ? (
                <div className={styles.award}>
                  <div className={styles.leftLeafHolder}>
                    <div className={styles.leftLeaf}>
                      <LeftLeaf />
                    </div>
                  </div>
                  <div className={styles.awardName}>
                    {unescape(awardWinners[awardIndex].awardName)}
                  </div>
                  <div className={styles.rightLeaf}>
                    <LeftLeaf />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.artStudio}>
              {artField.length > 0 &&
                artField.map((art, index) => (
                  <span key={index}>
                    {unescape(art)}
                    {index !== artField.length - 1 && ', '}
                  </span>
                ))}
            </div>

            <div className={styles.artistDesc}>
              {unescape(artistDetail.blurb)}
            </div>
            <div className={styles.websites}>
              {artistDetail.instagram && (
                <Link
                  href={artistDetail.instagram}
                  target="_blank"
                  className={styles.igHolder}
                >
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 7C9.20435 7 8.44129 7.31607 7.87868 7.87868C7.31607 8.44129 7 9.20435 7 10C7 10.7956 7.31607 11.5587 7.87868 12.1213C8.44129 12.6839 9.20435 13 10 13C10.7956 13 11.5587 12.6839 12.1213 12.1213C12.6839 11.5587 13 10.7956 13 10C13 9.20435 12.6839 8.44129 12.1213 7.87868C11.5587 7.31607 10.7956 7 10 7ZM10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5ZM16.5 4.75C16.5 5.08152 16.3683 5.39946 16.1339 5.63388C15.8995 5.8683 15.5815 6 15.25 6C14.9185 6 14.6005 5.8683 14.3661 5.63388C14.1317 5.39946 14 5.08152 14 4.75C14 4.41848 14.1317 4.10054 14.3661 3.86612C14.6005 3.6317 14.9185 3.5 15.25 3.5C15.5815 3.5 15.8995 3.6317 16.1339 3.86612C16.3683 4.10054 16.5 4.41848 16.5 4.75ZM10 2C7.526 2 7.122 2.007 5.971 2.058C5.187 2.095 4.661 2.2 4.173 2.39C3.739 2.558 3.426 2.759 3.093 3.093C2.78001 3.3954 2.53935 3.76458 2.389 4.173C2.199 4.663 2.094 5.188 2.058 5.971C2.006 7.075 2 7.461 2 10C2 12.474 2.007 12.878 2.058 14.029C2.095 14.812 2.2 15.339 2.389 15.826C2.559 16.261 2.759 16.574 3.091 16.906C3.428 17.242 3.741 17.443 4.171 17.609C4.665 17.8 5.191 17.906 5.971 17.942C7.075 17.994 7.461 18 10 18C12.474 18 12.878 17.993 14.029 17.942C14.811 17.905 15.338 17.8 15.826 17.611C16.259 17.442 16.574 17.241 16.906 16.909C17.243 16.572 17.444 16.259 17.61 15.829C17.8 15.336 17.906 14.809 17.942 14.029C17.994 12.925 18 12.539 18 10C18 7.526 17.993 7.122 17.942 5.971C17.905 5.189 17.8 4.661 17.61 4.173C17.4593 3.765 17.2191 3.39596 16.907 3.093C16.6047 2.77985 16.2355 2.53917 15.827 2.389C15.337 2.199 14.811 2.094 14.029 2.058C12.925 2.006 12.539 2 10 2ZM10 0C12.717 0 13.056 0.00999994 14.122 0.0599999C15.187 0.11 15.912 0.277 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8305 2.1779 19.224 2.78259 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.987 6.944 20 7.283 20 10C20 12.717 19.99 13.056 19.94 14.122C19.89 15.187 19.722 15.912 19.475 16.55C19.2247 17.2178 18.8311 17.8226 18.322 18.322C17.822 18.8303 17.2173 19.2238 16.55 19.475C15.913 19.722 15.187 19.89 14.122 19.94C13.056 19.987 12.717 20 10 20C7.283 20 6.944 19.99 5.878 19.94C4.813 19.89 4.088 19.722 3.45 19.475C2.78233 19.2245 2.17753 18.8309 1.678 18.322C1.16941 17.8222 0.775931 17.2175 0.525 16.55C0.277 15.913 0.11 15.187 0.0599999 14.122C0.0129999 13.056 0 12.717 0 10C0 7.283 0.00999994 6.944 0.0599999 5.878C0.11 4.812 0.277 4.088 0.525 3.45C0.775236 2.78218 1.1688 2.17732 1.678 1.678C2.17767 1.16923 2.78243 0.775729 3.45 0.525C4.088 0.277 4.812 0.11 5.878 0.0599999C6.944 0.0129999 7.283 0 10 0Z"
                      fill="#181818"
                    />
                  </svg>
                </Link>
              )}

              {artistDetail.personalWebsite && (
                <Link
                  href={artistDetail.personalWebsite}
                  className={styles.webHolder}
                  target="_blank"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM7.71 17.667C6.72341 15.5743 6.15187 13.3102 6.027 11H2.062C2.25659 12.5389 2.89392 13.9882 3.89657 15.1717C4.89922 16.3552 6.22401 17.2221 7.71 17.667ZM8.03 11C8.181 13.439 8.878 15.73 10 17.752C11.1523 15.6766 11.8254 13.3695 11.97 11H8.03ZM17.938 11H13.973C13.8481 13.3102 13.2766 15.5743 12.29 17.667C13.776 17.2221 15.1008 16.3552 16.1034 15.1717C17.1061 13.9882 17.7434 12.5389 17.938 11ZM2.062 9H6.027C6.15187 6.68979 6.72341 4.42569 7.71 2.333C6.22401 2.77788 4.89922 3.64475 3.89657 4.8283C2.89392 6.01184 2.25659 7.4611 2.062 9ZM8.031 9H11.969C11.8248 6.6306 11.152 4.32353 10 2.248C8.84768 4.32345 8.17456 6.63052 8.03 9H8.031ZM12.29 2.333C13.2766 4.42569 13.8481 6.68979 13.973 9H17.938C17.7434 7.4611 17.1061 6.01184 16.1034 4.8283C15.1008 3.64475 13.776 2.77788 12.29 2.333Z"
                      fill="black"
                    />
                  </svg>
                </Link>
              )}

              {artistDetail.linkedin && (
                <Link
                  href={artistDetail.linkedin}
                  target="_blank"
                  className={styles.liHolder}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    width={25}
                    height={28}
                  >
                    <path
                      d="M4.00098 3H20.001C20.5533 3 21.001 3.44772 21.001 4V20C21.001 20.5523 20.5533 21 20.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V4C3.00098 3.44772 3.44869 3 4.00098 3ZM5.00098 5V19H19.001V5H5.00098ZM7.50098 9C6.67255 9 6.00098 8.32843 6.00098 7.5C6.00098 6.67157 6.67255 6 7.50098 6C8.3294 6 9.00098 6.67157 9.00098 7.5C9.00098 8.32843 8.3294 9 7.50098 9ZM6.50098 10H8.50098V17.5H6.50098V10ZM12.001 10.4295C12.5854 9.86534 13.2665 9.5 14.001 9.5C16.072 9.5 17.501 11.1789 17.501 13.25V17.5H15.501V13.25C15.501 12.2835 14.7175 11.5 13.751 11.5C12.7845 11.5 12.001 12.2835 12.001 13.25V17.5H10.001V10H12.001V10.4295Z"
                      fill="#000"
                    ></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div>
            <ArtistArtworks items={artistWork} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Artist

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

async function getArtistWork(a) {
  let arts
  try {
    arts = await client.query({
      query: GET_ARTIST,
      variables: {
        userId: a,
      },
    })
    return arts
  } catch (err) {
    console.log(err)
  }
}

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

export async function getStaticPaths() {
  const { data: artistList } = await client.query({
    query: GET_ARTIST_LIST,
  })

  return {
    paths: artistList?.artists2025?.nodes.map((artist) => {
      return {
        params: {
          artistId: artist.author.node.userId.toString(),
        },
      }
    }),
    fallback: process.env.REVALIDATE_DATA === 'true' ? 'blocking' : false,
  }
}
