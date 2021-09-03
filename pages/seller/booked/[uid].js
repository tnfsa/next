import { useEffect, useState } from 'react'
import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core'
import { faCheck, faTimes, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
//deprecated
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DetailBooked() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [productName, setProductName] = useState('')
    const cookies = new Cookies()
    const allcookies = cookies.getAll()
    const storeId = cookies.get('store_id')
    const [changes, setChanges] = useState(0)
    const router = useRouter()
    const uid = router.query["uid"]
    const transactions = async () => {
        console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/transactions`)
        let result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/transactions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${allcookies['session']}`
            }
        })
        const json = await result.json()
        let toReturn = []

        for (const index in json) {
            if (json[index]['product_id'] === uid) {
                toReturn.push(json[index])
            }
        }

        return toReturn
    }

    const getName = async () => {
        console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`)
        let result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${allcookies['session']}`
            }
        })
        const json = await result.json()
        let foodName = 'temp'

        for (const index in json) {
            if (json[index]['id'] === uid) {
                foodName = json[index]['name']
                break;
            }
        }

        return foodName
    }

    const getInfo = async () => {
        try {
            const result = await Promise.all([transactions(), getName()])

            setLoading(false)
            setProductName(result[1])
            setData(result[0])
            setChanges(0)
            console.log(result[0])
        } catch (err) {
            window.alert(err)
            await Swal.fire({
                icon: 'error',
                title: '讀取錯誤',
                text: err
            })
            await router.push('/')
        }
    }

    function finished(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'OK').then(() => {
            setChanges(changes + 1)
        })
    }

    function preparing(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'PREPARE').then(() => {
            setChanges(changes + 1)
        })
    }

    function taken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'DONE').then(() => {
            setChanges(changes + 1)
        })
    }

    function notaken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'NOTAKEN').then(() => {
            setChanges(changes + 1)
        })
    }

    const sendStatus = async (url, status) => {
        let flag = null
        try {
            const rawData = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${allcookies['session']}`
                },
                body: JSON.stringify({
                    'status': status
                })
            })
            const parsed = await rawData.json()
            console.log(parsed)
            if (rawData.ok) {
                flag = true
            } else {
                flag = false
            }
        } catch (err) {
            window.alert(`狀態更新失敗：${err}`)
            flag = false
        }
        return flag
    }

    useEffect(() => {
        console.log(uid)
        getInfo()

        // eslint-disable-next-line
    }, [changes])

    return (
        <div id="page-wrapper">
            <Title title={`詳細資料-${productName}`}
                link={`/seller/booked/${uid}`} />
            <Authenticate seller="true" />
            <section id="main">
                {loading &&
                    <center><Spinner animation={"border"} /></center>
                }
                <div className="px-10 py-5 space-y-5">
                    {
                        data ? data.map((item) => (
                            <div className="flex flex-row bg-white h-40 justify-between px-10 py-2">
                                <div className="">
                                    <h1>交易編號：{item.id}</h1>
                                    <p>備註：{item.comment}</p>
                                </div>
                                <div className="flex flex-col self-center space-y-1">
                                    <div className="flex space-x-2">
                                        <h1 className="">準備中</h1>
                                        <Button
                                            variant="contained"
                                            color={item.status === 'PREPARE' ? 'secondary' : ''}
                                            className="space-x-5"
                                            onClick={() => {
                                                preparing(item.id)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <h1 className="">可取餐</h1>
                                        <Button
                                            variant="contained"
                                            color={item.status === 'OK' ? 'primary' : ''}
                                            onClick={() => {
                                                finished(item.id)
                                            }}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <h1 className="">已取餐</h1>
                                        <Button
                                            variant="contained"
                                            color={item.status === 'DONE' ? 'primary' : ''}
                                            onClick={() => {
                                                taken(item.id)
                                            }}>
                                            <FontAwesomeIcon icon={faUserCheck} />
                                        </Button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <h1 className="">拒收</h1>
                                        <Button
                                            variant="contained"
                                            color={item.status === 'NOTAKEN' ? 'secondary' : ''}
                                            onClick={() => {
                                                notaken(item.id)
                                            }}>
                                            <FontAwesomeIcon icon={faUserSlash} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : <React.Fragment><br /><h2 style={{ textAlign: 'center' }}>查無資料</h2></React.Fragment>
                    }
                </div>
            </section>
        </div>
    )
}

export async function getStaticProps(context) {
    const uid = context.params.uid
    return {
        props: { uid }
    }
}

async function getFoods(storeId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`)
    const result = await res.json()
    return result.map(food => (`/${food.id}`))
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`)
    const response = await res.json()
    const fetchingFoods = response.map(store => (getFoods(store.id)))

    const mixed = await Promise.all(fetchingFoods)
    let paths = []
    for (const item of mixed) {
        for (const route of item) {
            paths.push(`/seller/booked${route}`)
        }
    }

    return {
        paths,
        fallback: false
    }
}