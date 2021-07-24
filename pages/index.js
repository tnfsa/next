import Nav from '../components/nav'
import Link from 'next/link'
import Spotlight from "../components/Home/Spotlight"
import Footer from "../components/Footer"
import Alert from '../components/Alert'
import { useState } from 'react'
import LatestNews from '../components/Home/LatestNews'

export default function Home({qna,news}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [question, setQuestion] = useState('')

    async function Send() {
        //sending Request to google form
        try {
            const query = `&entry.123965645=${name}&entry.1905774359=${email}&entry.639825153=${question}&entry.1815346233=${document.location.href}&submit=SUBMIT`
            const formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdtQnI-HG1ytIWvtbDhK_VNYO2-3ZFcZNo-AKGbYHYqHhTidw/formResponse"
            const url = encodeURI(`${formURL}?${query}`)
            await fetch(url, {
                method: 'POST',
                mode: 'no-cors'
            })
            // good
            window.alert(`Message sent successful`)
            setName('')
            setEmail('')
            setQuestion('')
        } catch (err) {
            window.alert(`Message sent FAILED: ${err}`)
        }
    }
    return (
        <div id="page-wrapper">
            <section id="header">
                <Alert />
                <h1><Link href="/">臺南一中點餐系統</Link></h1>
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
            
            <section id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-8 col-12-medium">
                            <section>
                                <header>
                                    <h2>最新消息</h2>
                                </header>
                                <ul className="dates">
                                    {typeof (news) !== "undefined" && news.map(data => {
                                        return (
                                            <LatestNews month={data.month}
                                                date={data.date}
                                                title={data.title}
                                                context={data.context} />
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                        <div className="col-4 col-12-medium">
                            <section>
                                <header>
                                    <h2>關於這個網站</h2>
                                </header>
                                <a href="#" className="image featured"><img src={`${process.env.NEXT_PUBLIC_STATIC}images/pic10.jpg`} alt="" /></a>
                                <p>
                                    基於 HTML5 UP 的免費模板、 Vercel、Github 前端資源、TFCIS後端資源，所集結的訂餐網頁。<br />
                                    網頁前端<Link href="https://sivir.pw/">Milliax</Link>、網頁後端<Link
                                        href="https://hsuan.app/">Hsuan1117</Link>
                                    以及Icon提供<Link
                                        href="https://www.facebook.com/profile.php?id=100017341713935">Nody0105</Link>
                                </p>
                                <footer>
                                    <ul className="actions">
                                        <li><a href="/about" className="button">Find out more</a></li>
                                    </ul>
                                </footer>
                            </section>
                        </div>
                        <div className="col-4 col-6-medium col-12-small">
                            <section>
                                <header>
                                    <h2>回饋表單</h2>
                                </header>
                                <ul className="divided">
                                    <form onSubmit={e => {
                                        e.preventDefault()
                                        Send()
                                    }}>
                                        <article className="l-design-width">
                                            <div className="card">
                                                <label className="input"><h3>暱稱：</h3>
                                                    <input className="input__field"
                                                        type="text"
                                                        placeholder="輸入你的暱稱"
                                                        value={name}
                                                        onChange={e => { setName(e.target.value) }}
                                                        required />
                                                </label>
                                                <label className="input"><h3>電子郵件：</h3>
                                                    <input className="input__field"
                                                        type="email"
                                                        placeholder="輸入你的電子郵件(回覆用)"
                                                        value={email}
                                                        onChange={e => { setEmail(e.target.value) }}
                                                        required />
                                                </label>
                                                <label className="input"><h3>問題：</h3>
                                                    <textarea className="input__field"
                                                        placeholder="你遇到的問題"
                                                        value={question}
                                                        onChange={(e) => { setQuestion(e.target.value) }}
                                                        required
                                                        style={{ 'resize': 'none', 'height': '10em' }} />
                                                </label>
                                                <div className="button-group">
                                                    <button type="submit">Send</button>
                                                </div>
                                            </div>
                                        </article>
                                    </form>
                                </ul>
                            </section>
                        </div>
                        <div className="col-4 col-6-medium col-12-small">
                            <section>
                                <header>
                                    <h2>Q&A 問答集</h2>
                                </header>
                                <ul className="divided">
                                    {typeof (qna) !== 'undefined' && qna.map(data => {
                                        return (
                                            <li><a href={`/Q&A/${data.link}`}>{data.title}</a></li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                        <div className="col-4 col-12-medium">
                            <section>
                                <header>
                                    <h2>社群連結</h2>
                                </header>
                                <ul className="social">
                                    <li><a className="icon brands fa-facebook-f"
                                        href="https://www.facebook.com/tnfshsa"><span
                                            className="label">Facebook</span></a>
                                    </li>
                                    <li><a className="icon brands fa-instagram"
                                        href="https://www.instagram.com/tnfshsa/"><span
                                            className="label">Instagram</span></a></li>
                                </ul>
                                <ul className="contact">
                                    <li>
                                        <h3>地址</h3>
                                        <p>
                                            台南市東區成大里<br />民族路一段1號<br />
                                        </p>
                                    </li>
                                    <li>
                                        <h3>電子郵件</h3>
                                        <p><a href="mailto:tech@tnfsa.org">tech@tnfsa.org</a></p>
                                    </li>

                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    console.log(`${process.env.NEXT_PUBLIC_STATIC}docs/news.json`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_STATIC}docs/news.json`)
    const news = await res.json()
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_STATIC}docs/QnA.json`)
    const qna = await res2.json()
    console.log(`News: ${news}`)
    return {
        props: { news, qna }
    }
}