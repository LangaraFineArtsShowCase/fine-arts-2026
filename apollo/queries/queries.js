import { gql } from '@apollo/client'

export const GET_ARTIST_LIST = gql`
  query MyQuery {
    artists2025(first: 40, where: { status: PUBLISH }) {
      nodes {
        artistFields {
          artistName
        }
        author {
          node {
            userId
          }
        }
      }
    }
  }
`

//where: {orderby: {majorWork: true}} >> Artwork which is ticked in Major Work field
export const GET_ARTISTS_MAJOR = gql`
  query MyQuery {
    artworks2025(where: { majorWork: true, status: PUBLISH }, first: 40) {
      nodes {
        artworkFields {
          artworkTitle
          material
          size
          studio
          thumbnail {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
        author {
          node {
            userId
            artists2025 {
              nodes {
                artistFields {
                  artistName
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ARTIST = gql`
  query MyQuery($userId: Int) {
    artists2025(where: { author: $userId }, first: 30) {
      nodes {
        artistFields {
          artistName
          blurb
          instagram
          linkedin
          personalWebsite
        }
        author {
          node {
            userId
            artworks2025 {
              nodes {
                artworkFields {
                  artType
                  artworkTitle
                  image2d {
                    sourceUrl
                  }
                  image3d1 {
                    sourceUrl
                  }
                  image3d2 {
                    sourceUrl
                  }
                  image3d3 {
                    sourceUrl
                  }
                  material
                  order
                  size
                  studio
                  videoIframe
                  majorWork
                  thumbnail {
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_STUDIO_WORKS = gql`
  query MyQuery($studio: String) {
    artworks2025(where: { studio: $studio }, first: 100) {
      nodes {
        artworkFields {
          artworkTitle
          material
          size
          studio
          thumbnail {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          videoIframe
          artType
          artworkTitle
          image2d {
            sourceUrl
          }
          image3d1 {
            sourceUrl
          }
          image3d2 {
            sourceUrl
          }
          image3d3 {
            sourceUrl
          }
        }
        author {
          node {
            userId
            artists2025 {
              nodes {
                artistFields {
                  artistName
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_CUSTOM_ARTWORKS = gql`
  query GET_CUSTOM_ARTWORKS {
    customArtworks(where: { status: PUBLISH }, first: 300) {
      nodes {
        customArtworkYear {
          year
        }
        artworkFields {
          artworkTitle
          artType
          studio
          order
          thumbnail {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  }
`
