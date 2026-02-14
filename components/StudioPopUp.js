import styles from '../styles/ExpandArtwork.module.css'
import Image from 'next/image';

const StudioPopUp = (props) => {
    const art = props.content
    return (    
        <div className={styles.wholePage}>
            <div className={styles.imgHolder}>

                <div className={styles.btnContainer}>
                    <div className={styles.closeButton} onClick={props.setShow}>
                        <div></div>
                        <div></div>
                    </div>
                </div>



                <Image
                    src={art?.artworkFields?.thumbnail?.mediaItemUrl}
                    alt={art?.artworkFields?.artworkTitle}
                    layout='fill'
                    objectFit='contain'
                />
                
            </div>
        </div>
    )
}

export default StudioPopUp