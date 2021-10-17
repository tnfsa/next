import { useRouter } from 'next/router'
import {store} from '../redux/store'

export default function Debug(){
    const router = useRouter()

    if(process.env.NEXT_PUBLIC_DEVELOPEMENT === "FALSE"){
        return router.push('/404')
    }
    
    const stores = store.getState()
    console.log(stores)
    return (
        <div>
            Testing
        </div>    
    )
}