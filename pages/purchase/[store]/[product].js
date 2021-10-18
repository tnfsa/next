import Title from "../../../components/Title";
import Footer from '../../../components/Footer'
import { useRouter } from "next/router";
import { useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import Authenticate from "../../../components/authenticate";
import Image from 'next/image'
import CustomDatePicker from "../../../components/time/CustomDatePicker";
import { add, set } from "date-fns"

import { useDispatch } from "react-redux";
import { cart_setInstant, cart_setFrom } from '../../../redux/actions'

function Purchase({ data, storeName }) {
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const timeOptions = [10, 11, 12]
    const [datePicked, setDatePicked] = useState("none")
    const dispatch = useDispatch()

    let temp_time = add(new Date(), {
        days: 1
    })

    temp_time = set(temp_time, {
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [order_time, setOrderTime] = useState(temp_time);
    const router = useRouter()
    const { store, product } = router.query

    async function Send() {
        if (datePicked === "none") {
            await Swal.fire({
                icon: "error",
                title: "請選擇時間"
            })
            return
        }
        const confirmText =
            `請確認您的訂購資訊
名稱：${data.name}
售價：${data.price}
其他建議：${comment}
按 OK 送出；cancel 取消`
        if (window.confirm(confirmText)) {
            setLoading(true)
            const submit_time = add(order_time, {
                hours: datePicked
            })
            console.log(submit_time)
            dispatch(cart_setFrom({
                from: "instant"
            }))
            dispatch(cart_setInstant({
                store_id: store,
                store_name: storeName,
                product_id: product,
                product_name: data.title,
                qty: 1,
                order_time: submit_time.toISOString(),
                options: {},
                comment,
            }))
            setLoading(false)
            router.push('/submit')
        }
    }

    function setTimeSelected(obj) {
        if (obj === undefined)
            return

        setDatePicked(obj.target[obj.target.options.selectedIndex].value)
    }

    return (
        <div id="page-wrapper">
            <Title title={`${storeName}-${data.name}`}
                link={`/purchase/${store}/${product}`} />
            <Authenticate option="student" redirect={`/purchase/${store}/${product}`} />
            <section id="main">
                <div className="px-3 md:px-12 py-2">
                    <div className="flex flex-col bg-blue-100 rounded-xl p-16 items-center md:justify-center md:flex-row md:items-center md:space-x-16">
                        <div className="rounded-full">
                            <div className="h-72 w-64 relative">
                                <Image src={typeof (data.image) !== "string" ? `${process.env.NEXT_PUBLIC_STATIC}/not_selected.png` : data.image}
                                    alt={`${data.name} from ${storeName}`}
                                    layout="responsive"
                                    height="100"
                                    width="100"
                                    className="rounded-3xl" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 w-full md:w-1/3">
                            <p className="text-4xl font-semibold">
                                {data.name}
                            </p>
                            <p className="text-xl">
                                {data.description}
                            </p>
                            <p className="text-lg">
                                建議售價：{data.price}元
                            </p>
                            {/*Date and time pickers*/}
                            <CustomDatePicker
                                value={order_time}
                                label="取餐日期"
                                setSelectedTime={time => {
                                    const maxTime = add(new Date(), { days: 7 });
                                    const nowTime = new Date();

                                    if (time < maxTime && time > nowTime) {
                                        setOrderTime(time);
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "請選擇日期時間",
                                            text: "可選擇日期為隔天至七天內"
                                        })
                                    }
                                }}
                            />
                            <br />
                            <div id="timeSelect" className="flex flex-col space-y-2">
                                <label className="text-xs"> 請選擇點餐時間 </label>
                                <select onChange={setTimeSelected} className="w-44 text-center border-b-2 border-black bg-blue-200 rounded-md text-black font-semibold">
                                    <option className="text-red-300" value="none">請選擇取餐時間</option>
                                    {timeOptions.map(item => (
                                        <option key={item} value={item}>
                                            {item}:00
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/*<CustomTimePicker
                                label="取餐時間"
                                value={order_time}
                                setSelectedTime={time => {
                                    const date = new Date(time);
                                    const nowTime = (date.getTime() + 28800000) % 86400000;
                                    const maxTime = 45000000;
                                    const minTime = 36000000;
                                    console.log(nowTime)
                                    console.log(maxTime)
                                    console.log(minTime)
                                    if (minTime <= nowTime && maxTime >= nowTime) {
                                        setOrderTime(time);
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "請選擇正確時間",
                                            text: "可選擇時間為10點至12點30分"
                                        })
                                    }
                                }}
                            />*/}

                            <br />

                            <textarea className="resize-none text-gray-700 font-light p-1 h-32 w-full md:w-60"
                                placeholder="備註："
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }} />
                            <br />
                            <div id="buttons">
                                {loading ?
                                    <div id="loading" className="justify-center">
                                        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-red-600 cursor-not-allowed" disabled>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            請稍候
                                        </button>
                                    </div>
                                    :
                                    <div id="buttons" className="flex justify-between">
                                        <div>
                                            <Link href={`/order/${store}`} passHref>
                                                <button className="p-2 rounded-2xl text-lg bg-red-500 hover:bg-red-700 font-bold text-white inline-block">
                                                    回上一頁
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            <button className="p-2 rounded-2xl text-lg bg-blue-500 hover:bg-blue-700 font-bold text-white inline-block"
                                                onClick={Send}>
                                                立即購買
                                            </button>
                                        </div>
                                    </div>
                                }
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

    let stores = []

    if (process.env.NEXT_PUBLIC_DEVELOPEMENT === "TRUE") {
        let garbage = posts.map(item => {
            stores.push(getStores(item.id))
        })
    } else {
        let garbage = posts.map(item => {
            if (item.name !== "bananaTiger") {
                stores.push(getStores(item.id))
            }
        })
    }

    const result = await Promise.all(stores)
    let paths = []

    let garbage = result.map(item => {
        item.map(thing => {
            paths.push(`/purchase/${thing}`)
        })
    })

    return {
        paths: paths,
        fallback: false
    }
}

export default Purchase