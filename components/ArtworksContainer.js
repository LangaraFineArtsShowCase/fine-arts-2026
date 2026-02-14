import React, { useState, useEffect } from 'react'
import SideList from './SideList'
import Image from 'next/image'
import styles from '../styles/ArtworksContainer.module.css'
import { useRouter } from 'next/router'
import ExpandArtwork from './ExpandArtwork'
import unescape from 'lodash/unescape'

const ArtworkContainer = ({
  items,
  artistsNames,
  originPage,
  fallbackImages,
}) => {
  const [shuffledItems, setShuffledItems] = useState([])
  const [leftColumn, setLeftColumn] = useState([])
  const [rightColumn, setRightColumn] = useState([])
  const [show, setShow] = useState(false)
  const [artworks, setArtworks] = useState([])
  const [additionalArtworks, setAdditionalArtworks] = useState([])

  const shuffle = (artworks, additionals) => {
    if (artworks) {
      let studentArtworks = artworks
      /*
      for (let i = studentArtworks.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[studentArtworks[i], studentArtworks[j]] = [
          studentArtworks[j],
          studentArtworks[i],
        ]
      }*/
      setShuffledItems(studentArtworks)
    }

    if (additionals.length > 0) {
      additionals.sort((a, b) => {
        let orderA = a.artworkFields.order
        let orderB = b.artworkFields.order
        return orderA - orderB
      })

      setShuffledItems((prev) => [...prev, ...additionals])
    }
  }

  useEffect(() => {
    shuffle(artworks, additionalArtworks)
    let left = []
    let right = []
    for (let i = 0; i < shuffledItems.length; i++) {
      if (i % 2 == 0) {
        left.push(shuffledItems[i])
      } else {
        right.push(shuffledItems[i])
      }
    }

    setLeftColumn(left)
    setRightColumn(right)
  }, [shuffledItems.length, artworks.length, additionalArtworks.length])

  useEffect(() => {
    let fallbackArtworks = []
    if (fallbackImages) {
      fallbackArtworks = fallbackImages.images.map((item) => {
        return {
          isFallbackImage: true,
          artworkFields: {
            thumbnail: {
              mediaItemUrl: item,
              mediaDetails: {
                height: 500,
                width: 500,
              },
              order: 1000,
            },
            artType: 'single_view',
            image2d: { sourceUrl: item },
            sourceUrl: item,
            size: '',
            material: '',
            artworkTitle: '',
          },
          custom: true,
        }
      })
    }
    if (items?.length) {
      let artworks = items?.filter((artwork) => !artwork?.custom)
      setArtworks([...artworks, ...fallbackArtworks])
      setAdditionalArtworks(items?.filter((artwork) => !!artwork?.custom))
    }
  }, [items, artistsNames])

  const router = useRouter()

  const handlePopup = (a) => {
    if (a?.custom) {
      return
    }

    if (originPage == 'studio') {
      router.push(`/artist/${a.author.node.userId}`)
    } else {
      router.push(`/artist/${a.author.node.userId}`)
    }
  }

  const disablePopup = () => {
    setShow(false)
  }

  const handleArtistClick = (a) => {
    router.push(`/artist/${a.author.node.userId}`)
  }

  return (
    <>
      <div className={styles.flexContainer}>
        {show == true && <ExpandArtwork setShow={disablePopup} />}
        <div className={styles.container}>
          <div className={styles.colOne}>
            {leftColumn.length > 0 ? (
              leftColumn.map((item, index) => (
                <div className={styles.artworkContainer} key={index}>
                  <Image
                    src={item?.artworkFields?.thumbnail?.mediaItemUrl}
                    width={item?.artworkFields?.thumbnail?.mediaDetails?.width}
                    height={
                      item?.artworkFields?.thumbnail?.mediaDetails?.height
                    }
                    alt={item?.artworkFields?.artworkTitle}
                    onClick={() => {
                      handlePopup(item)
                    }}
                  />

                  {!!item?.author && !item?.artworkFields?.custom && (
                    <div className={styles.hideDesc}>
                      <div className={styles.artName}>
                        {unescape(item.artworkFields.artworkTitle)}
                      </div>

                      <div>
                        {item.author.node.artists2025.nodes.map((artist, i) => (
                          <div
                            className={styles.artistName}
                            key={i}
                            onClick={() => {
                              handleArtistClick(item)
                            }}
                          >
                            {unescape(artist.artistFields.artistName)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <div className={styles.colTwo}>
            {rightColumn.length > 0 ? (
              rightColumn.map((item, index) => (
                <div className={styles.artworkContainer} key={index}>
                  <Image
                    src={item?.artworkFields?.thumbnail?.mediaItemUrl}
                    width={item?.artworkFields?.thumbnail?.mediaDetails?.width}
                    height={
                      item?.artworkFields?.thumbnail?.mediaDetails?.height
                    }
                    alt={item?.artworkFields?.artworkTitle}
                    onClick={() => {
                      handlePopup(item)
                    }}
                  />

                  {!!item?.author && !item?.artworkFields?.custom && (
                    <div className={styles.hideDesc}>
                      <div className={styles.artName}>
                        {unescape(item?.artworkFields?.artworkTitle)}
                      </div>

                      <div>
                        {item.author.node.artists2025.nodes.map((artist, i) => (
                          <div
                            className={styles.artistName}
                            key={i}
                            onClick={() => {
                              handleArtistClick(item)
                            }}
                          >
                            {unescape(artist.artistFields.artistName)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className={styles.studioContainer}>
          {artistsNames ? (
            <SideList name={'Artists'} list={[]} artistsNames={artistsNames} />
          ) : (
            <SideList
              name={'Studios'}
              list={[
                'Ceramics',
                'Painting',
                'Indigenous Carving & Toolmaking',
                'Design',
                'Sculpture',
                'Media',
                'Drawing',
                'Print Media',
                'Textiles',
                'Public Art',
                'Performance',
              ]}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ArtworkContainer
