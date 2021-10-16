import Title from '../../components/Title'
import Footer from '../../components/Footer'
import SettingsMenu from '../../components/settings/sidebar'
import { useState } from 'react'
import Swal from 'sweetalert2'
import {LinearProgress} from '@material-ui/core'

export default function Personal() {
    return (
        <div id="page-wrapper">
            <Title title="設定"
                link={`/settings`} />

            <section id="main">
                <div className="flex p-10">
                    <SettingsMenu />

                    <div className="px-10 w-full">
                        <div className="bg-white w-full px-5 divide-y-4 divide-solid">
                            {/*<Password />*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

function Password() {
    const [old, setOld] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)

    async function postPassword() {

    }

    async function update() {
        if (confirm !== newPassword) {
            await Swal.fire({
                icon: 'error',
                title: '密碼與確認不相符'
            })
            setNewPassword('')
            setConfirm('')
            return
        }
        if (newPassword.length < 8) {
            await Swal.fire({
                icon: 'error',
                title: '密碼長度需大於8個字元'
            })
            setNewPassword('')
            setConfirm('')
            return
        }

        const result = await Swal.fire({
            title: '確定變更？',
            showDenyButton: true,
            confirmButtonText: '確定',
            denyButtonText: '取消'
        })
        if (result.isConfirmed) {
            postPassword()
        } else if (result.isDenied) {
            setOld('')
            setConfirm('')
            setNewPassword('')
        }
    }

    return (
        <div id="updatepassword" className="text-xl py-3">
            <h1 className="text-center text-2xl font-semibold">變更密碼</h1>
            {loading &&
                <LinearProgress />
            }
            <form onSubmit={event => {
                event.preventDefault();
                update();
            }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        舊密碼
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="請輸入"
                        value={old}
                        onChange={event => { setOld(event.target.value) }}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        新密碼
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="請輸入"
                        value={newPassword}
                        onChange={event => { setNewPassword(event.target.value) }}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        密碼確認
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="請輸入"
                        value={confirm}
                        onChange={event => { setConfirm(event.target.value) }}
                        required />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    更新
                </button>
            </form>
        </div>
    )
}