import GoogleLogin from 'react-google-login';
import {useRouter} from "next/router";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

export default function GoogleOAuth(){
    const router = useRouter()
    const cookies = new Cookies()
    async function responseGoogle(google_response){
        console.log(JSON.stringify(google_response))
        try{
            if(google_response['profileObj']['givenName'] === undefined){
                return
            }
            const raw = {
                'token': google_response['accessToken']
            }
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/google`,{
                method: 'POST',
                body: JSON.stringify(raw),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const response = await data.json()
            cookies.set('session',response['access_token'])
            // account type 1 is google
            //              2 is stores
            cookies.set('account_type',1)
            cookies.set('user_name', google_response['profileObj']['givenName'])
            await Swal.fire({
                icon: 'success',
                title: '登入成功'
            })
            await router.push('/')
        }catch (err){
            console.log(`Failed Login: ${err}`)
            await Swal.fire({
                icon: 'error',
                title: '與伺服器連線錯誤'
            })
        }
    }
    return(
        <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PLATFORM}
            onSuccess={responseGoogle}
            buttonText="Login"
            hostedDomain={process.env.NEXT_PUBLIC_GOOGLE_ACCOUNT_SUFFIX}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <button onClick={renderProps.onClick}>利用google登入</button>
            )}
        />
    )
}