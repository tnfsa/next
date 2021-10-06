import { useState } from "react";
import { Spinner } from 'react-bootstrap'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/actions";

export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const dispatch = useDispatch()

    const Send = async () => {
        setLoading(true)
        const response = await postFile()
        console.log(response)
        if (response['status'] !== 'error') {
            await fetchInfo(response)
        }
        //window.document.location = "/"
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
                await Swal.fire({
                    icon: 'success',
                    title: '登入成功'
                })
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: '帳號或密碼錯誤'
                })
            }

        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '伺服器聯絡逾時',
                text: '請稍後再試'
            })
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
            dispatch(setProfile({
                session: loginResponse.access_token,
                username: response.name,
                avatar: null,
                account_type: "store_manager",
                store_id: response.stores[0] === undefined ? null : response['stores'][0]['id'],
            }))
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '意外的錯誤',
                text: err
            })
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
                    <br />
                    <label>電子郵件
                        <input type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                            required />
                    </label>
                    <label>密碼
                        <input type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                            required />
                    </label>
                    <button className="bg-pink-500 hover:bg-ping-700 py-2 px-4 float-right inline-block rounded-md text-black font-bold"
                        type="submit">
                        送出
                    </button>
                </div>
            </form>
        </>
    )
}