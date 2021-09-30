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
                    {typeof (data) !== "undefined" && data.map(item => {
                        return (
                            <Cell data={item} storeId={storeId} key={item.name} />
                        )
                    })}
                    {Object.keys(data).length === 0 && <h1>無菜單</h1>}
                </div>
            </section>
            <Footer />
        </div>
    )
}

function Cell(props) {
    const item = props.data;
    const storeId = props.storeId;
    console.log(item.image)
    return (
        <div className="w-80 h-96 shadow-lg rounded-xl">
            <div className="p-4 content-center">
                <div className="h-40 w-64 relative">
                    <Image src={typeof (item.image) !== "string" ? `${process.env.NEXT_PUBLIC_STATIC}/not_selected.png` : item.image}
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
                <Link href={`/purchase/${storeId}/${item.id}`} passHref>
                    <a className="float-right bg-blue-400 rounded-xl px-2 py-1 text-xl font-bold text-black hover:text-white hover:bg-blue-600">
                        立即購買
                    </a>
                </Link>
            </div>
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

    let paths = []

    if(process.env.NEXT_PUBLIC_DEVELOPEMENT === "TRUE"){
        const garbage = posts.map((data) => {
                paths.push(`/order/${data.id}`)
        })
    }else{
        const garbage = posts.map((data) => {
            if(data.name !== "bananaTiger"){
                paths.push(`/order/${data.id}`)
            }
        })
    }

    return {
        paths,
        fallback: false
    }
}

export default Order