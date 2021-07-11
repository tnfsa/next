export default function Spotlight(props){
    return(
        <div className="col-4 col-12-medium">
            <section className={props.position}>
                <i className={props.icon}></i>
                <header>
                    <h2>{props.title}</h2>
                </header>
                <p>{props.context}</p>
            </section>
        </div>
    )
}