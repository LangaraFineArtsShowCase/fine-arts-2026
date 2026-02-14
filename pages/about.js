import client from '../apollo/client'
import { GET_ARTISTS_MAJOR, GET_ARTIST_LIST } from '@/apollo/queries/queries'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import { aboutImages, imageBasePath } from '../config/data_config'
import dynamic from 'next/dynamic'
import Carousel from 'better-react-carousel'
import styles from '@/styles/About.module.css'
import Footer from '@/components/Footer'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const About = ({ artistList }) => {
  return (
    <>
      <Head>
        <title>About - Langara Fine Arts Grad Show 2026</title>
      </Head>
      <Header artistList={artistList} originPage="about" />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>Fine Arts</h1>
            <h2 className={styles.pageSubtitle}>
              Grad Show <small>2026</small>
            </h2>
            <div className={styles.videoWrapper}>
              <ReactPlayer
                url={`${imageBasePath}/videos/about/About-Video.mp4`}
                playing={true}
                muted={true}
                controls={false}
                loop={true}
                width="400px"
                height="400px"
                playsinline
              />
            </div>
            <div>
              <p>
                Langara Fine Arts gratefully acknowledges that our teaching, learning and making takes place upon
                ancestral, present-day, unceded{' '}
                <strong> xʷməθkʷəy̓əm, Musqueam</strong> territory. We are deeply
                honoured to hold our given Musqueam name,{' '}
                <strong>snəw̓eyəɬ leləm̓,</strong> house of teachings.
              </p>
              <p>
                <strong>
                  Welcome to the Langara Fine Arts virtual graduation showcase
                  for 2026!
                </strong>
              </p>
              <p>
                This website complements our on-campus
                exhibition held at Langara College from April 30<sup>th</sup> — May 10<sup>th</sup>, 2026.
                The artworks featured on this site show a wide range of artistic
                approaches that graduating students have experimented with during their
                time in the Fine Arts Program (ex: Ceramics, Drawing, Design,
                Indigenous Carving & Tool making, Painting, Performance,
                Printmaking, Public Art, Media, Textiles and Sculpture).
                We are extremely proud of the dedication, curiosity and
                experimentation of these emerging artists and congratulate
                them on their significant achievement.
              </p>
              <p className={styles.byline}>
                If you wish to inquire about purchasing any of these featured
                artworks, feel free to reach out to our Studio Coordinator, Rita
                Yip (<a href="mailto:ritayip@langara.ca">ritayip@langara.ca</a>
                ).
              </p>
            </div>
          </div>
        </section>

        <section className={styles.carousel}>
          <Carousel cols={4} rows={1} gap={0} loop={true}>
            {aboutImages.map((image, i) => (
              <Carousel.Item key={i}>
                <div className={styles.carouselItemWrapper}>
                  <Image
                    src={image.thumbnailPath}
                    alt={image.altText}
                    aria-hidden="true"
                    fill
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        <section
          className={`${styles.section} ${styles.bgGray} ${styles.portraitStephanie}`}
        >
          <div className={styles.wrapper}>
            <div
              className={`${styles.personPortrait} ${styles.textAlignRight}`}
            >
              <h2>Aurora Landin (She/They) </h2>
              <span style={{ textTransform: "none" }}>- Department Chair, Fine Arts</span>
              <Image
                src={`${imageBasePath}/images/about/milos-campbell.jpg`}
                alt="Milos Campbell "
                width={361}
                height={361}
                priority={true}
              />
            </div>
            <div>
              <p>
                On behalf of the Langara Fine Arts faculty and staff, I would like to celebrate the talent, commitment and accomplishments of students participating in the 2026 Graduation Exhibition and accompanying website.
              </p>
              <p>
                We congratulate you, the Graduates! You've successfully navigated an intense period of hands-on discovery, of growing capabilities and material understanding, and of forging lasting connections with each other and with the Fine Arts Program. It has taken enormous dedication, passion and curiosity to complete this leg of your journey, with many long days and sleepless nights along the way.
              </p>
            </div>
            <div>
              <p>
                We are so thrilled to celebrate this achievement with all of these Graduates, and to acknowledge with gratitude the enormous support of their families and friends, who have helped get them to this point. The connections made here and in the broader community, along with the new skills you have gained, will carry you through a lifetime. We wish you all the best as you continue your journey to new heights!
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.facultyListSection}`}>
          <div className={styles.wrapper}>
            <p>
              Langara Fine Arts is comprised of the following faculty and staff:
            </p>
            <ul className={styles.facultyList}>
              <li>
                <strong>Stephanie Aitken</strong>
                <span>- painting, drawing</span>
              </li>
              <li>
                <strong>Gloria Han</strong>
                <span>- ceramics, professional practice</span>
              </li>
              <li>
                <strong>Steve Hubert</strong>
                <span>- sculpture, painting, media and drawing</span>
              </li>
              <li>
                <strong>Scott Kemp</strong>
                <span>- sculpture, professional practice</span>
              </li>
              <li>
                <strong>Aaron Nelson Moody</strong>
                <span>- indigenous carving and tool making</span>
              </li>
              <li>
                <strong>Natalie Purschwitz</strong>
                <span>- sculpture, drawing, textile studio</span>
              </li>
              <li>
                <strong>Alwyn O’Brien</strong>
                <span>- ceramics</span>
              </li>
              <li>
                <strong>Pat Vera</strong>
                <span>- design, public art</span>
              </li>
              <li>
                <strong>Helena Wadsley</strong>
                <span>- painting, drawing, textile studio</span>
              </li>
              <li>
                <strong>Suzi Webster</strong>
                <span>- media studio and drawing</span>
              </li>
              <li>
                <strong>Will Morrison</strong>
                <span>- Workshop Coordinator</span>
              </li>
              <li>
                <strong>Rita Yip</strong>
                <span>- Studio Coordinator</span>
              </li>
              <li>
                <strong>Aurora Landin</strong>
                <span>
                  - Department Chair, printmaking, drawing, professional practice
                </span>
              </li>
              <li>
                <strong>Milos Campbell</strong>
                <span>- Assistant Department Chair, printmaking, drawing </span>
              </li>
              <li>
                <strong>Elizabeth Milton</strong>
                <span>
                  - Graduation Exhibition Coordinator, performance, media studio, drawing and professional practice
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.bgGray} ${styles.portraitDarren}`}
        >
          <div className={styles.wrapper}>
            <div className={styles.personPortrait}>
              <h2>David N. Wright, PhD (He/Him) </h2>
              <span style={{ textTransform: "none" }}>- Interim Dean, Faculty of Arts </span>
              <Image
                src={`${imageBasePath}/images/about/darren-bernaerdt.jpg`}
                alt="darren bernaerdt"
                width={361}
                height={361}
                priority={true}
              />
            </div>
            <div>
              <p>
                On behalf of the Faculty of Arts, it is my distinct pleasure to extend congratulations on your graduation from the Fine Arts program at Langara College. This moment marks not only the completion of a course of study, but a moment of artistic accomplishment and anticipation for what the future might hold. The Grad Show is a highlight of the year where we see the results of sustained discipline, aesthetic risk, and intellectual resolve begin to announce themselves as a mature artistic practice.
              </p>
              <p>
                Throughout your time in the Fine Arts program, faculty and staff have played an essential role in cultivating the culture of exploration and curiosity that informs so much of artistic practice. That the Grad Show so elegantly reflects a heterogeneous community is a testament to the commitment everyone makes in affirming the essential role of artistic representation in a turbulent world.
              </p>
            </div>
            <div>
              <p>
                As you move into the next chapter of your life as an artist, I encourage you to maintain a sense of adventure and experimentation. Carry forward the curiosity, discipline, and willingness to unsettle received assumptions that you've been given space to explore here. Embrace the demands of persistence and inspiration by working through the sustained engagement that yields meaningful artistic interventions into, and unique ways of representing, the spaces you occupy.
              </p>
              <p>
                Congratulations once again on your accomplishments. May the path forward see you as a thoughtful and provocative witness to the broader cultural conversation. I'll be cheering you on.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.thankYouSection}`}>
          <div className={styles.wrapper}>
            <div className={styles.thankYouTitle}>
              <h2>Thank Yous:</h2>
            </div>
            <div>
              <p>
                Thank you to our Department Leadership Team for their
                dedication, care and hard work running our program:{' '}
                <strong>Aurora Landin</strong> (Department Chair),{' '}
                <strong>Milos Campbell</strong> (Assistant Department Chair),{' '}
                <strong>Elizabeth Milton</strong> (Graduation Exhibition Coordinator)
                and <strong>Rita Yip</strong> (Studio Coordinator). Deep
                gratitude to our donors:{' '}
                <strong>Bob Graham & Laura Cullen</strong>,{' '}
                <strong>David Lambert Foundation</strong>,{' '}
                <strong>Anne and Jeff Powell</strong>,{' '}
                <strong>Craft Council of BC</strong>,{' '}
                <strong>Shadbolt Centre for the Arts</strong> (Ceramics
                Program), <strong>North-West Ceramics Foundation</strong>
                , <strong>Tenline Sales</strong>,{' '}
                <strong>Dudarave Print Workshop</strong> and{' '}
                <strong>Malaspina Printmakers</strong> for their generous
                contribution to our Fine Arts Awards program.
              </p>
              <p>
                Thank you to those that made this website possible:{' '}
                <strong>Elizabeth Milton</strong> (Graduation Exhibition Coordinator);{' '}
                <strong>Tomoko Okochi</strong>, <strong>Binazir Farokhi</strong>{' '}
                (WMDD Instructors) and <strong>Yahui Xu</strong>{' '}
                (WMDD Student, Developer). We are deeply grateful for our
                partnership with the Web and Mobile App Development and Design
                Program over the years. Thank you, team!
              </p>
              <p>
                Splash Page Image: 
                <br />
                Image Layout: 
                <br />
                Photos by Sam Leung and Shradha Chonkar
              </p>
            </div>

            <div>
              <p>
                Huge thanks to our incredible students for filling this site with their dynamic artwork!
              </p>
              <p>Many thanks to the following folks who support our program:</p>
              <ul className={styles.thankYouList}>
                <li>
                  <strong>Rebecca Slaven & Suzanne Cowan</strong>
                  <span>- Fine Arts Librarians</span>
                </li>
                <li>
                  <strong>Spencer Dane</strong>
                  <span>- Division Chair, Creative Arts and Industries</span>
                </li>
                <li>
                  <strong>David Wright</strong>
                  <span>- Interim Dean, Faculty of Arts</span>
                </li>
                <li>
                  <span>Our amazing life models:</span>
                  <strong>
                    - Guy, Steve, Hélène, Jessica, Bruce, Emmalena, Tiffany, Mark
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.bgGray} ${styles.langaraApplySection}`}
        >
          <div className={styles.wrapper}>
            <div
              className={`${styles.personPortrait} ${styles.textAlignRight}`}
            >
              <h2>Langara Fine Arts</h2>
              <Image
                src={`${imageBasePath}/images/about/Thumbnail_About.jpg`}
                alt="langara fine arts"
                width={361}
                height={361}
                priority={true}
                className={styles.langaraFineArtsImage}
              />
            </div>
            <div>
              <p>
                The Langara Fine Arts diploma program is a two-year studio art
                foundation that emphasizes hands-on material-based skills within
                a supportive community of makers, learners, and thinkers.
                Langara Fine Arts is committed to a culture of humility and
                respect.
              </p>
            </div>
            <div>
              <p>
                Students have the opportunity to study drawing, design,
                painting, sculpture, foundry, printmaking, Indigenous carving,
                ceramics, textile art, media, performance and public art. Our
                tuition is affordable, and our courses are university
                transferable. Langara Fine Arts alumni go on to study at
                respected universities throughout Canada and beyond.
              </p>
            </div>
            <div className={styles.applyOnlineContainer}>
              <p>
                For information on admissions to the Langara Fine Arts program
                contact
                <br />
                <a href="mailto:admissions@langara.ca">
                  <strong>admissions@langara.ca</strong>
                </a>
              </p>
              <p>
                <Link
                  href="https://langara.ca/programs-and-courses/programs/fine-arts/application-info.html"
                  className={styles.applyOnlineBtn}
                  target="_blank"
                >
                  Apply online today!
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default About

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
