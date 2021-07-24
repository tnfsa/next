import Title from '../components/Title'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { LinearProgress } from '@material-ui/core'

export default function Query() {
    const [queryString, setQueryString] = useState('')
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)
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
            console.log(url)
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    term: queryString
                })
            })
            const fetched = await res.json()
            setData(fetched)
            setLoading(false)
        }catch(err){
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "伺服器讀取錯誤"
            })
            setLoading(false)
            return await router.push('/')
        }
    }

    return (
        <div id="page-wrapper">
            <Title title={`查詢: ${queryString}`}
                link={`/query?q=${queryString}`}
            />

            <section id="main">
                <div className="container">
                <LinearProgress hidden={!loading}/>
                    {typeof (data) === "undefined" ?
                        <article className="box post">
                            <h2><center>查無資料</center></h2>
                        </article>
                        :
                        data.map((data) => {
                            return (
                                <article className="box post">
                                    <div className="image featured">
                                        <img src={typeof (data.picUrl) === "undefined" ? "https://database.tnfsa.org/images/pic01.jpg" : data.picUrl}
                                            alt={`商家-${data.name}-的照片`} />
                                    </div>
                                    <header>
                                        <h2>{data.name}</h2>
                                        <p>{data.description}</p>
                                    </header>
                                    <footer>
                                        <ul className="actions">
                                            <li><a href={`/order/${data.id}`} className="button">立即前往</a></li>
                                        </ul>
                                    </footer>
                                </article>
                            )
                        })
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}