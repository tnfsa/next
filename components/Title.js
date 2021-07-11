import {useEffect} from 'react'
import {useRouter} from "next/router";
import Nav from "./nav";
import Link from 'next/link'

export default function Title(props) {
    const route = useRouter()
    useEffect(()=>{

    },[route.pathname])

    if(typeof(props.link) === "undefined"){
        return(
            <section id="header">
                <h1>{props.title}</h1>
                <Nav />
            </section>
        )
    }else{
        return(
            <section id="header">
                <h1><Link href={props.link}>{props.title}</Link></h1>
                <Nav />
            </section>
        )
    }
}