import {useState} from 'react'
import {store} from '../../redux/store'
import {useSelector} from "react-redux";

export function useUserRole() {
    const [role, setRole] = useState(useSelector(state => state.profile.account_type))

    store.subscribe(() => {
        setRole(store.getState().profile.account_type)
    })

    return role
}