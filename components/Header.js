import { useState, useEffect } from 'react'
import Link from 'next/link'
import { studioArray } from '@/config/data_config'
import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import useIsLargeScreen from '@/hooks/useIsLargeScreen'
import unescape from 'lodash/unescape'

const Header = ({ artistList, originPage, bgColor }) => {
  const { isLargeScreen } = useIsLargeScreen()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuLinksOpen, setIsMenuLinksOpen] = useState(false)
  const [isArtistsListOpen, setIsArtistsListOpen] = useState(false)
  const [isStudiosListOpen, setIsStudiosListOpen] = useState(false)
  const [comingSoonEnabled, setComingSoonEnabled] = useState(false)

  // add class to body when menu state is changed
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-is-visible')
    } else {
      document.body.classList.remove('menu-is-visible')
    }
  }, [isMenuOpen])

  useEffect(() => {
    setComingSoonEnabled(process.env.NEXT_PUBLIC_ENABLE_COMING_SOON !== 'true')
  }, [])

  // when main menu closed, reset states
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsArtistsListOpen(false)
    setIsStudiosListOpen(false)

    // close menu links container when burger menu is closed
    if (setIsMenuOpen) {
      setIsMenuLinksOpen(false)
    }
  }

  // toggle menu links container
  const toggleMenuLinks = (linksToShow) => {
    if (linksToShow == 'artists') {
      setIsArtistsListOpen(!isArtistsListOpen)
    } else if (linksToShow == 'studios') {
      setIsStudiosListOpen(!isStudiosListOpen)
    }
    setIsMenuLinksOpen(!isMenuLinksOpen)
  }

  const getSortedArtists = (artists = []) => {
    let stutends = []
    let prev = ''

    stutends = [...artists].sort((a, b) => {
      if (a.artistFields.artistName < b.artistFields.artistName) return -1
      if (a.artistFields.artistName > b.artistFields.artistName) return 1
      return 0
    })

    stutends = stutends.map((artist) => {
      if (artist.artistFields.artistName[0] == prev) {
        artist.artistFields.isNewInitial = false
        return artist
      } else {
        artist.artistFields.isNewInitial = true
        prev = artist.artistFields.artistName[0]
        return artist
      }
    })

    return stutends
  }

  return (
    <header className={styles.header}>
      <div
        className={styles.headerContainer}
        style={{
          backgroundColor: originPage == 'about' ? '#FFFFFF' : bgColor,
          borderBottom: originPage == 'about' ? '1px solid #181818' : 'none',
        }}
      >
        <div
          className={styles.headerWrapper}
          style={{
            ...(originPage === 'home' ? { justifyContent: 'flex-end' } : {}),
          }}
        >
          {originPage != 'home' && (
            <div className={styles.headerTitle}>
              <Link
                href="/"
                style={{ color: originPage == 'about' ? '#181818' : '#ffffff' }}
              >
                <span>Langara Fine Arts</span>
                <span>Grad Show 2025</span>
              </Link>
            </div>
          )}

          {comingSoonEnabled && (
            <div
              className={`${styles.burgerMenu} ${
                isMenuOpen && styles.burgerMenuOpen
              } ${isMenuLinksOpen && styles.burgerMenuLinksOpen}`}
              onClick={toggleMenu}
            >
              <div />
              <div />
              <div />
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.menuContainer} ${
          isMenuOpen && styles.menuContainerOpen
        } ${isMenuLinksOpen && styles.menuLinksVisible}`}
      >
        <div className={styles.nav}>
          <div
            className={`${styles.navColumn} ${
              isArtistsListOpen && styles.slideArtistsMenu
            } ${isStudiosListOpen && styles.hideArtistsMenu}`}
          >
            <h3 onClick={() => toggleMenuLinks('artists')}>Artists</h3>
            <span>1</span>
          </div>
          <div
            className={`${styles.navColumn} ${
              isArtistsListOpen && styles.hideStudiosMenu
            } ${isStudiosListOpen && styles.slideStudiosMenu}`}
          >
            <h3 onClick={() => toggleMenuLinks('studios')}>Studios</h3>
            <span>2</span>
          </div>
          <div
            className={`${styles.navColumn} ${
              isMenuLinksOpen && styles.hideAboutMenu
            }`}
          >
            <h3>
              <Link href="/about">About</Link>
            </h3>
            <span>3</span>
          </div>
        </div>

        <div
          className={`${styles.menuLinks} ${
            isMenuLinksOpen && styles.menuLinksOpen
          }`}
        >
          {isArtistsListOpen && (
            <div className={styles.artistList}>
              {getSortedArtists(artistList).map((artist, i) => (
                <div key={i} className={styles.artistName}>
                  {artist.artistFields.isNewInitial ? (
                    <p className={styles.initial}>
                      {artist.artistFields.artistName[0]}
                    </p>
                  ) : (
                    <p className={styles.initial}></p>
                  )}
                  <Link
                    href={`/artist/${artist.author.node.userId}`}
                    passHref
                    legacyBehavior
                  >
                    <a
                      onClick={(e) => {
                        toggleMenu()
                      }}
                    >
                      {unescape(artist.artistFields.artistName)}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {isStudiosListOpen && (
            <div className={styles.StudiosList}>
              {studioArray
                .sort((a, b) =>
                  isLargeScreen
                    ? a.order - b.order
                    : a.mobileOrder - b.mobileOrder
                )
                .map((studio, i) => (
                  <div key={i}>
                    <Link
                      href={`/studio/${studio.studioSlug}`}
                      passHref
                      legacyBehavior
                    >
                      <a
                        onClick={(e) => {
                          toggleMenu()
                        }}
                      >
                        <Image
                          src={studio.studioImage[0]}
                          alt={studio.studioName}
                          width={360}
                          height={360}
                        />
                      </a>
                    </Link>
                    <h4>
                      <Link href={`/studio/${studio.studioSlug}`}>
                        {studio.studioName}
                      </Link>
                    </h4>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
