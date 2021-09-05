import Title from "../components/Title";
import Footer from '../components/Footer'

function COC({data}){
    let renderFile = data['title'].map((file,index)=>{
        return({'title':file,'context':data.context[index]})
    })
    console.log(renderFile)
    return(
        <div id="page-wrapper">
            <Title title="行為準則"
                   link="/COC"/>

            <section id="main">
                <div className="container">
                    {renderFile.map(file=>{
                        return(
                            <p>
                                <h2 style={{fontSize: '3em',textAlign: 'center'}}>
                                    {file.title}
                                </h2>
                                <br />
                                <h3>
                                    {file.context.split('\n').map(thing=>(<>{thing}<br/></>))}
                                </h3>
                            </p>
                        )
                    })}
                </div>
            </section>
            <Footer />
        </div>
    )
}
export async function getStaticProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STATIC}/docs/coc.json`,{
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    const data = await res.json()

    return{
        props:{
            data
        }
    }
}

export default COC