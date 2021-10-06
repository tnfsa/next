// themes
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import '../styles/fontawesome-all.min.css'
import '../styles/card.css'
import '../styles/tailwind.css'


import Nav from '../components/nav'
import Head from 'next/head'

// redux
import { Provider } from "react-redux"
import {store} from "../redux/store"

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store} >
            <Head>
                <title key={"title"}>臺南一中點餐系統</title>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta name={"description"}
                    content={"台南一中點餐系統"} key={"metaContent"} />

            </Head>
            <Nav />

            <Component {...pageProps} />

        </Provider>
    )
}

export default MyApp
