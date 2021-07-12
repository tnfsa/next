import Title from "../../../components/Title";
import Footer from '../../../components/Footer'
import {useRouter} from "next/router";
import {useState,useEffect} from 'react'
import {Figure, Card, Button,Row,Col} from 'react-bootstrap'
import {TextareaAutosize} from '@material-ui/core'
import Swal from 'sweetalert2'

function Purchase({data, storeName}) {
    const [comment,setComment] = useState('')
    const router = useRouter()
    const {store, product} = router.query
    console.log(data)

    async function Send(){
        const confirmText=
`請確認您的訂購資訊
名稱：${data.name}
售價：${data.price}
其他建議：${comment}
按 OK 送出；cancel 取消`
        if(window.confirm(confirmText)){
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions`,{
                    method: 'POST',
                    body: JSON.stringify({
                        'name': data.title,
                        'qty': 2,
                        'store_id': store,
                        'product_id': product,
                        'comment': comment,
                        'options': {}
                    }),
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('session')}`
                    }
                })
                const response = await res.json()
                console.log(`Response: ${response}`)
                if(res.ok){
                    // leak google analytics

                    Swal.fire({
                        title: '訂購成功',
                        html: (
                            `感謝您利用本系統訂購產品<br>` +
                            `請記得於選取時間取餐，謝謝<br>` +
                            `您的交易ID為： <b>${response.id}</b>`),
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(()=>{
                        router.push('/')
                    })
                }else{
                    throw await res.text()
                }
            }catch (err){
                Swal.fire({
                    title: '錯誤!',
                    text: `${err}\n與伺服器連線錯誤，請再試一次\n如果問題無法解決，請聯絡管理員\n訂單未成立`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    document.location.href = '/'
                })
            }
        }
    }
    useEffect(() => {
        if(localStorage.getItem('session') === null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '請先登入',
            }).then(() =>{
                document.location.href = '/'
            })
        }
        if(localStorage.getItem('session') === '2'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '此功能商家無法使用',
            }).then(() =>{
                document.location.href = '/'
            })
        }
        // eslint-disable-next-line
    },[])

    return (
        <div id="page-wrapper">
            <Title title={`${storeName}-${typeof (data) === "undefined" || data.name}`}
                   link={`/purchase/${store}/${product}`}/>

            <section id="main">
                <div className="container" style={{display: 'flex', flexWrap: 'wrap', align: 'center'}}>
                    {typeof (data) === "undefined" || <><Figure>
                        <Figure.Caption className={"text-center"}>
                            <h1></h1>
                        </Figure.Caption>
                        <Figure.Image
                            width={300}
                            alt="餐點的照片"
                            src={`${process.env.NEXT_PUBLIC_API_HOST}${data.image}`}
                            resizeMode="contain"
                        />
                    </Figure>
                        <Card style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>{typeof (data.name) === "undefined" || data.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{data.description}</Card.Subtitle>
                                <Card.Text>
                                    {`建議售價： ${data.price}元`}
                                </Card.Text>
                            </Card.Body>
                            <TextareaAutosize className="form-control" placeholder="留言" rows="5"
                                              onChange={event => setComment(event.target.value)}
                                              value={comment}/>
                            <Row>
                                <Col>
                                    <Button href={`/order/${store}`} style={{textDecoration: 'none'}}>回上一頁</Button>
                                </Col>
                                <Col>
                                    <Button onClick={Send} style={{textDecoration: 'none', margin: 'auto'}}>立即購買</Button>
                                </Col>
                            </Row>
                        </Card></>}
                </div>

            </section>
            <Footer/>
        </div>
    )
}

export async function getStaticProps(context) {
    const store = context.params.store
    const product = context.params.product
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${store}/products/${product}`
    console.log(url)
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const text = await res2.json()

    let storeName = ""

    for (let index in text) {
        console.log(`Id: ${text[index].id}、${store}`)
        if (text[index].id === store) {
            console.log(text[index])
            storeName = text[index].name
            break;
        }
    }

    return {
        props: {data, storeName}
    }
}

async function getStores(store) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${store}/products`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    return data.map(item => (`${store}/${item.id}`))
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const posts = await res.json()
    let stores = posts.map(item => (getStores(item.id)))
    const result = await Promise.all(stores)
    let paths = []
    let garbage = result.map(item => {
        item.map(thing => {
            console.log(thing)
            paths.push(`/purchase/${thing}`)
        })
    })
    //paths.push(`/purchase/ce89b986-9592-4fea-9b6d-22bab1e93afc/74eccc53-496c-4e8a-9c36-4d8db5505b0e`)

    return {
        paths: paths,
        fallback: true
    }
}

export default Purchase