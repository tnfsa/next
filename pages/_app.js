import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import '../styles/fontawesome-all.min.css'
import '../styles/card.css'
import Nav from '../components/nav'

import Head from 'next/head'

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title key={"title"}>臺南一中點餐系統</title>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no"/>
                <meta name={"description"}
                      content={"台南一中點餐系統"} key={"metaContent"}/>

                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />
            </Head>
            <Nav />
            <Component {...pageProps} />
            <script src={`${process.env.NEXT_PUBLIC_STATIC}js/jquery.min.js`}/>
            {/*<script src={`${process.env.NEXT_PUBLIC_STATIC}js/jquery.dropotron.min.js`}/>*/}
            <script src={`${process.env.NEXT_PUBLIC_STATIC}js/browser.min.js`}/>
            <script src={`${process.env.NEXT_PUBLIC_STATIC}js/breakpoints.min.js`}/>
            <script src={`${process.env.NEXT_PUBLIC_STATIC}js/util.js`}/>
            <script src={`${process.env.NEXT_PUBLIC_STATIC}js/main.js`}/>
        </>
    )
}

export default MyApp
