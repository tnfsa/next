import { useEffect, useState } from 'react'
import Title from '../../../../components/Title'
import Authenticate from '../../../../components/authenticate'
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core'
import { faCheck, faTimes, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { add } from "date-fns"
import { useSelector } from 'react-redux'

//deprecated
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function DetailBooked({ productName, option, uid }) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [changes, setChanges] = useState(0)
    const router = useRouter()
    const session = useSelector(state => state.profile.session)
    const storeId = useSelector(state => state.profile.store_id)

    const transactions = async () => {
        let url = ""
        console.log(option)
        if (option === "today") {
            const today = new Date();
            url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/transactions?time=${today.toISOString()}`
        } else if (option === "tomorrow") {
            const next_day = add(new Date(), { days: 1 })
            url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/transactions?time=${next_day.toISOString()}`
        } else {
            url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/transactions`
        }

        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${session}`
            }
        })
        const json = await result.json()
        console.log(json)
        return json
    }

    const getInfo = async () => {
        try {
            const result = await Promise.all([transactions()])

            setLoading(false)
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

    const sendStatus = async (url, status) => {
        try {
            const rawData = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },
                body: JSON.stringify({
                    'status': status
                })
            })
            const parsed = await rawData.json()
            console.log(parsed)
            return rawData.ok
        } catch (err) {
            window.alert(`狀態更新失敗：${err}`)
            return false
        }
    }

    useEffect(() => {
        if(!uid){
            return;
        }
        getInfo()
        // eslint-disable-next-line
    }, [changes,uid])

    return (
        <div id="page-wrapper">
            <Title title={`詳細資料-${productName}`}
                link={`/seller/booked/${uid}`} />
            <Authenticate seller="true" />
            <section id="main">
                {loading &&
                    <center><Spinner animation={"border"} /></center>
                }
                <DateSelected select={option} />
                <div className="px-10 py-5 space-y-5">
                    {
                        data.length > 0 ? data.map((item) => {
                            const startTime = new Date(item.order_time)
                            return (
                                <div className="flex flex-row bg-white h-40 justify-between px-2 md:px-10 py-2" key={item.id}>
                                    <div>
                                        <h1>交易編號：{item.id}</h1>
                                        <h1>訂購數量：{item.qty}</h1>
                                        <h1>金額：{item.total}</h1>
                                        <h1>留言：{typeof (item.comment) === "undefined" || item.comment === null ? '' : (item.comment.length > 50 ? item.comment.slice(0, 50) + ' ...' : item.comment)}</h1>
                                        <h1>購買日期：{new Date(item.updated_at).toLocaleString('zh-TW')}</h1>
                                        <h1>取餐時間：{new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000)).toLocaleString("zh-TW")}</h1>
                                    </div>
                                    <div className="flex flex-col self-center space-y-1">
                                        <CustomButton1 sendStatus={sendStatus} setChanges={setChanges} changes={changes} item={item} />

                                        <CustomButton2 sendStatus={sendStatus} setChanges={setChanges} changes={changes} item={item} />

                                        <CustomButton3 sendStatus={sendStatus} setChanges={setChanges} changes={changes} item={item} />

                                        <CustomButton4 sendStatus={sendStatus} setChanges={setChanges} changes={changes} item={item} />
                                    </div>
                                </div>
                            )
                        }) : <><br /><h2 className="text-center">無訂餐紀錄</h2></>
                    }
                </div>
            </section >
        </div >
    )
}

function DateSelected(props) {
    return (
        <div className="flex flex-row px-5 py-2 bg-yellow-500 justify-between">
            <button className="w-44 bg-white text-center" disabled>目前狀態：{props.select}</button>
        </div>
    )
}

function CustomButton1(props) {
    const item = props.item;
    function preparing(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        props.sendStatus(url, 'PREPARE').then(() => {
            props.setChanges(props.changes + 1)
        })
    }
    return (
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
    )
}

function CustomButton2(props) {
    const item = props.item;
    function finished(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        props.sendStatus(url, 'OK').then(() => {
            props.setChanges(props.changes + 1)
        })
    }
    return (
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
    )
}

function CustomButton3(props) {
    const item = props.item;
    function taken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        props.sendStatus(url, 'DONE').then(() => {
            props.setChanges(props.changes + 1)
        })
    }
    return (
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
    )
}

function CustomButton4(props) {
    const item = props.item;
    function notaken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        props.sendStatus(url, 'NOTAKEN').then(() => {
            props.setChanges(props.changes + 1)
        })
    }
    return (
        <div className="flex space-x-2">
            <h1 className="">未取餐</h1>
            <Button
                variant="contained"
                color={item.status === 'NOTAKEN' ? 'secondary' : ''}
                onClick={() => {
                    notaken(item.id)
                }}>
                <FontAwesomeIcon icon={faUserSlash} />
            </Button>
        </div>
    )
}

async function getName(uid) {
    let result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/query`, {
        method: 'POST',
        body: JSON.stringify({ term: "" }),
        headers: {
            'Accept': 'application/json'
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


export async function getStaticProps(context) {
    const uid = context.params.uid
    const option = context.params.option
    const productName = await getName(uid)
    return {
        props: { productName, option, uid }
    }
}

export async function getStaticPaths() {
    let paths = [`/seller/booked/uid/option`]

    return {
        paths,
        fallback: true
    }
}