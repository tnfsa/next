import Title from "../../../components/Title";
import Footer from '../../../components/Footer'
import {useRouter} from "next/router";
import {Figure, Card} from 'react-bootstrap'

export default function Purchase({data, storeName}) {
    const router = useRouter()
    const {store, product} = router.query
    console.log(data)
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
                                <Card.Link href="#">回上一頁</Card.Link>
                                <Card.Link href="#">立即購買</Card.Link>
                            </Card.Body>
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