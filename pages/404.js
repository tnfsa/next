import Title from "../components/Title";
import Head from "next/head";
import Footer from "../components/Footer";

export default function Error() {
    return (
        <>
            <Head>
                <title key={"title"}>找不到要求的網頁</title>
            </Head>
            <div id="page-wrapper">
                <section id="main">
                    <Title title="回首頁"
                           link="/"/>
                    <div className="container">
                        <article className="box post">
                            <h2>
                                <center>404 Not Found</center>
                            </h2>
                            <br/>
                            <h3>哭哭(我沒有學吳X輝)<br/>您所輸入的連結已失效，或是不存在</h3>
                        </article>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}