import {useState} from "react";
import {Spinner} from 'react-bootstrap'
import {useRouter} from "next/router";
import Cookies from 'universal-cookie'
export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const cookies = new Cookies();
    const Send = async () => {
        setLoading(true)
        const response = await postFile()
        console.log(response)
        if (response['status'] !== 'error') {
            await fetchInfo(response)
        }
        setLoading(false)
    }

    const postFile = async () => {
        let toReturn = {}
        try {
            let url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/login'
            const data = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const response = await data.json()
            toReturn = response
            if (response['status'] !== 'error') {
                cookies.set('session',response['access_token'])
                cookies.set('alert','登入成功')
            } else {
                window.alert('帳號或密碼錯誤')
            }

        } catch (err) {
            window.alert(
                `伺服器存取錯誤：${err}`)
        }
        return toReturn
    }

    async function fetchInfo(loginResponse) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/me'
        try {
            const data = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${loginResponse['access_token']}`
                }
            })
            const response = await data.json()
            cookies.set('user_name', response['name'])
            cookies.set('id',response['id'])
            cookies.set('account_type','2')
            if (response['stores'][0] !== undefined) {
                cookies.set('store_id',response['stores'][0]['id'])
            }
            await router.push('/')
        } catch (err) {
            window.alert(
                `意外的錯誤：${err}`)
        }
    }

    return (
        <>
            <center>
                <Spinner animation="border" role="status" hidden={!loading}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </center>
            <form onSubmit={event => {
                event.preventDefault()
                Send()
            }}>
                <div className="form-group">
                    <br/>
                    <label>電子郵件
                        <input type="email"
                               className="form-control"
                               placeholder="Enter email"
                               value={email}
                               onChange={e => {
                                   setEmail(e.target.value)
                               }}
                               required/>
                    </label>
                    <label>密碼
                        <input type="password"
                               className="form-control"
                               placeholder="Enter password"
                               value={password}
                               onChange={e => {
                                   setPassword(e.target.value)
                               }}
                               required/>
                    </label>
                    <button type="submit">送出</button>
                </div>
            </form>
        </>
    )
}