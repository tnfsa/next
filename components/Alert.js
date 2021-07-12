import {useState,useEffect} from "react";
import {useRouter} from 'next/router'

export default function Alert(){
    const [alert,setAlert] = useState('')
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem('alert') !== null){
            setTimeout(()=>{

                localStorage.removeItem('alert')
                setAlert('')
                console.log('ClearAlert')
            },2500)
            setAlert(localStorage.getItem('alert'))
            console.log('SetAlert')
        }
    },[router.pathname])

    return(
        <p className="p-3 mb-2 bg-success text-white" hidden={alert === ""} style={{fontSize: '2em'}}>
            {alert}
        </p>
    )
}