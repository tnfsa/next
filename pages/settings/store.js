import Title from '../../components/Title'
import Footer from '../../components/Footer'
import SettingsMenu from '../../components/settings/sidebar'
import { useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import Cookies from 'universal-cookie'
import Authenticate from '../../components/authenticate'
import Swal from 'sweetalert2'
import {useRouter} from 'next/router'

export default function Personal() {
    const cookies = new Cookies()
    const storeId = cookies.get('store_id')
    const session = cookies.get("session")
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
                                    {/*<UpdateStoreName />*/}
                                    <Deactivate storeId={storeId} session={session} />
                                </>
                                :
                                <ActivateStore session={session}/>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

function ActivateStore(props) {
    const [storeName, setStoreName] = useState('')
    const [loading, setLoading] = useState(false)

    async function activate() {
        if(storeName.length === 0){
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
                    'Authorization': `Bearer ${props.session}`
                }
            })
            if(res.ok){
                await Swal.fire({
                    icon: 'success',
                    title: '啟動成功'
                })
                await Swal.fire({
                    icon: 'info',
                    title: "請重新登入"
                })
                window.location.href = '/logout';
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

function Deactivate(props) {
    const [loading, setLoading] = useState(false)

    async function update() {
        const result = await Swal.fire({
            icon: 'warning',
            showCancelButton: true,
            text: "此操作將無法復原",
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            title: '刪除商店',
        })
        if (result.isConfirmed) {
            setLoading(true)
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${props.storeId}`,{
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${props.session}`
                    }
                })
                if(res.ok){
                    await fetch("https://api.vercel.com/v1/integrations/deploy/prj_KyaS954VKb83sq0OdVUkuIRIlSwL/fgdOuE9WfG");
                    await Swal.fire({
                        icon: "success",
                        text: "刪除成功"
                    })
                    document.location.href = "/logout";
                }
            }catch(err){
                await Swal.fire({
                    icon: error,
                    title: "錯誤",
                    text: err
                })
                document.location.reload()
            }
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