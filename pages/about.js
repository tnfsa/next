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
                        <article className="box post">
                            暫待更新
                        </article>
                    </div>
                </section>
                <Footer />
            </div>
            <Head>
                <title key={"title"}>關於這個網站</title>
            </Head>
        </>
    )
}