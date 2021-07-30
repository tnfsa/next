import Title from "../components/Title";
import {useEffect} from "react";
import {useRouter} from "next/router";
import Cookies from 'universal-cookie'


export default function Logout(){
    const router = useRouter()
    const cookies = new Cookies()

    useEffect(()=>{
        const json = cookies.getAll()
        console.log(json)
        cookies.set('alert','登出成功')
        router.push('/')
    },[])
    return(
        <div id="page-wrapper">
            <Title title="登出"/>

            <section id="main">
                <div className="container">
                    <h2 style={{textAlign: 'center'}}>正在將你登出</h2>
                </div>
            </section>
        </div>
    )
}