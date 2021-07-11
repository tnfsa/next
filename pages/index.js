import Nav from '../components/nav'
import Link from 'next/link'
import Spotlight from "../components/Home/Spotlight";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div id="page-wrapper">
            <section id="header">
                <h1><Link href="/">臺南一中點餐系統</Link></h1>
                <Nav/>
                <section id="banner">
                    <header>
                        <h2>臺南一中</h2>
                        <p>美訂美當點餐系統</p>
                    </header>
                </section>

                <section id="intro" className="container">
                    <div className="row">
                        <Spotlight position="first"
                                   icon="icon solid featured fa-cog"
                                   title="操作方便"
                                   context="如果不方便可以在頁底回報喔" />
                        <Spotlight title="快速"
                                   context="線上預訂，讓你免於在美廣大排長榮，減少群聚"
                                   position="middle"
                                   icon="icon solid featured alt fa-bolt"/>
                        <Spotlight title="評分系統"
                                   context="可以依照自己的想法，向大家提供餐點建議"
                                   position="last"
                                   icon="icon solid featured alt2 fa-star"/>

                    </div>
                    <footer>
                        <ul className="actions">
                            <li><a href="/login" className="button large">現在開始</a></li>
                            <li><a href="https://docs.tnfsa.org/" className="button alt large">了解更多</a></li>
                        </ul>
                    </footer>
                </section>

            </section>
            <Footer />
        </div>
    )
}
