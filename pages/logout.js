import Title from "../components/Title";
import {useEffect} from "react";

import { resetProfile } from "../redux/actions";
import {useDispatch} from "react-redux"

export default function Logout(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(resetProfile())

        document.location.replace('/')
        // eslint-disable-next-line
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