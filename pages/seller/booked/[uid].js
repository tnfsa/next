import { useEffect, useState } from 'react'
import Title from '../../../components/Title'
import Authenticate from '../../../components/authenticate'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core'
import { faCheck, faTimes, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'

//deprecated
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DetailBooked() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [productName, setProductName] = useState('')
    const cookies = new Cookies()
    const allcookies = cookies.getAll()
    const [changes, setChanges] = useState(0)
    const router = useRouter()
    const { uid } = router.query
    const transactions = async () => {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + allcookies['storeId'] + '/transactions'
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${allcookies['session']}`
            }
        })
        const json = await result.json()
        let toReturn = []

        for (const index in json) {
            if (json[index]['product_id'] === uid) {
                toReturn.push(json[index])
            }
        }

        return toReturn
    }

    const getName = async () => {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/stores/' + allcookies['storeId'] + '/products'
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${allcookies['session']}`
            }
        })
        const json = await result.json()
        let foodName = 'temp'

        for (const index in json) {
            if (json[index]['id'] === uid) {
                foodName = json[index]['name']
                break;
            }
        }

        return foodName
    }

    const getInfo = async () => {
        try {
            const result = await Promise.all([transactions(), getName()])

            setLoading(false)
            setProductName(result[1])
            setData(result[0])
            setChanges(0)
            console.log(result[0])
        } catch (err) {
            window.alert(err)
            cookies.set('alert', '讀取錯誤，正在返回首頁', { path: '/' })
            document.location.href = '/'
        }
    }

    function finished(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'OK').then(() => {
            setChanges(changes + 1)
        })
    }

    function preparing(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'PREPARE').then(() => {
            setChanges(changes + 1)
        })
    }

    function taken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'DONE').then(() => {
            setChanges(changes + 1)
        })
    }

    function notaken(transaction_id) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/transactions/' + transaction_id
        sendStatus(url, 'NOTAKEN').then(() => {
            setChanges(changes + 1)
        })
    }

    const sendStatus = async (url, status) => {
        let flag = null
        try {
            const rawData = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${allcookies['session']}`
                },
                body: JSON.stringify({
                    'status': status
                })
            })
            const parsed = await rawData.json()
            console.log(parsed)
            if (rawData.ok) {
                flag = true
            } else {
                flag = false
            }
        } catch (err) {
            window.alert(`狀態更新失敗：${err}`)
            flag = false
        }
        return flag
    }

    useEffect(() => {
        if(uid !== "undefined"){
            getInfo()
        }
        // eslint-disable-next-line
    }, [changes,uid])

    return (
        <div id="page-wrapper">
            <Title title={`詳細資料-${productName}`}
                link={`/seller/booked/${uid}`} />
            <Authenticate seller="true" />
            <section id="main">
                <div>
                    {
                        data ? data.map((item) =>
                            <Card key={item.id}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={10} md={10} lg={10}>
                                            <Card.Title>交易編號：{item.id}</Card.Title>
                                            <Card.Text>備註：{item.comment}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button
                                                    variant="contained"
                                                    color={item.status === 'PREPARE' ? 'secondary' : ''}
                                                    onClick={() => {
                                                        preparing(item.id)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Button
                                                    variant="contained"
                                                    color={item.status === 'OK' ? 'primary' : ''}
                                                    onClick={() => {
                                                        finished(item.id)
                                                    }}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Button
                                                    variant="contained"
                                                    color={item.status === 'DONE' ? 'primary' : ''}
                                                    onClick={() => {
                                                        taken(item.id)
                                                    }}>
                                                    <FontAwesomeIcon icon={faUserCheck} />
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Button
                                                    variant="contained"
                                                    color={item.status === 'NOTAKEN' ? 'secondary' : ''}
                                                    onClick={() => {
                                                        notaken(item.id)
                                                    }}>
                                                    <FontAwesomeIcon icon={faUserSlash} />
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ) : <React.Fragment><br /><h2 style={{ textAlign: 'center' }}>查無資料</h2></React.Fragment>
                    }
                </div>
            </section>
        </div>
    )
}