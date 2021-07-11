import Link from 'next/link'

export default function LatestNews(props){
    return(
        <li>
            <span className="date">{props.month} <strong>{props.date}</strong></span>
            {typeof(props.link) === "undefined" ?
                <h3>{props.title}</h3>
                :
                <h3><Link href={props.link}>{props.title}</Link></h3>}
            <p>{props.context}</p>
        </li>
    )
}