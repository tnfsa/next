import {store} from '../redux/store'
export default function Debug(){
    const stores = store.getState()
    console.log(stores)
    return (
        <div>
            Testing
        </div>    
    )
}