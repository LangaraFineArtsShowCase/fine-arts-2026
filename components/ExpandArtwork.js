import styles from '../styles/ExpandArtwork.module.css'
import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const ExpandArtwork = (setShow) => {
  const [imgSrc, setImgSrc] = useState('1')
  const art = setShow.artwork
  const img = `image3d${imgSrc}`
  console.log(art?.artworkFields?.[img]?.sourceUrl)

  const handelLeftChangeImg = () => {
    if (imgSrc == 1) {
      if (art?.artworkFields?.image3d3) {
        setImgSrc(3)
      } else {
        setImgSrc(2)
      }
    } else {
      const newImgSrc = +imgSrc - 1

      setImgSrc(newImgSrc)
    }
  }

  const handelRightChangeImg = () => {
    if (imgSrc == 2) {
      if (art?.artworkFields?.image3d3) {
        setImgSrc(3)
      } else {
        setImgSrc(1)
      }
    } else if (imgSrc == 3) {
      setImgSrc(1)
    } else {
      const newImgSrc = +imgSrc + 1

      setImgSrc(newImgSrc)
    }

    // if(art?.artworkFields?.image3d3 === 'undefined'){
    //     console.log('wa');
    // }else{
    //     if(imgSrc == 3){
    //         setImgSrc(1)

    //     }else{
    //         let newImgSrc = imgSrc
    //         setImgSrc((+imgSrc +1))
    //     }
    // }
  }

  return (
    <div className={styles.wholePage}>
      <div className={styles.imgHolder}>
        <div className={styles.btnContainer}>
          <div className={styles.closeButton} onClick={setShow.setShow}>
            <div></div>
            <div></div>
          </div>
        </div>

        {art?.artworkFields?.artType == 'multiple_view' && (
          <div>
            {art?.artworkFields?.image3d2 && (
              <div>
                <div className={styles.leftBtn} onClick={handelLeftChangeImg}>
                  <div></div>
                </div>

                <div className={styles.rightBtn} onClick={handelRightChangeImg}>
                  <div></div>
                </div>
              </div>
            )}

            <Image
              src={art?.artworkFields?.[img]?.sourceUrl}
              alt={art?.artworkFields?.artworkTitle}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}

        {art?.artworkFields?.artType == 'single_view' && (
          <Image
            src={art?.artworkFields?.image2d?.sourceUrl}
            alt={art?.artworkFields?.artworkTitle}
            layout="fill"
            objectFit="contain"
          />
        )}

        {art?.artworkFields?.artType == 'video_view' && (
          <div
            className={styles.videoPlayer}
            dangerouslySetInnerHTML={{ __html: art.artworkFields.videoIframe }}
          ></div>
        )}
      </div>
    </div>
  )
}

export default ExpandArtwork
