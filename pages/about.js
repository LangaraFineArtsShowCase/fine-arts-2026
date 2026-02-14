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
        <title>About - Langara Fine Arts Grad Show 2025</title>
      </Head>
      <Header artistList={artistList} originPage="about" />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>Fine Arts</h1>
            <h2 className={styles.pageSubtitle}>
              Grad Show <small>2025</small>
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
                We gratefully acknowledge that our learning takes place on
                traditional, ancestral and unceded{' '}
                <strong> xʷməθkʷəy̓əm, Musqueam</strong> territory. We are deeply
                honoured to hold our given Musqueam name,{' '}
                <strong>snəw̓eyəɬ leləm̓,</strong> house of teachings.
              </p>
              <p>
                <strong>
                  Welcome to the Langara Fine Arts virtual graduation showcase
                  for 2025!
                </strong>
              </p>
              <p>
                This digital presentation of artworks complements our on-campus
                exhibition held at Langara College on West 49th Avenue in
                Vancouver from April 25<sup>th</sup> — May 4<sup>th</sup>, 2025.
                The artworks featured on this site show a wide range of artistic
                approaches that graduating students have taken in their
                ceramics, drawing, design, Indigenous carving & tool making,
                painting, performance, print media, public art, media, textile
                and sculpture courses. We are extremely proud of the dedication,
                curiosity and experimentation of these emerging artists and
                congratulate them on their significant achievement.
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
              <h2>Milos Campbell </h2>
              <span>- Department Chair, Fine Arts</span>
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
                On behalf of the Langara Fine Arts faculty and staff, I would
                like to acknowledge and celebrate the talent and commitment of
                students participating in the 2025 Graduation Exhibition, and
                accompanying website.
              </p>
              <p>
                Congratulations to you, the graduates! You stuck with a program
                that required many long days and sleepless nights. You fought
                through the trials and tribulations of mastering various new and
                difficult media. During this process you developed your ideas
                and imagery, defining your artistic voice. These years of hard
                work and dedication have brought you one step closer to your
                future goals.
              </p>
            </div>
            <div>
              <p>
                In this time of celebration, be thankful for the support of
                friends and family. Those connections made here and at home,
                along with the new skills you developed, will carry you through
                a lifetime. We wish you all the best as you continue your
                journey to new heights!
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
                <span>- sculpture</span>
              </li>
              <li>
                <strong>Aaron Nelson Moody</strong>
                <span>- indigenous carving and tool making</span>
              </li>
              <li>
                <strong>Natalie Purschwitz</strong>
                <span>- sculpture, drawing</span>
              </li>
              <li>
                <strong>Alwyn O’Brien</strong>
                <span>- ceramics</span>
              </li>
              <li>
                <strong>Philip Robbins</strong>
                <span>- design</span>
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
                <strong>Milos Campbell</strong>
                <span>- Department Chair, printmaking, drawing </span>
              </li>
              <li>
                <strong>Aurora Landin</strong>
                <span>
                  - Assistant Department Chair, printmaking, drawing and
                  professional practice
                </span>
              </li>
              <li>
                <strong>Elizabeth Milton</strong>
                <span>
                  - Assistant Department Chair, performance, media, drawing and
                  professional practice
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
              <h2>Darren Bernaerdt</h2>
              <span>- Dean of Arts</span>
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
                On behalf of the Faculty of Arts, I am pleased to
                offer congratulations on your graduation from the Fine Arts
                program at Langara College. This is a significant academic
                milestone and stage in your development as an artist. This
                represents the culmination of your dedication, creativity, hard
                work, and vision. Seeing the range of artistic expression in the
                Grad Show is a highlight each year and this year’s show is no
                exception.
              </p>
              <p>
                During your time in the Fine Arts program, the faculty and staff
                have been instrumental in supporting you. Their commitment is
                critical to creating the supportive community that thrives in
                the department. The quality of your work is testament to the
                exceptional education and mentorship that you have received.
              </p>
            </div>
            <div>
              <p>
                As you embark on the next chapter of your journey as an artist,
                I encourage you to continue the same dedication to your
                creativity and curiousity that has characterized your time in
                the Fine Arts program. Jump into the challenges and
                opportunities ahead with the same enthusiasm that you brought to
                your studies here at Langara College. Your skills and vision
                will make an impact on the world.
              </p>
              <p>
                Congratulations once again on your achievements and I look
                forward to hearing about your future successes and extraordinary
                contributions.
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
                Thank you to our Department leadership team for their
                dedication, insight and hard work running our program:{' '}
                <strong>Milos Campbell</strong> (Department Chair),{' '}
                <strong>Aurora Landin</strong> (Assistant Department Chair),{' '}
                <strong>Elizabeth Milton</strong> (Assistant Department Chair)
                and <strong>Rita Yip</strong> (Studio Coordinator). Deep
                gratitude to our donors: 
                <strong>David Lambert Foundation</strong>, 
                <strong>Anne and Jeff Powell</strong>,{' '}
                <strong>Craft Council of BC</strong>,{' '}
                <strong>Shadbolt Centre for the Arts</strong> (Ceramics
                Program), <strong>North-West Ceramics Foundation</strong>
                , <strong>Tenline Sales</strong>,{' '}
                <strong>Dudarave Print Workshop</strong> and{' '}
                <strong>Malaspina Printmakers</strong> for their generous
                contribution to our Fine Arts Awards program.
              </p>
              <p>
                The following people are responsible for creating this website: 
                <strong>Elizabeth Milton</strong> (Assistant Department Chair),
                <strong>Tomoko Okochi</strong>, <strong>Amandeep Singh</strong>{' '}
                (Web & Mobile App Instructors). <strong>Vinicius Souza </strong>{' '}
                (Web & Mobile App Student, Developer). Thank you, team!
              </p>
              <p>
                Splash Page Image: Serigraphy Detail, Martha
                <br />
                Image Layout: Leann Juatco
                <br />
                Photos by Claire Thomas, Maria Gazzola and Shradha Chonkar
              </p>
            </div>

            <div>
              <p>
                Huge thanks and congratulations to our Fine Arts Graduates for
                providing such strong work to fill this virtual space.
              </p>
              <p>Many thanks to the following folks who support our program:</p>
              <ul className={styles.thankYouList}>
                <li>
                  <strong>Darren Bernaerdt</strong>
                  <span>- Dean of Arts</span>
                </li>
                <li>
                  <strong>Spencer Dane</strong>
                  <span>- Creative Arts and Industries Division Chair</span>
                </li>
                <li>
                  <strong>Rebecca Slaven</strong>
                  <span>- Fine Arts Librarian</span>
                </li>
                <li>
                  <span>Our amazing life models:</span>
                  <strong>
                    - Guy, Steve, Hélène, Jessica, Bruce, Emmalena, Ann,
                    Tiffany, Mark
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
