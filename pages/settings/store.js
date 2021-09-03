import Title from '../../components/Title'
import Footer from '../../components/Footer'
import SettingsMenu from '../../components/settings/sidebar'
import { useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import Cookies from 'universal-cookie'
import Authenticate from '../../components/authenticate'
import Swal from 'sweetalert2'

export default function Personal() {
    const cookies = new Cookies()
    const storeId = cookies.get('store_id')
    return (
        <div id="page-wrapper">
            <Authenticate seller="true" />
            <Title title="設定"
                link={`/settings`} />

            <section id="main">
                <div className="flex p-10">
                    <SettingsMenu />

                    <div className="px-10 w-full">
                        <div className="bg-white w-full px-5 divide-y-4 divide-solid">
                            {storeId ?
                                <>
                                    <UpdateStoreName />
                                    <Deactivate />
                                </>
                                :
                                <ActivateStore />
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

function ActivateStore() {
    const [storeName, setStoreName] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function activate() {
        if(storeName.length() === 0){
            await Swal.fire({
                icon: 'error',
                title: '請輸入名稱'
            })
            return;
        }
        setLoading(true)
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`,{
                method: 'POST',
                body: JSON.stringify({
                    name: storeName
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('session')}`
                }
            })
            if(res.ok){
                await Swal.fire({
                    icon: 'success',
                    title: '啟動成功'
                })
            }else{
                throw await res.text()
            }
        }catch(err){
            await Swal.fire({
                icon: 'error',
                title: '啟動失敗',
                text: err
            })
        }
        setLoading(false)
    }

    return (
        <div id="updatepassword" className="text-xl py-3">
            <h1 className="text-center text-2xl font-semibold">啟動商店</h1>
            {loading &&
                <LinearProgress />
            }
            <form onSubmit={event => {
                event.preventDefault();
                activate();
            }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        商店名稱
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="請輸入"
                        value={storeName}
                        onChange={event => { setStoreName(event.target.value) }}
                        required />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    設定
                </button>
            </form>
        </div>
    )
}

function UpdateStoreName() {
    const [storeName, setStoreName] = useState('')
    const [loading, setLoading] = useState(false)

    async function update() {
        setLoading(true)
        
        setLoading(false)
    }

    return (
        <div id="updatepassword" className="text-xl py-3">
            <h1 className="text-center text-2xl font-semibold">變更商店名稱</h1>
            {loading &&
                <LinearProgress />
            }
            <form onSubmit={event => {
                event.preventDefault();
                update();
            }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        商店名稱
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="請輸入"
                        value={storeName}
                        onChange={event => { setStoreName(event.target.value) }}
                        required />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    更新
                </button>
            </form>
        </div>
    )
}

function Deactivate() {
    const [loading, setLoading] = useState(false)

    async function update() {
        const result = await Swal.fire({
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            title: '刪除商店',
        })
        if (result.isConfirmed) {
            setLoading(true)

            

            setLoading(false)
        }
    }

    return (
        <div id="updatepassword" className="text-xl py-3 space-y-2">
            <h1 className="text-center text-2xl font-semibold">刪除</h1>
            {loading &&
                <LinearProgress />
            }
            <form onSubmit={event => {
                event.preventDefault()
                update()
            }}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    刪除
                </button>
            </form>
        </div>
    )
}