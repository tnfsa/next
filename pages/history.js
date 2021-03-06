import Title from "../components/Title";
import { IconButton, LinearProgress } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Footer from '../components/Footer'
import Swal from "sweetalert2";
import QRCode from 'qrcode.react'
import Authenticate from '../components/authenticate'
import { useSelector } from "react-redux";

export default function History() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlight, setHightLight] = useState(false);
    const [today, setToday] = useState([]);
    
    const session = useSelector(state => state.profile.session)

    async function Update() {
        try {
            const fetchURL = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions'
            setLoading(true);
            const res = await fetch(fetchURL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session}`
                }
            })
            let response = await res.json()
            console.log(response)
            response.sort((a, b) => {
                return (
                    new Date(b.order_time) - new Date(a.order_time)
                )
            })

            let todayDate = new Date().getTime()
            todayDate = Math.ceil(todayDate / 86400000)
            
            let countingOnly = []

            console.log(response);

            for (let i = response.length - 1; i >= 0; --i) {
                let date = new Date(response[i].order_time).getTime()
                date = Math.ceil(date /= 86400000)

                if (date < todayDate) {
                    break;
                }

                if (date === todayDate) {
                    countingOnly.push(response[i]);
                    setHightLight(true);
                    delete response[i];
                }
            }
            console.log(countingOnly);
            console.log(response);

            setToday(countingOnly);
            setTransaction(response)
            setLoading(false)
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '??????????????????',
                text: err
            })
        }
    }

    useEffect(() => {
        const status = typeof (session)
        if (status !== "undefined") {
            Update()
        }
        // eslint-disable-next-line
    }, [])

    

    return (
        <div id="page-wrapper">
            <Authenticate />
            <Title title="????????????"
                link={`/history`} />

            <section id="main">
                <div className="p-10">
                    <LinearProgress hidden={!loading} />
                    <div className="space-y-5">
                        {
                            loading || highlight ?
                                <div className="border border-indigo-600 br-blue-100">
                                    {/*Booked today*/}
                                    {highlight && today.map((item)=>{
                                        return(
                                            <List item={item} update={Update} key={item.id} session={session}/>
                                        )
                                    })}
                                </div>
                                :
                                <div className="border border-indigo-600 bg-red-100">
                                    {/*No product booking today*/}
                                    {/*<h1 className="text-2xl text-center">??????????????????</h1>*/}
                                </div>
                        }
                        {
                            transaction && transaction.length > 0 && transaction.map((item) => {
                                return (
                                    <List item={item} update={Update} key={item.id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

function List(props) {
    const [loading, setLoading] = useState(false);
    const item = props.item;
    

    async function setNewRate(val, id, index = null) {
        console.log(`val: ${val}; id: ${id};index: ${index}`)
        setLoading(true)
        try {
            const fetchURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions/${id}/rate`
            const res = await fetch(fetchURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.session}`
                }, body: JSON.stringify({
                    rate: val
                })
            })
            const response = await res.json()
            console.log(response)
            props.update()
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '????????????',
                text: err
            })
        }
        setLoading(false);
    }
    const startTime = new Date(item.order_time);
    console.log("ordered")
    console.log(startTime.getTimezoneOffset())
    return (
        <div className="md:flex rounded-lg">
            <LinearProgress hidden={!loading} />
            <div className="bg-white md:w-1/2 justify-center p-3 shadow-md space-y-2">
                <div className="space-y-2 text">
                    <h1>???????????????{item.product.name}</h1>
                    <h1>???????????????{item.qty}</h1>
                    <h1>?????????{item.total}</h1>
                    <h1>?????????{typeof (item.comment) === "undefined" || item.comment === null ? '' : (item.comment.length > 50 ? item.comment.slice(0, 50) + ' ...' : item.comment)}</h1>
                    <h1>???????????????{new Date(item.created_at).toLocaleString('zh-TW')}</h1>
                    <h1>???????????????{new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000)).toLocaleString("zh-TW")}</h1>
                    <h1>???????????????<b>{item.id.substring(0, 8)}</b>{item.id.substr(8)}</h1>
                    <h1>???????????????{item.status === "PREPARE" && "?????????"} {item.status === "OK" && "?????????"}  {item.status === "DONE" && "?????????"} {item.status === "NOTAKEN" && "??????"}</h1>
                </div>

                <div className="flex content-center justify-center">
                    <div className="my-2">

                        <Rating
                            value={parseFloat(item.rating)}
                            onChange={(event, newValue) => {
                                setNewRate(newValue, item.id)
                            }}
                        />
                    </div>
                    <div>
                        <IconButton
                            onClick={() => setNewRate(-1, item.id, index)}
                        ><Delete size="small" className="fill-current text-red-600 hover:text-red-700" /></IconButton>
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
                        <QRCode value={item.id} />
                    </div>
                </center>
            </div>
        </div>
    )
}
