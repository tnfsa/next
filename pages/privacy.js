import Title from "../components/Title";
import Footer from "../components/Footer";

export default function Privacy({data}){
    let renderFile = data['title'].map((file,index)=>{
        return({'title':file,'context':data.context[index]})
    })
    return(
        <div id="page-wrapper">
            <Title title="隱私權聲明"
                   link="/privacy"/>

            <section id="main">
                <div className="container">
                    {renderFile.map(file=>{
                        return(
                            <p key={file.title}>
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_STATIC}/docs/privacy.json`,{
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