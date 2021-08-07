import Title from "../components/Title";
import { Grid, IconButton, LinearProgress } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Footer from '../components/Footer'
import Cookies from 'universal-cookie'
import Swal from "sweetalert2";
import { useRouter } from 'next/router'
import QRCode from 'qrcode.react'

export default function History() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()
    const router = useRouter()

    async function Update() {
        try {
            const fetchURL = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions'
            setLoading(true);
            const res = await fetch(fetchURL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${cookies.get('session')}`
                }
            })
            let response = await res.json()

            console.log(response.sort((a, b) => {
                return (
                    new Date(b.updated_at) - new Date(a.updated_at)
                )
            }))

            setTransaction(response)
            setLoading(false)
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '伺服器忙線中',
                text: err
            })
        }
    }
    async function setNewRate(val, id) {
        console.log(`val: ${val}; id: ${id}`)
        setLoading(true)
        try {
            const fetchURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions/${id}/rate`
            const res = await fetch(fetchURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('session')}`
                }, body: JSON.stringify({
                    rate: val
                })
            })
            const response = await res.json()
            console.log(response)
            Update()
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '更新失敗',
                text: err
            })
        }
    }

    useEffect(() => {
        const status = typeof (cookies.get('session'))
        if (status === "undefined") {
            Swal.fire({
                icon: 'error',
                title: "請先登入"
            }).then(() => {
                router.push('/')
            })
        } else {
            Update()
        }
    }, [])
    return (
        <div id="page-wrapper">
            <Title title="訂購紀錄"
                link={`/history`} />

            <section id="main">
                <div className="p-10">
                    <LinearProgress hidden={!loading} />
                    <div className="space-y-5">
                        {
                            transaction && transaction.length > 0 && transaction.map((item) =>
                                <div className="md:flex rounded-lg" key={item.id}>
                                    <div className="bg-white md:w-1/2 justify-center p-3 shadow-md space-y-2">
                                        <div className="space-y-2 text">
                                            <h1>商品名稱：{item.product.name}</h1>
                                            <h1>金額：{item.total}</h1>
                                            <h1>留言：{typeof (item.comment) === "undefined" || item.comment === null ? '' : (item.comment.length > 50 ? item.comment.slice(0, 50) + ' ...' : item.comment)}</h1>
                                            <h1>購買日期：{new Date(item.updated_at).toLocaleString('zh-TW')}</h1>
                                            <h1>訂單編號：<b>{item.id.substring(0, 8)}</b>{item.id.substr(8)}</h1>
                                        </div>

                                        <div className="flex content-center justify-center">
                                            <div className="my-2">
                                                <Rating name="rating" value={parseFloat(item.rating)}
                                                    onChange={e => setNewRate(e.target.value, item.id)} />
                                            </div>
                                            <div>
                                                <IconButton
                                                    onClick={() => setNewRate(-1, item.id)}
                                                ><Delete size="small" className="fill-current text-red-600 hover:text-red-700"/></IconButton>
                                            </div>
                                        </div>


                                    </div>
                                    <div className=" bg-white md:w-1/2 justify-center p-2 shadow-md space-y-2">
                                        <center>
                                            <div>
                                                <p1 className="text-5xl">
                                                    {item.id.substring(0, 8)}
                                                </p1>
                                            </div>
                                        </center>
                                        <center>
                                            <div>
                                                <QRCode value={item.id.substring(0, 8)} />
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
