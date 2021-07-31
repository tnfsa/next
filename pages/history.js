import Title from "../components/Title";
import {Grid, IconButton, LinearProgress} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {Delete} from "@material-ui/icons";
import {useEffect,useState} from "react";
import Footer from '../components/Footer'
import {Card,Row,Col} from 'react-bootstrap'
import Cookies from 'universal-cookie'

export default function History() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()

    async function Update() {
        try{
            const fetchURL = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions'
            setLoading(true);
            const res = await fetch(fetchURL,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${cookies.get('session')}`
                }
            })
            let response = await res.json()

            console.log(response.sort((a, b) => {
                return(
                    new Date(b.updated_at) - new Date(a.updated_at)
                )
            }))

            setTransaction(response)
            setLoading(false)
        }catch(err){
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
        try{
            const fetchURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions/${id}/rate`
            const res = await fetch(fetchURL,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('session')}`
                },body: JSON.stringify({
                    rate: val
                })
            })
            const response = await res.json()
            console.log(response)
            Update()
        }catch(err){
            await Swal.fire({
                icon: 'error',
                title: '更新失敗',
                text: err
            })
        }
    }

    useEffect(() => {
        Update()
    }, [])
    return (
        <div id="page-wrapper">
            <Title title="訂購紀錄"
                   link={`/history`}/>

            <section id="main">
                <div className="container">
                    <LinearProgress hidden={!loading}/>
                    {
                        transaction && transaction.length > 0 && transaction.map((item) =>
                            <Row key={item.id}>
                                <Col sm={12} md={6}>
                                    <Card>
                                        <Card.Img variant="top" src={item.picUrl}/>
                                        <Card.Body style={{display: "flex", flexDirection: "column",}}>
                                            <Card.Title>商品名稱：{item.product.name}</Card.Title>
                                            <Card.Title>金額：{item.total}</Card.Title>
                                            <Card.Text>留言：{typeof(item.comment) === "undefined" || item.comment===null ? '' : (item.comment.length > 50 ? item.comment.slice(0,50)+' ...': item.comment)}</Card.Text>
                                            <Card.Text>購買日期：{new Date(item.updated_at).toLocaleString('zh-TW')}</Card.Text>
                                            <Card.Text>訂單編號：<b>{item.id.substring(0, 8)}</b>{item.id.substr(8)}</Card.Text>
                                            <Grid container spacing={1} justify="center" direction="row"
                                                  alignItems="center">
                                                <Grid item>
                                                    <Rating name="rating" value={parseFloat(item.rating)}
                                                            onChange={e => setNewRate(e.target.value, item.id)}/>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton
                                                        onClick={() => setNewRate(-1, item.id)}
                                                    ><Delete size="small"/></IconButton>
                                                </Grid>
                                            </Grid>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={12} md={6} style={{justifyContent: 'center', display: "flex"}}>
                                    <div>
                                    <span style={{
                                        alignItems: "center",
                                        fontSize: "5rem",
                                        fontStyle: "bold",
                                        display: "flex",
                                        textAlign: "center"
                                    }}>{item.id.substring(0, 8)}</span>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                </div>
            </section>
            <Footer/>
        </div>
    )
}
