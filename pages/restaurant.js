import Title from '../components/Title'
import Footer from '../components/Footer'

function Restaurant({data}){
    return(
        <div id="page-wrapper">
            <Title title="餐廳"
                   link="/restaurant"/>

            <section id="main">
                <div className="container">
                    {typeof(data) === "undefined" ?
                        <article className="box post">
                            <h2><center>查無資料</center></h2>
                        </article>
                        :
                        data.map((data)=>{
                            return(
                                <article className="box post">
                                    <div className="image featured">
                                        <img src={typeof(data.picUrl) === "undefined" ? "https://database.tnfsa.org/images/pic01.jpg":data.picUrl}
                                             alt={`商家-${data.name}-的照片`}/>
                                    </div>
                                    <header>
                                        <h2>{data.name}</h2>
                                        <p>{data.description}</p>
                                    </header>
                                    <footer>
                                        <ul className="actions">
                                            <li><a href={`/order/${data.id}`} className="button">立即前往</a></li>
                                        </ul>
                                    </footer>
                                </article>
                            )
                        })
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}
/*
export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const data = await res.json()

    return {
        props: { data }
    }
}
*/
export default Restaurant