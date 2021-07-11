import GoogleLogin from 'react-google-login';
import {useRouter} from "next/router";

export default function GoogleOAuth(){
    const router = useRouter()
    async function responseGoogle(google_response){
        console.log(JSON.stringify(google_response))
        try{
            if(google_response['profileObj']['givenName'] === undefined){
                return
            }
            const raw = {
                'token': google_response['accessToken']
            }
            const data = fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/google`,{
                method: 'POST',
                body: JSON.stringify(raw),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if(!data.ok){
                throw 'error connecting server'
            }
            const response = await data.json()
            localStorage.setItem('session', response['access_token'])
            // account type 1 is google
            //              2 is stores
            localStorage.setItem('account_type',1)
            localStorage.setItem('alert','登入成功')
            localStorage.setItem('user_name', google_response['profileObj']['givenName'])

            await router.push('/')
        }catch (err){
            console.log(`Failed Login: ${err}`)
            localStorage.setItem('alert', '登入失敗')
            window.alert('failed: '+ err)
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