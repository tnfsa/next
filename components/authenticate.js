import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Authenticate() {
    const cookies = new Cookies()
    const router = useRouter()

    useEffect(() => {
        const loggedIn = typeof (cookies.get('session'))
        if (loggedIn === "undefined") {
            router.prefetch('/')
            Swal.fire({
                icon: 'error',
                title: '請先登入'
            }).then(() => {
                router.push('/')
            })
        }
    }, [])

    return (
        <div id="authenticate" />
    )
}