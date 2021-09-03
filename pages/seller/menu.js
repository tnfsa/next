import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link'
//deprecated
import { Card, Button } from 'react-bootstrap'

export default function Service() {
    const [data, setData] = useState([])
    const [quota, setQuota] = useState(0)
    const cookies = new Cookies()
    const allcookies = cookies.getAll()
    const router = useRouter()
    const storeId = allcookies['store_id']
    const session = cookies.get('session')
    if (typeof (storeId) === "undefined") {
        Swal.fire({
            title: '錯誤!',
            text: '404 (STORE_NOT_FOUND)',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`)
            const response = await res.json()
            console.log(response)
            setData(response)

            const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/promotion_quota`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${session}`
                }
            })
            const response2 = await res2.json()
            console.log(`Remaining: ${response2.remain}`)
            setQuota(response2.remain)
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '與伺服器連線錯誤',
                text: err
            })
            await router.push
        }
    }

    async function promote() {
        const result = await Swal.fire({
            title: '確認',
            text: '確定要將宣傳點數用於這個商品嗎？',
            showCancelButton: true,
            confirmButtonText: '確定'
        })
        if (result.isConfirmed) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${storeId}/promotion`, {
                method: 'POST',
                body: JSON.stringify({
                    "type": "WEIGHT"
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const response = await res.json()
            console.log(response)
            if (response.status === 'error') {
                await Swal.fire({
                    title: "錯誤!",
                    text: "伺服器錯誤(" + r.error.message + ")",
                    icon: "error"
                })
            } else {
                await Swal.fire({
                    title: "成功!",
                    text: "權重增加成功",
                    icon: "success"
                })
            }
        }
    }

    async function reRender(){
        fetch("https://api.vercel.com/v1/integrations/deploy/prj_KyaS954VKb83sq0OdVUkuIRIlSwL/fgdOuE9WfG");
        await Swal.fire({
            icon: "info",
            title: "請求已送出"
        })
    }

    return (
        <div id="page-wrapper">
            <Title title="變更菜單"
                link="/seller/menu" />

            <Authenticate seller="true" />
            <section id="main">
                <div className="p-5">
                    <div className="bg-white p-2">
                        <ul className="flex flex-row items-start">
                            <div className="float-left">
                                <li><Link href="/seller/menu/new" passHref>
                                    <button className="bg-green-300 p-1 hover:bg-green-600 px-2">新增
                                    </button></Link>
                                </li>
                            </div>
                            <div className="float-right">
                                <li classname="float-right">
                                    <button className="bg-yellow-300 p-1 hover:bg-yellow-600 px-2" onClick={()=>{reRender()}}>更新</button>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div id="addedFood">
                        <div style={{ textAlign: "right" }}>剩下的宣傳點數： {quota}點</div>
                        {
                            data && data.length > 0 && data.map((item) =>
                                <Card key={item.id}>
                                    <Card.Img variant="top" src={item.picUrl} />
                                    <Card.Body style={{ display: "flex" }}>
                                        <div>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                        </div>
                                        <div style={{ marginLeft: "auto" }}>
                                            <Button variant="danger" onClick={() => promote(item.id)}>提高排名</Button>
                                        </div>
                                        &nbsp;
                                        <div>
                                            <Link href={`/seller/menu/${item.id}`} passHref><Button variant="primary">修改</Button></Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}