import {useState,useEffect} from "react";
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie'

export default function Alert(){
    const [alert,setAlert] = useState('')
    const router = useRouter()
    const cookies = new Cookies()
    
    useEffect(()=>{
        if(cookies.get('alert') !== null){
            setTimeout(()=>{
                cookies.remove('alert')
                setAlert('')
            },2500)
            setAlert(cookies.get('alert'))
        }
    },[router.pathname])

    return(
        <p className="p-3 mb-2 bg-success text-white" hidden={alert === ""} style={{fontSize: '2em'}}>
            {alert}
        </p>
    )
}