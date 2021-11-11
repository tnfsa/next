import Title from "../components/Title";
import Head from "next/head";
import Footer from "../components/Footer";

export default function about() {
    return (
        <>
            <div id="page-wrapper">
                <section id="main">
                    <Title title="About"
                           link="/about"/>
                    <div className="container">
                        <article className="box post" locale="zh-TW">
                            暫待更新
                        </article>
                        <article className="box post" locale="en">
                            Hang on while we update the info.
                        </article>
                    </div>
                </section>
                <Footer />
            </div>
            <Head>
                <title key="title" locale="zh-TW">關於這個網站</title>
                <title key="title" locale="en">about this website</title>
            </Head>
        </>
    )
}