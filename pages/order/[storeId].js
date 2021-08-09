import Title from "../../components/Title";
import { useRouter } from "next/router";
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link'

import LoggedInAlert from '../../components/loggedinalert'

function Order({ data, name }) {
    const router = useRouter()
    const { storeId } = router.query

    return (
        <div id="page-wrapper">
            <Title title={`餐點瀏覽: ${name}`}
                link={`/order/${storeId}`} />

            <LoggedInAlert />
            <section id="main">
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
                                    <Link href={`/purchase/${storeId}/${item.id}`}>
                                        <a className="customLink float-right">
                                            Learn More
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export async function getStaticProps(context) {
    const page = context.params.storeId
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${page}/products`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const text = await res2.json()

    let name = ""

    for (let index in text) {
        if (text[index].id === page) {
            console.log(text[index])
            name = text[index].name
        }
    }

    return {
        props: { data, name }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const posts = await res.json()

    return {
        paths: posts.map((data) => (`/order/${data.id}`)),
        fallback: false
    }
}

export default Order