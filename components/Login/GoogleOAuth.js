import GoogleLogin from 'react-google-login';
import { Spinner } from 'react-bootstrap'
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import { useState } from 'react'

export default function GoogleOAuth() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const cookies = new Cookies()
    async function responseGoogle(google_response) {
        setLoading(true)
        console.log(JSON.stringify(google_response))
        try {
            if (google_response['profileObj']['givenName'] === undefined) {
                return
            }
            const raw = {
                'token': google_response['accessToken']
            }
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/google`, {
                method: 'POST',
                body: JSON.stringify(raw),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const response = await data.json()
            cookies.set('session', response['access_token'])
            cookies.set('account_type', 1)
            cookies.set('user_name', google_response['profileObj']['givenName'])
            setLoading(false)
            await Swal.fire({
                icon: 'success',
                title: '登入成功'
            })
            const location = cookies.get("redirect")
            
            await router.push(location || "/restaurant")
        } catch (err) {
            setLoading(false)
            console.log(`Failed Login: ${err}`)
            await Swal.fire({
                icon: 'error',
                title: '與伺服器連線錯誤'
            })
        }
    }
    return (
        <>
            <center>
                <GoogleLogin
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PLATFORM}
                    onSuccess={responseGoogle}
                    buttonText="Login"
                    hostedDomain={process.env.NEXT_PUBLIC_GOOGLE_ACCOUNT_SUFFIX}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <button className="bg-pink-500 hover:bg-ping-700 p-2 disabled:opacity-50 inline-block rounded-md text-black font-bold"
                            disabled={loading}
                            onClick={renderProps.onClick}>
                            利用google登入
                        </button>
                    )}
                />
                <span> </span>
                <Spinner animation="border" role="status" hidden={!loading}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </center>
        </>
    )
}