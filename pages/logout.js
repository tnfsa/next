import Title from "../components/Title";
import {useEffect} from "react";
import Cookies from 'universal-cookie'


export default function Logout(){
    useEffect(()=>{
        const cookies = new Cookies()
        cookies.remove('account_type')
        cookies.remove('session')
        cookies.remove('user_name')
        cookies.remove('store_id')
        document.location.replace('/')
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