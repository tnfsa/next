import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import { useRouter } from 'next/router'
import Cookies from "universal-cookie";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function configMenu() {
    const cookies = new Cookies()
    const router = useRouter()
    const { uid } = router.query

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const storeId = cookies.get('store_id')
    const session = cookies.get('session')

    async function Send() {
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products/${uid}`
        try {
            const res = await fetch(url, {
                method: 'PUT',
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
                title: '更新成功'
            })
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '更新錯誤',
                text: err
            })

        }
        await router.push('/seller/menu')
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

    async function firstFetch() {
        //instant fetch settings from history
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + storeId + '/products/' + uid
        console.log(url)
        try {
            const data = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Accept': 'application/json'
                }
            })
            const parsed = await data.json()
            setPrice(parsed['price'])
            setName(parsed['name'])
            setDescription(parsed['description'])

            setImageUrl(parsed['image'])
            console.log(parsed)
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: '伺服器讀取錯誤',
                text: err
            })
            await router.push('/')
        }
    }
    useEffect(() => {
        firstFetch()
        // eslint-disable-next-line
    }, [])

    return (
        <div id="page-wrapper">
            <Title title="修改菜單"
                link={`/seller/menu/${uid}`} />

            <Authenticate seller="true" />
            <section id="main">
                <div className="p-2">
                    <form
                        className="w-auto"
                        onSubmit={e => {
                            e.preventDefault()
                            Send()
                        }}
                    >
                        <div className="flex md:flex-row flex-col">
                            <div id="input_part" className="w-full p-5 md:w-1/2 justify-between">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="foodname">
                                        食物名
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="請輸入"
                                        value={name}
                                        onChange={event => { setName(event.target.value) }}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="price">
                                        價錢
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        placeholder="請輸入"
                                        value={price}
                                        onChange={event => { setPrice(parseInt(event.target.value)) }}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="subtitle">
                                        副標題
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="請輸入"
                                        value={description}
                                        onChange={event => { setDescription(event.target.value) }}
                                        required />
                                </div>
                            </div>

                            <div id="picture_preview" className="justify-center items-center w-auto p-10 space-y-2" >
                                <div>
                                    {uploading &&
                                        <Spinner animation={"border"} />
                                    }
                                    <img
                                        width={300}
                                        src={uploading ? "https://via.placeholder.com/300x180?text=Product+Image" : `${process.env.NEXT_PUBLIC_API_HOST}${imageUrl}`}
                                        resizeMode="contain"
                                    />
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

                        <button className="bg-pink-500 hover:bg-ping-700 py-2 float-right px-5 md:float-none md:w-full"
                            type="submit">
                            更新
                        </button>
                    </form>
                    &nbsp;
                </div>
            </section>
        </div>
    )
}

export async function getStaticProps(context) {
    const uid = context.params.uid
    return {
        props: { uid }
    }
}

async function getFoods(storeId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/products`)
    const result = await res.json()
    return result.map(food => (`/${food.id}`))
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`)
    const response = await res.json()
    const fetchingFoods = response.map(store => (getFoods(store.id)))

    const mixed = await Promise.all(fetchingFoods)
    let paths = []
    for (const item of mixed) {
        for (const route of item) {
            paths.push(`/seller/menu${route}`)
        }
    }

    return {
        paths,
        fallback: false
    }
}