import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

export default function LoggedInAlert() {
    const [loggedIn, setLoggedIn] = useState(false)
    const cookies = new Cookies()

    useEffect(() => {
        if (typeof (cookies.get('session')) === "undefined") {
            setLoggedIn(false)
        }
    }, [])

    return (
        <>
            {!loggedIn &&
                <div className="bg-red-600 p-2">
                    <h1 className="font-bold text-2xl text-center">點餐前請先登入</h1>
                </div>
            }
        </>
    )
}