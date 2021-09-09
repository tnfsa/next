import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Echo from 'laravel-echo'

//deprecated
import { Button, Card, Spinner } from "react-bootstrap";

function Service() {
    const [loading, setLoading] = useState(true)
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({})
    const [newOrder, setNewOrder] = useState(false);

    const cookies = new Cookies()
    const session = cookies.get('session')
    const storeId = cookies.get('store_id')
    useEffect(() => {
        /*init(); //websocket not working
        getMe();
        window.newMessage = false*/
        getData()
        const id = setInterval(() => {
            getData();
        }, 5000)
        return () => clearInterval(id);
        // eslint-disable-next-line
    }, [])

    function init() {
        window.Pusher = require('pusher-js')

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.NEXT_PUBLIC_WS_KEY,
            wsHost: process.env.NEXT_PUBLIC_WS_HOST,
            wsPath: process.env.NEXT_PUBLIC_WS_PATH,
            wsPort: process.env.NEXT_PUBLIC_WS_PORT,
            disableStats: true,
            forceTLS: false,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/broadcasting/auth`, {
                            method: 'POST',
                            body: JSON.stringify({
                                "socket_id": socketId,
                                "channel_name": channel.name
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cookies.get('session')}`
                            }
                        }).then(response => {
                            return response.json()
                        }).then(r => {
                            callback(false, r.data)
                        }).catch(error => {
                            callback(true, error)
                        })
                    }
                }
            }
        })
    }


    function handleWebsockets(e) {
        console.log(e)
        new Notification(`${e.transaction.id} ${e.transaction?.product?.name}`);
        enqueueSnackbar(`新增: (${e.transaction?.product?.id.substring(0, 5)}) ${e.transaction?.product?.name} ${e.transaction?.qty}份`, 'success');
    }

    async function getMe() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session}`
            }
        })
        const response = await res.json()
        window.Echo.private(`user.${response.id}`).listen('.transaction.created', handleWebsockets);
    }

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/simpleTransactions`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session}`
                }
            })
            const response = await res.json()
            //window.data = response
            console.log(response)
            if (data === response) {
                setNewOrder = true;
            }
            setData(response)
            setLoading(false)
        } catch {
            // wrong request or expired session
            // redirect to main page
            await Swal.fire({
                icon: 'error',
                title: '網路錯誤',
                text: '請檢察連線狀況或重新整理此頁'
            })
            //await router.push('/')
        }
    }

    function requestNotification() {
        if (Notification && Notification.permission === "granted") {
            new Notification("測試通知");
        } else if (Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
                if (status === "granted") {
                    new Notification("測試通知");
                } else {
                    alert("你不開通知我也不能提醒你");
                }
            });
        } else {
            alert("你不開通知我也不能提醒你");
        }
    }

    return (
        <div id="page-wrapper">
            <Title title="出餐"
                link="/seller/booked" />
            <Authenticate seller="true" />
            {newOrder &&
                <div>
                    有新訂單
                </div>
            }
            <section id="main">
                {loading &&
                    <center><Spinner animation="border" /></center>
                }
                <div className="p-5">
                    {/*<Button onClick={requestNotification}>提醒我</Button>*/}
                    {
                        data ? Object.keys(data).map((item) =>
                            <Card key={item}>
                                <Card.Body style={{ display: "flex" }}>
                                    <div>
                                        <Card.Title>{data[item].name}</Card.Title>
                                        <Card.Text>{data[item].total}份</Card.Text>
                                    </div>
                                    <div style={{ marginLeft: "auto" }}>
                                        <Link href={`/seller/booked/${item}`} passHref><Button variant="primary">立即查看</Button></Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : <><br /><h2 className="text-center">查無資料</h2></>
                    }
                    <hr />
                </div>
            </section>
        </div>
    )
}

export default function Viewbooked() {
    return (
        <SnackbarProvider maxSnack={3}
            action={(key) => (
                <Button onClick={() => {
                    router.reload()
                }} variant={"dark"}>
                    重新載入
                </Button>
            )}
        >
            <Service />
        </SnackbarProvider>
    );
}