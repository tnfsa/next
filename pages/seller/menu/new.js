import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { useRouter } from 'next/router'

//deprecated
import { Button, Figure, Spinner } from "react-bootstrap";
import Swal from 'sweetalert2'

export default function NewMenu() {
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const cookies = new Cookies()
    const storeId = cookies.get('store_id')
    const session = cookies.get('session')
    const router = useRouter()

    const NewOption = () => {
        const popupUrl = config['project'] + '#/config/new/option'
        const popupWindow = window.open(popupUrl,/*'popUpWindow',*/'', 'location=no,height=500,width=400,top=100,left=300')
        popupWindow.body = "功能未開放"
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
            await Swal.fire({
                icon: 'success',
                title: '上傳成功'
            })
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '上傳錯誤',
                text: err
            })

        }
        await router.push('/seller/menu')
    }

    async function handleChangeImage(evt) {
        console.log("Uploading");
        var reader = new FileReader();
        var file = evt.target.files[0];

        reader.onload = function (upload) {
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
                setImageUrl(response.result.data)

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
                    <div className="optionBar" hidden={true}>
                        <ul>
                            <li><Button variant="dark" onClick={NewOption}><i className="fa fa-plus" aria-hidden="true" />新增選項</Button></li>
                        </ul>
                    </div>
                    <form
                        className={"foodBlock"}
                        onSubmit={event => {
                            event.preventDefault()
                            Send()
                        }}>
                        <div class="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                食物名
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="請輸入"
                                value={name}
                                onChange={event => { setName(event.target.value) }}
                                required />
                        </div>
                        <div class="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                價錢
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="請輸入"
                                value={price}
                                onChange={event => { setPrice(parseInt(event.target.value)) }}
                                required />
                        </div>
                        <div class="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                副標題
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="請輸入"
                                value={description}
                                onChange={event => { setDescription(event.target.value) }}
                                required />
                        </div>
                        <div className="justify-center">
                            <div className="form-group">
                                <Button as={"label"} variant={"primary"} hidden={imageUrl !== ''}>
                                    上傳圖片
                                    <input type="file" name="file"
                                        className="upload-file"
                                        id="file"
                                        onChange={handleChangeImage}
                                        required
                                        hidden
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className="justify-center">
                            <Spinner hidden={uploading === false} animation={"border"} />
                            <br />
                            <a href={process.env.NEXT_PUBLIC_API_HOST + '/' + imageUrl} target="_blank"
                                hidden={!image || uploading}
                                rel="noreferrer">{process.env.NEXT_PUBLIC_API_HOST + '/' + imageUrl}</a>
                            <br />
                            <Figure.Image
                                width={300}
                                src={image && !uploading ? process.env.NEXT_PUBLIC_API_HOST + '/' + imageUrl : "https://via.placeholder.com/300x180?text=Product+Image"}
                                resizeMode="contain"
                            />
                        </div>

                        <div className="h-100 justify-center">
                            <div id="placeToAdd" />
                        </div>

                        <div className="justify-center">
                            <button className="btn btn-primary btn-block">送出</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}