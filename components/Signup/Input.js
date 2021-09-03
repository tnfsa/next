import { useState } from 'react'
import { useRouter } from "next/router";
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2';

export default function Input() {
    const [loading, setLoading] = useState(false)
    const [activation, setActivation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [username, setUserName] = useState('')
    const router = useRouter()
    const cookies = new Cookies()
    async function Send() {
        if (password !== passwordConfirm) {
            await Swal.fire({
                icon: 'error',
                title: '密碼與密碼驗證不符'
            })
            //empty the input box
            setPassword('')
            setPasswordConfirm('')
            return
        }
        const dataPack = {
            'email': email,
            'name': username,
            'password': password,
            'registration_code': activation
        }
        setLoading(true)
        try {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`, {
                method: 'POST',
                body: JSON.stringify(dataPack),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const json = data.json()
            await Swal.fire({
                icon: 'success',
                title: '註冊成功'
            })
            setLoading(false)
            await router.push('/')
        } catch (err) {
            console.log(`Error: ${err}`)
            await Swal.fire({
                icon: 'error',
                title: '註冊失敗',
                text: err
            })
            setLoading(false)
            await router.push('/login')
        }

    }

    return (
        <>
            <form onSubmit={event => {
                event.preventDefault()
                Send()
            }}>
                <h3 style={{ textAlign: 'center' }}>帳號註冊</h3>
                <div className="form-group">
                    <label>啟動碼</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter the activate code"
                        value={activation}
                        onChange={e => { setActivation(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>電子郵件</label>
                    <input type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>密碼</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>密碼確認</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={passwordConfirm}
                        onChange={e => { setPasswordConfirm(e.target.value) }}
                        required />
                </div>
                <div className="form-group">
                    <label>使用者名稱</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter the username"
                        value={username}
                        onChange={e => { setUserName(e.target.value) }}
                        required />
                </div>
                {loading &&
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-red-600 cursor-not-allowed" disabled>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        請稍候
                    </button>}
                {loading || <button className="bg-pink-500 hover:bg-ping-700 p-2 float-right"
                    type="submit">
                    送出
                </button>}
                &nbsp;


            </form>
        </>
    )
}