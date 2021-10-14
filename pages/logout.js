import Title from "../components/Title";
import {useEffect} from "react";
import Cookies from 'universal-cookie'

import { resetProfile } from "../redux/actions";
import {useDispatch} from "react-redux"

export default function Logout(){
    const dispatch = useDispatch()
    useEffect(()=>{
        const cookies = new Cookies()
        cookies.remove('account_type')
        cookies.remove('session')
        cookies.remove('user_name')
        cookies.remove('store_id')
        
        dispatch(resetProfile())

        document.location.replace('/')
    },[])
    return(
        <div id="page-wrapper">
            <Title title="登出"/>

            <section id="main">
                <div className="container">
                    <h2 style={{textAlign: 'center'}}>正在登出</h2>
                </div>
            </section>
        </div>
    )
}