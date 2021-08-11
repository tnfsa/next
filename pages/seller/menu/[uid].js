import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import { useRouter } from 'next/router'
import Cookies from "universal-cookie";
import { Button, Col, Container, Figure, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from 'react'

export default function configMenu() {
    const cookies = new Cookies()
    const router = useRouter()
    const { uid } = router.query

    const [name, setName] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const storeId = cookies.get('store_id')
    const session = cookies.get('session')
    async function Send() {
        const postURL = process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + storeId + '/products'

        const data = {
            'name': name,
            'price': price,
            'description': subtitle,
            'store_id': storeId,
            "image": imageUrl
        }
        //window.alert(postURL)
        await fetch(postURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${session}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return response.text().then(res => {
                throw new Error(res)
            })
        }).catch((error) => {
            console.log(error.message)
            let response = JSON.parse(error.message)
            window.alert(`${response.message}\n與伺服器連線錯誤，請再試一次\n如果問題無法解決，請聯絡管理員`)
        }).then(response => {
            console.log(response)
            history.push('/config/menu')
        })
    }

    function handleChangeImage(evt) {
        console.log("Uploading");
        var reader = new FileReader();
        var file = evt.target.files[0];

        reader.onload = function (upload) {
            console.log(file)
            setImage(upload.target.result);
            const formData = new FormData()
            formData.append('image', file)
            setUploading(true)
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + storeId + '/images', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session}`
                },
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                return response.text().then(res => {
                    throw new Error(res)
                })
            }).catch((error) => {
                console.log(error.message)
                let response = JSON.parse(error.message)
                window.alert(`${response.message}\n與伺服器連線錯誤，請再試一次\n如果問題無法解決，請聯絡管理員`)
            }).then(response => {
                console.log(typeof response)
                //window.alert(response)
                setImageUrl(response.result.data)
                window.alert(response.result.data)
                setUploading(false)
            })
        };
        reader.readAsDataURL(file);
        console.log("Uploaded");
    }

    async function firstFetch() {
        //instant fetch settings from history
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + storeId + '/products/' + uid
        try {
            const data = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Accept': 'application/json'
                }
            })
            let parsed = await data.json()
            setPrice(parsed['price'])
            setName(parsed['name'])
            setSubtitle(parsed['description'])

            setImageUrl(parsed['image'])
            console.log(parsed)
        } catch (err) {
            window.alert(
                `錯誤!!!
error: ${err}
立即返回首頁
`)
            document.location.href = '/'
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
                        <div className="form-group">
                            <label>食物名</label>
                            <input type="text"
                                className="form-control"
                                placeholder="標題"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <label>價錢</label>
                            <input type="text"
                                className="form-control"
                                placeholder="價錢"
                                value={price}
                                onChange={e => setPrice(parseInt(e.target.value))}
                                required />
                        </div>
                        <div className="form-group">
                            <label>副標題</label>
                            <input type="text"
                                className="form-control"
                                placeholder="副標題"
                                value={subtitle}
                                onChange={e => setSubtitle(e.target.value)}
                                required />
                        </div>
                        <Row>
                            <Col>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <center>
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
                                </center>
                            </Col>
                        </Row>
                        <Row>
                            <div className="h-100 align-items-center">
                                <div id="placeToAdd" />
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <button className="btn btn-primary btn-block">送出</button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </section>
        </div>
    )
}