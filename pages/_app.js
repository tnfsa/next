import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import '../styles/fontawesome-all.min.css'
import '../styles/card.css'
import '../styles/tailwind.css'

import Script from 'next/script'
import Nav from '../components/nav'

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title key={"title"}>臺南一中點餐系統</title>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta name={"description"}
                    content={"台南一中點餐系統"} key={"metaContent"} />

            </Head>
            <Nav />

            <Component {...pageProps} />

            <Script src={`${process.env.NEXT_PUBLIC_STATIC}/js/jquery.min.js`} />
            <Script src={`${process.env.NEXT_PUBLIC_STATIC}/js/browser.min.js`} />
            <Script src={`${process.env.NEXT_PUBLIC_STATIC}/js/breakpoints.min.js`} />
            <Script src={`${process.env.NEXT_PUBLIC_STATIC}/js/util.js`} />
            <Script src={`${process.env.NEXT_PUBLIC_STATIC}/js/main.js`} />
        </>
    )
}

export default MyApp
