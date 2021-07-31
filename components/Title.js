import Link from 'next/link'
import Head from 'next/head'

export default function Title(props) {

    if (typeof (props.link) === "undefined") {
        return (
            <>
                <Head>
                    <title key="title">{`${props.title}-點餐系統`}</title>
                </Head>
                <section id="header">
                    <h1>{props.title}</h1>
                </section>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title key={"title"}>{`${props.title}-點餐系統`}</title>
                </Head>
                <section id="header">
                    <h1><Link href={props.link}>{props.title}</Link></h1>
                </section>
            </>
        )
    }
}