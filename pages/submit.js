import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import Head from 'next/head'
import * as ga from '../components/GA'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { cart_clearInstant } from "../redux/actions"
export default function Submit() {
    const from = useSelector(state => state.cart.from)
    const selected = useSelector(state => state.cart.selected)
    const instant = useSelector(state => state.cart.instant)
    const session = useSelector(state => state.profile.session)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        send()
        async function send() {

            if (session === null)
                router.push('/')
            if (from === "cart") {
                if (Object.keys(selected) === 0) {
                    await ErrorMessage()
                    router.push('/')
                }

                // sending cart products

            } else if (from === "instant") {
                if (instant.product_id === null) {
                    await ErrorMessage()
                    router.push('/')
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions`, {
                        method: 'POST',
                        body: JSON.stringify(instant),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${session}`
                        }
                    })
                    const response = await res.json()
                    console.log("Response:")
                    console.log(response)
                    dispatch(cart_clearInstant())
                    if (res.ok) {
                        ga.event({
                            action: 'purchase',
                            params: {
                                store_id: instant.store_id,
                                product_id: instant.product_id,
                                qty: instant.qty,
                                price: instant.price,
                            }
                        })
                        await success(response.id)
                        router.push('/')
                    } else {
                        switch (response.error.status) {
                            case "TRANSACTION/ORDER-TIME":
                                throw "訂餐時間錯誤!!<br>目前時間為 " + (new Date()).toLocaleString("zh-TW") + "<br>訂餐時間為 " + submit_time.toLocaleString('zh-TW');
                            case "TRANSACTION/BANNED":
                                throw "哈哈你被停權了";
                            default:
                                ga.event({
                                    action: "transaction/failed",
                                    params: {
                                        code: response.error.status
                                    }
                                })
                                throw "訂購失敗，下一次會更好"
                        }
                    }
                } catch (err) {
                    await Swal.fire({
                        title: '錯誤!',
                        html: err,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    windows.history.go(-1)
                }
            }
            // none of the following happened
            router.push('/')
        }
        // eslint-disable-next-line
    }, [])

    async function ErrorMessage() {
        Swal.fire({
            icon: "error",
            title: 'Empty cart',
            text: "what blows you here?"
        })
    }
    async function success(id) {
        await Swal.fire({
            title: '訂購成功',
            html: (
                `感謝您利用本系統訂購產品<br>` +
                `請記得於選取時間取餐，謝謝<br>` +
                `您的交易ID為： <b>${id}</br>`),
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    return (
        <div id="page-wrapper">
            <Head>
                <title key="title">訂單送出中-點餐系統</title>
            </Head>
            <section id="main">
                <div className="text-center">
                    訂單送出中
                </div>
            </section>
        </div>
    )
}