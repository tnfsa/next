import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Authenticate(props) {
    const cookies = new Cookies()
    const router = useRouter()

    useEffect(() => {
        if (typeof (props.seller) === "undefined") {
            normalAuth()
        } else if (props.seller === "noSeller") { 
            noSellerAuth()
        } else {
            sellerAuth()
        }
        // eslint-disable-next-line
    }, [])

    async function normalAuth() {
        const loggedIn = typeof (cookies.get('session'))
        if (loggedIn === "undefined") {
            await Swal.fire({
                icon: 'error',
                title: '請先登入'
            })
            await router.push('/')
        }
    }

    async function noSellerAuth() {
        const loggedIn = typeof (cookies.get('session'))
        if (loggedIn === "undefined") {
            await Swal.fire({
                icon: 'error',
                title: '請先登入'
            })
            cookies.set("redirect",props.redirect || "/")
            await router.push('/login')
        }
        if (cookies.get('account_type') === '2') {
            router.prefetch('/')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '此功能商家無法使用',
            }).then(() => {
                router.push('/')
            })
        }
    }

    async function sellerAuth() {
        const account_type = cookies.get('account_type')
        const session = cookies.get('session')
        if (account_type !== "2" || typeof (session) === "undefined") {
            await Swal.fire({
                icon: 'error',
                title: '未經授權'
            })
            await router.push('/')
        }
    }

    return (
        <div id="authenticate" />
    )
}