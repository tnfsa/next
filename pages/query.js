import Title from '../components/Title'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { LinearProgress } from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import LoggedInAlert from '../components/loggedinalert'

export default function Query() {
    const [queryString, setQueryString] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { query } = useRouter()
    useEffect(() => {
        console.log(query)
        getInitial()
        setQueryString(query.q)
        console.log(queryString)
    }, [query])

    async function getInitial() {
        setLoading(true)
        try {
            const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/query`
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    term: queryString
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
            <Title title={`查詢: ${queryString}(最相關)`}
                link={`/query?q=${queryString}`}
            />

            <section id="main">
                <div className="container">
                    <LinearProgress hidden={!loading} />
                    <LoggedInAlert />
                    <div className="p-10 flex flex-wrap items-stretch justify-center gap-x-8 gap-y-10">
                        {data.map(item => {
                            return (
                                <div className="w-80 h-96 shadow-lg rounded-xl" key={item.name}>
                                    <div className="p-4 content-center">
                                        <div className="h-40 w-64 relative">
                                            <Image src={typeof (item.image) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : `${process.env.NEXT_PUBLIC_API_HOST}${item.image}`}
                                                alt={`${item.name}的照片`}
                                                layout="fill" />
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <h1 className="font-semibold text-lg">
                                            {item.name}
                                        </h1>
                                        <h1 className="h-12 font-medium text-gray-500">
                                            {item.description}
                                        </h1>
                                        <Link href={`/purchase/${item.store_id}/${item.id}`}>
                                            <a className="customLink float-right">
                                                Learn More
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}