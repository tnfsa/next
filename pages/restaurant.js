import Title from '../components/Title'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Grid } from '@material-ui/core'

function Restaurant({ data }) {
    const [loggedIn,setLoggedIn] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('account_type') === null) {
            setLoggedIn(false)
        }
    }, [])

    return (
        <div id="page-wrapper">
            <Title title="餐廳"
                link="/restaurant" />
            {!loggedIn &&
                <div className="notification">
                    <h1>點餐請先登入</h1>
                </div>
            }
            <section id="main">
                <div className="container">
                    {typeof (data) === "undefined" ?
                        <article className="box post">
                            <h2><center>查無資料</center></h2>
                        </article>
                        :
                        <Grid container justifyContent="center" spacing={2}>
                            {data.map((data) => {
                                return (
                                    <Grid item key={data.name}>
                                        <div className="custombox">
                                            <div className="cardPhoto">
                                                <Image src={typeof (data.picUrl) === "undefined" ? "https://database.tnfsa.org/images/pic01.jpg" : data.picUrl}
                                                    alt={`商家-${data.name}-的照片`}
                                                    layout="responsive"
                                                    width="100"
                                                    height="60" />
                                            </div>
                                            <div className="container">
                                                <header>
                                                    <h2>{data.name}</h2>
                                                    <p>{data.description}</p>
                                                </header>
                                                <footer>
                                                    <ul className="actions">
                                                        <li><Link href={`/order/${data.id}`}><a className="button">立即查看</a></Link></li>
                                                    </ul>
                                                </footer>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const data = await res.json()

    return {
        props: { data }
    }
}

export default Restaurant