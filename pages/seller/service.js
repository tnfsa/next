import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import Swal from "sweetalert2";
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//deprecated
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";


export default function Service() {
    const [quota, setQuota] = useState({})
    const [loading, setLoading] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])
    const [plans, setPlans] = useState([])
    const cookies = new Cookies()
    const storeId = cookies.get('store_id')
    const session = cookies.get('session')

    async function getDiskQuota() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/disk_quota`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session}`
            }
        })
        const response = await res.json()
        console.log(response.remain)
        setQuota(response)
    }

    async function getSubscriptions() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/subscriptions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session}`
            }
        })
        const response = await res.json()
        console.log(response)
        setSubscriptions(response)
    }

    async function getPlans() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/plans`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session}`
            }
        })
        const response = await res.json()
        console.log(response)
        setPlans(response)
    }

    useEffect(() => {
        init()
    }, [])

    async function init() {
        setLoading(true)
        await Promise.all([getDiskQuota(), getPlans(), getSubscriptions()])
        setLoading(false)
    }

    return (
        <div id="page-wrapper">
            <Title title="加值服務"
                link="/seller/service" />

            <Authenticate seller="true" />
            <section id="main">
                {loading &&
                    <center><Spinner animation={"border"} /></center>
                }
                <div className="container">
                    <Row>
                        <Col>
                            <Card className={["m-3", "p-3"]}>
                                <h5>您的店家ID為： <b>{storeId}</b></h5>
                                <Card className={["m-3", "p-3"]}>
                                    <div hidden={!quota.exceed_quota}>
                                        儲存空間已滿
                                    </div>
                                    <div>
                                        儲存空間剩餘 {(quota.remain / 1024000).toFixed(2)} Mb / {quota.total} Mb
                                        (已用{(((quota.total - (quota.remain / 1024000)) / quota.total) * 100).toFixed(2)}%)
                                    </div>
                                </Card>
                                <Card className={["m-3", "p-3"]}>
                                    您擁有的方案列表
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>方案名稱</th>
                                                <th>說明</th>
                                                <th>儲存容量</th>
                                                <th>宣傳點數</th>
                                                <th>到期時間</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscriptions && subscriptions.map(item => (
                                                <tr>
                                                    <td>{item.plan.name}</td>
                                                    <td>{item.plan.description}</td>
                                                    <td>{item.plan.disk_quota ?? 0} Mb</td>
                                                    <td>{item.plan.promotion_quota ?? 0} 點</td>
                                                    <td>{item.expires_at ?? "永久有效"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>

                                <Card className={["m-3", "p-3"]}>
                                    可購買的方案列表
                                    <div className="alert alert-danger">目前為測試階段請勿付款</div>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>方案名稱</th>
                                                <th>說明</th>
                                                <th>儲存容量</th>
                                                <th>宣傳點數</th>
                                                <th>購買</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {plans && plans.map(item => (
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.disk_quota ?? 0} Mb</td>
                                                    <td>{item.promotion_quota ?? 0} 點</td>
                                                    <td>
                                                        <a href={`${process.env.NEXT_PUBLIC_API_HOST}${storeId}/${item.id}/sendOrder`} rel="noreferrer noopenner nofollow" className="btn btn-primary" target={"_blank"}>購買</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                    <span style={{ fontSize: '10px' }}>Contact: ryanchang1117@gmail.com</span>
                </div>
            </section>
        </div>
    )
}