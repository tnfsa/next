import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

//deprecated
import { Button, Spinner } from "react-bootstrap";
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

export default function NewMenu() {
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(`${process.env.NEXT_PUBLIC_STATIC}/not_selected.png`)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const storeId = useSelector(state => state.profile.store_id)
    const session = useSelector(state => state.profile.session)

    const router = useRouter()

    async function Submit() {
        console.log("submit")
        const status = await Send()
        if (status) {
            await router.push('/seller/menu')
        }
    }
    async function Send() {
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session}`
                },
                body: JSON.stringify({
                    name,
                    price,
                    description,
                    'store_id': storeId,
                    "image": imageUrl
                })
            })
            const response = await res.json()
            console.log(response)
            return true
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '上傳錯誤',
                text: err
            })
            return false
        }
    }

    async function add_next() {
        console.log("add next")
        const status = await Send()
        if (status) {
            setImage('')
            setUploading(false)
            setImageUrl(`${process.env.NEXT_PUBLIC_STATIC}/not_selected.png`)
            setName('')
            setPrice('')
            setDescription('')
        }

    }

    async function handleChangeImage(evt) {
        console.log("Uploading");
        var reader = new FileReader();
        var file = evt.target.files[0];

        reader.onload = async function (upload) {
            console.log(file)
            setImage(upload.target.result);
            const formData = new FormData()
            formData.append('image', file)
            setUploading(true)
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + storeId + '/images', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${session}`
                    },
                    body: formData
                })
                const response = await res.json()
                console.log(response)
                setImageUrl(`${process.env.NEXT_PUBLIC_API_HOST}${response.result.data}`)

            } catch (err) {
                await Swal.fire({
                    icon: 'error',
                    title: '上傳錯誤',
                    text: err
                })
            }
            setUploading(false)
        }
        reader.readAsDataURL(file);
        console.log("Uploaded");
    }



    return (
        <div id="page-wrapper">
            <Title title="新菜單"
                link="/seller/menu/new" />

            <Authenticate seller="true" />
            <section id="main">
                <div className="p-5">
                    <Options />
                    <form
                        className="w-auto"
                        onSubmit={e=>{
                            e.preventDefault()
                        }}
                    >
                        <div className="flex md:flex-row flex-col">
                            <div id="input_part" className="w-full p-5 md:w-1/2 justify-between">
                                <Inputbox value={name} setValue={setName} type="text" name="商品名稱" key="inputName" />
                                <Inputbox value={price} setValue={setPrice} name="價格" type="number" key="inputPrice" />
                                <Inputbox value={description} setValue={setDescription} type="text" name="副標題" key="inputSubtitle" />
                            </div>

                            <div id="picture_preview" className="justify-center items-center w-auto p-10 space-y-2" >
                                <div>
                                    {uploading &&
                                        <Spinner animation={"border"} />
                                    }
                                    <div className="p-4 content-center">
                                        <div className="h-40 w-64 relative">
                                            <Image src={uploading ? "https://via.placeholder.com/300x180?text=Product+Image" : imageUrl}
                                                alt="photo"
                                                layout="fill"
                                                className="rounded-3xl" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <Button as={"label"} variant={"primary"}>
                                        修改圖片
                                        <input type="file" name="file"
                                            className="upload-file"
                                            id="file"
                                            onChange={handleChangeImage}
                                            hidden
                                        />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div id="buttons" className="float-right md:float-none space-x-1">
                            <button className="bg-blue-500 hover:bg-blue-700 py-2  px-5 rounded-lg text-black"
                                onClick={() => add_next()}>
                                繼續下一筆
                            </button>
                            <button className="bg-red-500 hover:bg-ping-700 py-2 px-5 rounded-lg text-black"
                                onClick={()=>{Submit()}}>
                                完成
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

function Inputbox(props) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {props.name}
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={props.type}
                placeholder="請輸入"
                value={props.value}
                onChange={event => { props.setValue(event.target.value) }}
                required />
        </div>
    )
}

function Options() {
    const NewOption = () => {
        const popupUrl = config['project'] + '#/config/new/option'
        const popupWindow = window.open(popupUrl,/*'popUpWindow',*/'', 'location=no,height=500,width=400,top=100,left=300')
        popupWindow.body = "功能未開放"
    }
    return (
        <div className="optionBar" hidden={true}>
            <ul>
                <li>
                    <Button variant="dark" onClick={NewOption}><i className="fa fa-plus" aria-hidden="true" />新增選項</Button>
                </li>
            </ul>
        </div>
    )
}