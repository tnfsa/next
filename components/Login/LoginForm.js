import {useState} from "react";
import {Spinner} from 'react-bootstrap'
import {useRouter} from "next/router";

export default function LoginForm() {
    const [hidden, setHidden] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const Send = async () => {
        setHidden(true)
        const response = await postFile()
        console.log(response)
        if (response['status'] !== 'error') {
            await fetchInfo(response)
        }
        setHidden(false)
    }

    const postFile = async () => {
        let toReturn = {}
        try {
            let postData = {
                'email': email,
                'password': password,
            }

            let url = process.env.REACT_APP_API_ENDPOINT + '/login'
            const data = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const response = await data.json()
            toReturn = response
            if (response['status'] !== 'error') {
                localStorage.setItem('session', response['access_token'])
                localStorage.setItem('alert', '登入成功')
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
        const url = process.env.REACT_APP_API_ENDPOINT + '/me'
        try {
            const data = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${loginResponse['access_token']}`
                }
            })
            const response = await data.json()

            localStorage.setItem('user_name', response['name'])
            localStorage.setItem('id', response['id'])
            loginResponse.setItem('account_type', '2')
            if (response['stores'][0] !== undefined) {
                localStorage.setItem('store_id', response['stores'][0]['id'])
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
                <Spinner animation="border" role="status" hidden={!hidden}>
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