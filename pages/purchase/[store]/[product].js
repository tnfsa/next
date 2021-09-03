import Title from "../../../components/Title";
import Footer from '../../../components/Footer'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import * as ga from '../../../components/GA'

function Purchase({ data, storeName }) {
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { store, product } = router.query
    const cookies = new Cookies()

    async function Send() {
        const confirmText =
            `請確認您的訂購資訊
名稱：${data.name}
售價：${data.price}
其他建議：${comment}
按 OK 送出；cancel 取消`
        if (window.confirm(confirmText)) {
            setLoading(true)
            try {
                const date = new Date();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions`, {
                    method: 'POST',
                    body: JSON.stringify({
                        'name': data.title,
                        'qty': 1,
                        'store_id': store,
                        'product_id': product,
                        'comment': comment,
                        'order_time': date.toISOString(),
                        'options': {}
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.get('session')}`
                    }
                })
                const response = await res.json()
                console.log(`Response: ${response}`)
                if (res.ok) {
                    ga.event({
                        action: 'purchase', params: {
                            store_name: storeName,
                            item_name: data.name,
                            price: data.price,
                            qty: 1,
                        }
                    })
                    setLoading(false)
                    await Swal.fire({
                        title: '訂購成功',
                        html: (
                            `感謝您利用本系統訂購產品<br>` +
                            `請記得於選取時間取餐，謝謝<br>` +
                            `您的交易ID為： <b>${response.id}</b>`),
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    await router.push('/')
                } else {
                    throw await res.text()
                }
            } catch (err) {
                setLoading(false)
                await Swal.fire({
                    title: '錯誤!',
                    text: `${err}\n與伺服器連線錯誤，請再試一次\n如果問題無法解決，請聯絡管理員\n訂單未成立`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                await router.push('/')
            }
        }
    }

    useEffect(() => {
        if (typeof (cookies.get('session')) === "undefined") {
            router.prefetch('/')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '請先登入',
            }).then(() => {
                router.push('/')
            })
        }
        if (cookies.get('account_type') === '2') {
            router.prefetch('/')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '此功能商家無法使用',
            }).then(() => {
                router.push('/')
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div id="page-wrapper">
            <Title title={`${storeName}-${data.name}`}
                link={`/purchase/${store}/${product}`} />

            <section id="main">
                <div className="container">
                    <div className="flex flex-col bg-blue-100 rounded-xl p-16 items-center md:justify-center md:flex-row md:items-center md:space-x-16">
                        <img className="rounded-full"
                            src={`${process.env.NEXT_PUBLIC_API_HOST}${data.image}`}
                            alt={`${data.name} from ${storeName}`} />
                        <div className="space-y-3">
                            <p className="text-4xl font-semibold">
                                {data.name}
                            </p>
                            <p className="text-xl h-20">
                                {data.description}
                            </p>
                            <p className="text-lg">
                                建議售價：{data.price}元
                            </p>
                            <textarea className="resize-none text-gray-700 font-light p-1 h-32 w-44 md:w-60"
                                placeholder="備註："
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }} />
                            <br />
                            <div>
                                {loading ||
                                    <button className="float-left p-2 rounded-2xl text-lg bg-pink-500 hover:bg-pink-700"
                                        href={`/order/${store}`}>
                                        回上一頁
                                    </button>
                                }
                                {loading ||
                                    <button className="float-right p-2 rounded-2xl text-lg bg-blue-500 hover:bg-blue-700"
                                        onClick={Send}>
                                        立即購買
                                    </button>
                                }
                                {loading &&
                                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-red-600 cursor-not-allowed" disabled>
                                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        請稍候
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}







export async function getStaticProps(context) {
    const store = context.params.store
    const product = context.params.product
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${store}/products/${product}`
    console.log(url)
    const res = await fetch(url, {
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

    let storeName = ""

    for (let index in text) {
        console.log(`Id: ${text[index].id}、${store}`)
        if (text[index].id === store) {
            console.log(text[index])
            storeName = text[index].name
            break;
        }
    }

    return {
        props: { data, storeName }
    }
}

async function getStores(store) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${store}/products`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    return data.map(item => (`${store}/${item.id}`))
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const posts = await res.json()
    let stores = posts.map(item => (getStores(item.id)))
    const result = await Promise.all(stores)
    let paths = []
    let garbage = result.map(item => {
        item.map(thing => {
            console.log(thing)
            paths.push(`/purchase/${thing}`)
        })
    })

    return {
        paths: paths,
        fallback: false
    }
}

export default Purchase