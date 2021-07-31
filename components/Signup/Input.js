import {useState} from 'react'
import {useRouter} from "next/router";
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2';

export default function Input() {
    const [loading,setLoading] = useState(false)
    const [activation,setActivation] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [username,setUserName] = useState('')
    const router = useRouter()
    const cookies = new Cookies()
    async function Send(){
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
        try{
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`,{
                method: 'POST',
                body: JSON.stringify(dataPack),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const json = data.json()
            cookies.set('alert','註冊成功')
            setLoading(false)
            await router.push('/')
        }catch(err){
            console.log(`Error: ${err}`)
            cookies.set('alert','註冊失敗')
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
                <h3 style={{textAlign: 'center'}}>帳號註冊</h3>
                <div className="form-group">
                    <label>啟動碼</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter the activate code"
                           value={activation}
                           onChange={e =>{setActivation(e.target.value)}}
                           required/>
                </div>
                <div className="form-group">
                    <label>電子郵件</label>
                    <input type="email"
                           className="form-control"
                           placeholder="Enter email"
                           value={email}
                           onChange={e =>{setEmail(e.target.value)}}
                           required/>
                </div>
                <div className="form-group">
                    <label>密碼</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Enter password"
                           value={password}
                           onChange={e=>{setPassword(e.target.value)}}
                           required/>
                </div>
                <div className="form-group">
                    <label>密碼確認</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Enter password"
                           value={passwordConfirm}
                           onChange={e=>{setPasswordConfirm(e.target.value)}}
                           required/>
                </div>
                <div className="form-group">
                    <label>使用者名稱</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter the username"
                           value={username}
                           onChange={e=>{setUserName(e.target.value)}}
                           required/>
                </div>
                <button type="submit" disabled={loading}>送出</button>
            </form>
        </>
    )
}