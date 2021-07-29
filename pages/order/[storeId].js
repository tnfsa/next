import Title from "../../components/Title";
import { useRouter } from "next/router";
import Footer from '../../components/Footer'
import { Grid } from '@material-ui/core'
import Section from '../../components/Section'

function Order({ data, name }) {
    const router = useRouter()
    const { storeId } = router.query

    return (
        <div id="page-wrapper">
            <Title title={`餐點瀏覽: ${name}`}
                link={`/order/${storeId}`} />

            <section id="main">
                <div className="container">
                    <Grid container justifyContent="center" spacing={2}>
                        {typeof (data) !== "undefined" && data.map(item => {
                            return (
                                <>
                                    <Section title={item.name}
                                        context={item.description}
                                        link={`/purchase/${storeId}/${item.id}`}
                                        picture={`${process.env.NEXT_PUBLIC_API_HOST}${item.image}`}
                                        key={item.name} />
                                </>
                            )
                        })}
                    </Grid>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export async function getStaticProps(context) {
    const page = context.params.storeId
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${page}/products`, {
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

    let name = ""

    for (let index in text) {
        if (text[index].id === page) {
            console.log(text[index])
            name = text[index].name
        }
    }

    return {
        props: { data, name }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    const posts = await res.json()

    return {
        paths: posts.map((data) => (`/order/${data.id}`)),
        fallback: false
    }
}

export default Order