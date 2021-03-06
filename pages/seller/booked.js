import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { add, set } from "date-fns"

//deprecated
import { Button, Card, Spinner } from "react-bootstrap";
import { useSelector } from 'react-redux';

export default function Service() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [newOrder, setNewOrder] = useState(false);
    const today = set(new Date(), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    })
    const [option, setOption] = useState("today"); //["today" | "tomorrow" | "all"]

    const session = useSelector(state => state.profile.session)
    const storeId = useSelector(state => state.profile.store_id)

    useEffect(() => {
        setLoading(true)
        setNewOrder(false)
        getData()
        const id = setInterval(() => {
            getData();
        }, 5000)
        return () => clearInterval(id);
        // eslint-disable-next-line
    }, [option])

    const getData = async () => {
        try {
            let url = ""
            switch (option) {
                case "today":
                    url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/simpleTransactions?time=${today.toISOString()}`
                    console.log(today.toISOString())
                    break;
                case "tomorrow":
                    const next_day = add(today, {
                        days: 1
                    })
                    console.log(next_day.toISOString())
                    url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/simpleTransactions/?time=${next_day.toISOString()}`
                    break;
                case "all":
                    url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/simpleTransactions`
                    break;
                default:
                    url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/simpleTransactions`
            }
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session}`
                }
            })
            const response = await res.json()
            console.log(response)
            setData(response)
            setLoading(false)
        } catch {
            // wrong request or expired session
            // redirect to main page
            await Swal.fire({
                icon: 'error',
                title: '????????????',
                text: '??????????????????????????????????????????'
            })
        }
    }

    return (
        <div id="page-wrapper">
            <Title title="??????"
                link="/seller/booked" />
            <Authenticate seller="true" />

            <section id="main">
                <DaySelection setOption={setOption} option={option} />
                {newOrder &&
                    <div>
                        ????????????
                        <button onClick={() => { setNewOrder(false) }}>????????????</button>
                    </div>
                }

                {loading &&
                    <center><Spinner animation="border" /></center>
                }

                <div className="p-5">
                    {
                        Object.keys(data).length !== 0 ? Object.keys(data).map((key,index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body style={{ display: "flex" }}>
                                        <div>
                                            <Card.Title>{data[key]['name']}</Card.Title>
                                            <Card.Text>{data[key]['total']}???</Card.Text>
                                        </div>
                                        <div style={{ marginLeft: "auto" }}>
                                            <Link href={`/seller/booked/${key}/${option}`} passHref><Button variant="primary">????????????</Button></Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }) :
                            <>
                                <br />
                                <h2 className="text-center text-3xl">????????????</h2>
                            </>
                    }
                </div>
            </section>
        </div>
    )
}

function DaySelection(props) {
    return (
        <div className="flex flex-row px-5 py-2 bg-yellow-500 justify-between">
            <div className="w-full overflow-hidden">
                <div className="gap-3 w-full flex flex-wrap -m-1 justify-start">
                    <button className="bg-yellow-300 px-3 py-1 focus:bg-blue-300 rounded-lg" onClick={() => { props.setOption("today") }}>??????????????????</button>
                    <button className="bg-yellow-300 px-3 py-1 active:bg-blue-300 rounded-lg" onClick={() => { props.setOption("tomorrow") }}>??????????????????</button>
                    <button className="bg-yellow-300 px-3 py-1 focus:bg-blue-300 rounded-lg" onClick={() => { props.setOption("all") }}>??????????????????</button>
                </div>
            </div>
            <button className="w-44 bg-white text-center" disabled>???????????????{props.option}</button>
        </div>
    )
}