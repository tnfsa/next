import Title from "../../components/Title";
import {useRouter} from "next/router";
import Footer from '../../components/Footer'

import Section from '../../components/Section'
import Restaurant from "../restaurant";

function Order({data,name}){
    const router = useRouter()
    const {storeId} = router.query

    return(
        <div id="page-wrapper">
            <Title title={`餐點瀏覽: ${name}`}
                   link={`/order/${storeId}`} />

            <section id="main">
                <div className="container">
                    <div style={{display: 'flex',flexWrap:'wrap'}}>
                        {typeof(data) !== "undefined" && data.map(item=>{
                            return(
                                <Section title={item.name}
                                         context={item.description}
                                         link={`/purchase/${storeId}/${item.id}`}
                                         picture={`${process.env.NEXT_PUBLIC_HOST}/${item.image}`}/>
                            )
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export async function getStaticProps(context) {
    const page = context.params.storeId
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${page}/products`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const text = await res2.json()
    console.log(`Text: ${text}`)
    let name = ''

    for(let e in text){
        if(e.name === page){
            name = e.name
            return
        }
    }

    return {
        props: { data , name}
    }
}

export async function getStaticPaths(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const posts = await res.json()

    return {
        paths: posts.map((data)=>(`/order/${data.id}`)),
        fallback: true
    }
}

export default Order