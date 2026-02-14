import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import styles from '../styles/SideList.module.css'
import Head from 'next/head'
// import { redirect } from 'next/navigation';
import Link from 'next/link'

const SideList = (props) => {
  const [list, setList] = useState([])
  useEffect(() => {
    const isArr =
      Object.prototype.toString.call(props.artistsNames) == '[object Array]'

    if (isArr) {
      // setList(props.artistsNames)
      let sorted = props.artistsNames

      sorted = sorted.sort((a, b) => {
        const lastNameA = a.name?.split(' ').slice(-1)[0]
        const lastNameB = b.name?.split(' ').slice(-1)[0]
        // console.log(lastNameA);
        if (lastNameA < lastNameB) return -1
        if (lastNameA > lastNameB) return 1
      })

      setList(sorted)
    }
  }, [props.artistsNames])

  if (props) {
    return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:wght@800&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@1,300&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <div className={styles.sideMenu}>
          <ul>
            <li>
              <h2>{props.name}</h2>
            </li>

            {!props.artistsNames ? (
              <>
                {props.list
                  .sort((a, b) => {
                    return a < b ? -1 : 1
                  })
                  .map((item, index) => (
                    <li key={index}>
                      <div>
                        <Link href={`studio/${item.toLowerCase()}`}>
                          {item.toLowerCase() ==
                          'indigenous carving & toolmaking'
                            ? 'indigenous carving'
                            : item.toLowerCase()}
                        </Link>
                      </div>
                    </li>
                  ))}
              </>
            ) : (
              <>
                <>
                  {list.map((item, index) => (
                    <li key={index}>
                      <div>
                        <Link href={`/artist/${item.userId}`}>{item.name}</Link>
                      </div>
                    </li>
                  ))}
                </>
              </>
            )}
          </ul>
        </div>
      </>
    )
  }
  return <></>
}

export default SideList
