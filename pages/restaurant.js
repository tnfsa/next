import Title from '../components/Title'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import LoggedInAlert from '../components/loggedinalert'

function Restaurant({ data }) {
    return (
        <div id="page-wrapper">
            <Title title="餐廳"
                link="/restaurant" />

            <LoggedInAlert />
            <section id="main">
                <div className="container">
                    {typeof (data) === "undefined" ?
                        <article className="box post">
                            <h2><center>查無資料</center></h2>
                        </article>
                        :
                        <div className="flex md:space-x-5 flex-col md:flex-row space-y-5 md:space-y-0 items-center justify-center">
                            {data.map((data) => {
                                return (
                                    <Cell data={data} />
                                )
                            })}
                        </div>
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

function Cell(props) {
    const data = props.data;
    return (
        <div className="bg-white p-3 rounded-lg w-80" key={data.name}>
            <div className="p-4 content-center">
                <div className="h-40 w-64 relative">
                    <Image src={typeof (data.image) === "undefined" ? "https://database.tnfsa.org/images/pic01.jpg" : `${process.env.NEXT_PUBLIC_API_HOST}${data.image}`}
                        alt={`${data.name}的照片`}
                        layout="fill" />
                </div>
            </div>

            <div className="p-3">
                <header>
                    <h2 className="font-semibold text-xl">{data.name}</h2>
                    <p className="text-md text-gray-200">{data.description}</p>
                </header>
                <footer>
                    <ul className="actions">
                        <li><Link href={`/order/${data.id}`} passHref><a className="button">立即查看</a></Link></li>
                    </ul>
                </footer>
            </div>
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