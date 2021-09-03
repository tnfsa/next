import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import { useRouter } from 'next/router'
import Cookies from "universal-cookie";
import { Button, Figure, Spinner } from "react-bootstrap";
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
                <div className="p-5">
                    <form
                        className={"foodBlock"}
                        onSubmit={e => {
                            e.preventDefault()
                            Send()
                        }}
                    >
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
                                        hidden
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className="justify-center">
                            {uploading &&
                                <Spinner animation={"border"} />
                            }
                            <br />
                            <a href={process.env.NEXT_PUBLIC_API_HOST + '/' + imageUrl} target="_blank"
                                hidden={!image || uploading}
                                rel="noreferrer">{process.env.NEXT_PUBLIC_API_HOST + '/' + imageUrl}</a>
                            <br />
                            <Figure.Image
                                width={300}
                                src={image && !uploading ? process.env.NEXT_PUBLIC_API_HOST + imageUrl : "https://via.placeholder.com/300x180?text=Product+Image"}
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