import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link'
//import { getDerivedStateFromError } from 'qrcode.react';
import { LinearProgress } from '@material-ui/core'

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
        // eslint-disable-next-line
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
            await router.push("/")
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

    async function reRender() {
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
                <div className="p-5 space-y-5">
                    <div className="bg-white p-2" key="links">
                        <ul className="flex flex-row items-start">
                            <div className="float-left">
                                <li>
                                    <Link href="/seller/menu/new" passHref>
                                        <button className="text-black  bg-green-300 p-1 hover:bg-green-600 px-3"><label className="text-black">新增</label></button>
                                    </Link>
                                </li>
                            </div>
                            <div className="float-right">
                                <li className="float-right">
                                    <button className=" bg-yellow-300 p-1 hover:bg-yellow-600 px-3 " onClick={() => { reRender() }}><label className="text-black">更新</label></button>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div id="addedFood" key="foods">
                        {/*<div style={{ textAlign: "right" }}>剩下的宣傳點數： {quota}點</div>*/}
                        {
                            data && data.length > 0 && data.map((item) =>
                                <Cell item={item} promote={promote} storeId={storeId} session={session} reload={() => { getData() }} key={item.id}/>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

function Cell(props) {
    const [loading, setLoading] = useState(false)
    const item = props.item;

    async function delete_product() {
        const result = await Swal.fire({
            icon: 'warning',
            showCancelButton: true,
            text: "此操作將無法復原",
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            title: `刪除餐點-${item.name}`,
        })
        if (result.isConfirmed) {
            setLoading(true);
            try {
                console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${props.storeId}/products/${item.id}`)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${props.storeId}/products/${item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${props.session}`
                    }
                })
                if (res.ok) {
                    await Swal.fire({
                        icon: 'success',
                        title: '刪除成功',
                        text: '請記得重新渲染頁面'
                    })
                    props.reload()
                }
            } catch (err) {
                await Swal.fire({
                    icon: 'error',
                    title: '刪除失敗',
                    text: err
                })
            }
            setLoading(false);
        }
    }

    return (
        <Card>
            {loading &&
                <LinearProgress />
            }
            <Card.Img variant="top" src={item.picUrl} />
            <Card.Body style={{ display: "flex" }}>
                <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                </div>
                {/*<div style={{ marginLeft: "auto" }}>
                    <Button variant="danger" onClick={() => props.promote(item.id)}>提高排名</Button>
                </div>
    &nbsp;*/}
                <div style={{ marginLeft: "auto" }}>
                    <Button variant="danger" onClick={() => delete_product(item.id)}>刪除</Button>
                </div>
                &nbsp;
                <div>
                    <Link href={`/seller/menu/${item.id}`} passHref><Button variant="primary">修改</Button></Link>
                </div>
            </Card.Body>
        </Card>
    )
}