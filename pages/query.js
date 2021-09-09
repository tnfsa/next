import Title from '../components/Title'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { LinearProgress } from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import LoggedInAlert from '../components/loggedinalert'
import queryString from 'query-string'
//import { InsertInvitation } from '@material-ui/icons'

export default function Query() {
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        getInitial();
        // eslint-disable-next-line
    }, [])

    async function getInitial() {
        setLoading(true)
        const queryParsed = queryString.parse(window.location.search)
        const term = queryParsed.q
        setQuery(term)
        try {
            console.log(`查詢: ${term}`)
            const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/query`
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    term
                })
            })
            const fetched = await res.json()
            setData(fetched)
            console.log(fetched)
            setLoading(false)
        } catch (err) {
            await Swal.fire({
                icon: "error",
                title: "伺服器讀取錯誤",
                text: err
            })
            setLoading(false)
            return await router.push('/')
        }
    }

    return (
        <div id="page-wrapper">
            <Title title={`查詢: ${query}(最相關)`}
                link={`/query?q=${query}`}
            />

            <section id="main">
                <div className="container">
                    <LinearProgress hidden={!loading} />
                    <LoggedInAlert />
                    <div className="p-10 flex flex-wrap items-stretch justify-center gap-x-8 gap-y-10">
                        {data.map(item => {
                            return (
                                <Cell item={item} key={item.name}/>
                            )
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

function Cell(props) {
    const item = props.item;
    console.log(item.name);

    return (
        <div className="w-80 h-96 shadow-lg rounded-xl">
            <div className="px-4 pt-4 content-center">
                <div className="h-40 w-64 relative">
                    <Image src={typeof (item.image) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : item.image.split(":")[0] !== "https" ? `${process.env.NEXT_PUBLIC_API_HOST}${item.image}` : item.image}
                        alt={`${item.name}的照片`}
                        layout="fill"
                        className="rounded-3xl" />
                </div>
            </div>
            <div className="py-3 px-5">
                <h1 className="font-semibold text-lg">
                    {item.name}
                </h1>
                <h1 className="h-12 font-medium text-gray-500">
                    {item.description}
                </h1>
                <h1 className="h-6 font-medium text-gray-500">
                    售價：{item.price}
                </h1>
                <Link href={`/purchase/${item.store_id}/${item.id}`} passHref>
                    <a className="float-right bg-blue-400 rounded-xl px-2 py-1 text-xl font-bold text-black hover:text-white hover:bg-blue-600">
                        立即購買
                    </a>
                </Link>
            </div>
        </div>
    )
}