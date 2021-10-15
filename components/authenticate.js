import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { setRedirect } from '../redux/actions'

export default function Authenticate(props) {
    const router = useRouter()
    const session = useSelector(state => state.profile.session)
    const account_type = useSelector(state => state.profile.account_type)

    const dispatch = useDispatch()

    switch (props.option) {
        case "student":
            if (account_type !== "student") {
                if (session === null) {
                    // not signed in
                    Swal.fire({
                        icon: 'error',
                        title: "請先登入",
                    }).then(() => {
                        dispatch(setRedirect({
                            redirect: document.location.href
                        }))
                        router.push('/login')
                    })
                } else {
                    // signed in but not student
                    Swal.fire({
                        icon: 'error',
                        title: "僅學生可以使用",
                    }).then(() => {
                        router.push('/')
                    })
                }
            }
            break;
        case "seller":
            if(account_type !== "store_manager"){
                Swal.fire({
                    icon: "error",
                    title: "非法使用者登入",
                }).then(() => {
                    router.push('/')
                })
            }
            break;
        case "admin":
            if(account_type !== "admin"){
                Swal.fire({
                    icon: "error",
                    title: "非法使用者登入",
                }).then(() => {
                    router.push('/')
                })
            }
            break;
        default:
            if (session === null) {
                Swal.fire({
                    icon: 'error',
                    title: '請先登入'
                }).then(() => {
                    router.push('/')
                })
            }
    }
    return (
        <div id="authenticate" />
    )
}