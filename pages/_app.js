import '../styles/main.css'
import '../styles/fontawesome-all.min.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
      <>
        <Head>
          <title key={"title"}>台南一中點餐系統</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
          <script src="https://static.tnfsa.org/js/jquery.min.js" />
          <script src="https://static.tnfsa.org/js/jquery.dropotron.min.js" />
          <script src="https://static.tnfsa.org/js/browser.min.js" />
          <script src="https://static.tnfsa.org/js/breakpoints.min.js" />
          <script src="https://static.tnfsa.org/js/util.js" />
          <script src="https://static.tnfsa.org/js/main.js" />
      </>
  )
}

export default MyApp
