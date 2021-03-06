import Link from 'next/link'
//import Spotlight from "../components/Home/Spotlight"
import Footer from "../components/Footer"
import { useState } from 'react'
import LatestNews from '../components/Home/LatestNews'
import Swal from 'sweetalert2'
import Image from 'next/image'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'

export default function Home({ qna, news }) {
    const session = useSelector(state => state.profile.session)
    
    return (
        <div id="page-wrapper">
            <section id="header">
                <h1><Link href="/">臺南一中點餐系統</Link></h1>
                <section id="banner">
                    <header>
                        <h2>臺南一中</h2>
                        <p>美訂美當點餐系統</p>
                    </header>
                </section>

                <section id="intro" className="container">
                    {/*<div className="flex flex-col md:flex-row items-center">
                        <Spotlight position="first"
                            icon="icon solid featured fa-cog"
                            title="PWA技術加持"
                            context="可於離線時瀏覽此網頁，確保網站迅速不延遲"
                            key="first" />
                        <Spotlight title="方便"
                            context="線上預訂，讓你免於在美廣大排長榮，減少群聚"
                            position="first"
                            icon="icon solid featured alt fa-bolt"
                            key="second" />
                        <Spotlight title="評分系統"
                            context="可以依照自己的想法，向大家提供餐點建議"
                            position="first"
                            icon="icon solid featured alt2 fa-star"
                            key="third" />

    </div>*/}
                    <footer>
                        <br />
                        <ul className="flex justify-center space-x-5">
                            <li>
                                {session !== null ?
                                    <Link href="/restaurant" passHref>
                                        <a className="bg-red-700 hover:bg-red-800 text-xl md:text-3xl px-4 py-2 text-center align-middle inline-block no-underline rounded-md outline-none text-white font-bold">現在開始</a>
                                    </Link>
                                    :
                                    <Link href="/login" passHref>
                                        <a className="bg-red-700 hover:bg-red-800 text-xl md:text-3xl px-4 py-2 text-center align-middle inline-block no-underline rounded-md outline-none text-white font-bold">現在開始</a>
                                    </Link>
                                }
                            </li>
                            <li><a href="https://docs.tnfsa.org/" className="bg-green-700 hover:bg-green-800 text-xl md:text-3xl px-4 py-2 text-center inline-block no-underline rounded-md outline-none text-white font-bold">使用說明</a></li>
                        </ul>
                    </footer>
                </section>

            </section>

            <section id="footer">
                <div className="p-3 space-y-5">
                    <div className="flex flex-col md:flex-row md:items-start items-center">
                        <div className="w-2/3">
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
                                                context={data.context}
                                                key={data.date} />
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                        <div className="md:w-1/3 w-2/3">
                            <section>
                                <header>
                                    <h2>關於這個網站</h2>
                                </header>
                                <div className="p-4 content-center">
                                    <div className="h-40 w-64 relative">
                                        <Image src={`${process.env.NEXT_PUBLIC_STATIC}/images/pic10.jpg`}
                                            alt="帥氣的照片"
                                            layout="fill"
                                            className="rounded-3xl" />
                                    </div>
                                </div>
                                <p>
                                    基於 HTML5 UP 的免費模板、 Vercel、Github 前端資源、TFCIS後端資源，所集結的訂餐網頁。<br />
                                    網頁前端<Link href="https://sivir.pw/">Milliax</Link>、網頁後端<Link
                                        href="https://hsuan.app/">Hsuan1117</Link>
                                    以及Icon提供<Link
                                        href="https://www.facebook.com/profile.php?id=100017341713935">Nody0105</Link>
                                </p>
                                <footer>
                                    <ul className="actions">
                                        <li><Link href="/about" passHref><a className="bg-red-700 hover:bg-red-800 text-lg md:text-3xl px-4 py-2 text-center align-middle inline-block no-underline rounded-md outline-none text-white font-bold">Find out more</a></Link></li>
                                    </ul>
                                </footer>
                            </section>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start p-1">
                        <FeedbackForm />
                        <div className="w-2/3 md:w-1/3 p-1">
                            <section>
                                <header>
                                    <h2>Q&A 問答集</h2>
                                </header>
                                <ul className="divided">
                                    {typeof (qna) !== 'undefined' && qna.map(data => {
                                        return (
                                            <li key={data.link}>
                                                <a href={`/QnA/${data.link}`}>
                                                    {data.title}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                        <div className="w-2/3 md:w-1/3 p-1">
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

function FeedbackForm() {
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
            await Swal.fire({
                icon: 'success',
                title: '傳送成功'
            })
            setName('')
            setEmail('')
            setQuestion('')
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '傳送失敗',
                text: err
            })
        }
    }

    return (
        <div className="w-2/3 md:w-1/3">
            <section>
                <header>
                    <h2>回饋表單</h2>
                </header>
                <ul className="divided p-1">
                    <form onSubmit={e => {
                        e.preventDefault()
                        Send()
                    }}>
                        <article>
                            <div className="p-1">
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
                                <div>
                                    <button className="rounded-xl p-2 bg-blue-500 hover:bg-blue-700 float-right px-4 text-white font-bold text-xl inline-block"
                                        type="submit">Send</button>
                                </div>
                            </div>
                        </article>
                    </form>
                </ul>
            </section>
        </div>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STATIC}/docs/news.json`)
    const news = await res.json()
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_STATIC}/docs/QnA.json`)
    const qna = await res2.json()
    return {
        props: { news, qna }
    }
}