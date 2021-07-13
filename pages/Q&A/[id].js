import Title from "../../components/Title";
import {useRouter} from "next/router";

export default function QnA({file}){
    const router = useRouter()
    const {id} = router.query
    return(
        <div id="page-wrapper">
            <Title title={`Q&A 問答集`}
                   link={`/Q&A/${id}`}/>

            <section id="main">
                <div className="container">
                    <p>
                        <h2 style={{fontSize: '3em',textAlign: 'center'}}>
                            {file.title}
                        </h2>
                        <br />
                        <h3>
                            {file.context.split('\n').map(thing=>(<>{thing}<br/></>))}
                        </h3>
                    </p>
                </div>
            </section>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STATIC}docs/QnA.json`)
    const response = await res.json()
    const paths = response.map(data=>(`/Q&A/${data.link}`))
    return {
        paths: paths,
        fallback: true
    }
}