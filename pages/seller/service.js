import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'
import { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSelector} from 'react-redux'
//deprecated
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";


export default function Service() {
    const [quota, setQuota] = useState({})
    const [loading, setLoading] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])
    const [plans, setPlans] = useState([])
    
    const storeId = useSelector(state => state.profile.store_id)
    const session = useSelector(state => state.profile.session)

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
        async function init() {
            setLoading(true)
            await Promise.all([getDiskQuota(), getPlans(), getSubscriptions()])
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div id="page-wrapper">
            <Title title="????????????"
                link="/seller/service" />

            <Authenticate seller="true" />
            <section id="main">
                {loading &&
                    <center><Spinner animation={"border"} /></center>
                }
                <div className="container" key="static">
                    <Row>
                        <Col>
                            <Card className={["m-3", "p-3"]}>
                                <h5>????????????ID?????? <b>{storeId}</b></h5>
                                <Card className={["m-3", "p-3"]} key="storage">
                                    <div hidden={!quota.exceed_quota}>
                                        ??????????????????
                                    </div>
                                    <div>
                                        ?????????????????? {(quota.remain / 1024000).toFixed(2)} Mb / {quota.total} Mb
                                        (??????{(((quota.total - (quota.remain / 1024000)) / quota.total) * 100).toFixed(2)}%)
                                    </div>
                                </Card>
                                <Card className={["m-3", "p-3"]} key="possessed">
                                    ????????????????????????
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>????????????</th>
                                                <th>??????</th>
                                                <th>????????????</th>
                                                <th>????????????</th>
                                                <th>????????????</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscriptions && subscriptions.map(item => (
                                                <tr key={`${item.plan.name}??????`}>
                                                    <td>{item.plan.name}</td>
                                                    <td>{item.plan.description}</td>
                                                    <td>{item.plan.disk_quota ?? 0} Mb</td>
                                                    <td>{item.plan.promotion_quota ?? 0} ???</td>
                                                    <td>{item.expires_at ?? "????????????"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>

                                <Card className={["m-3", "p-3"]}>
                                    ????????????????????????
                                    <div className="alert alert-danger">?????????????????????????????????</div>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>????????????</th>
                                                <th>??????</th>
                                                <th>????????????</th>
                                                <th>????????????</th>
                                                <th>??????</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {plans && plans.map(item => (
                                                <tr key={`${item.name}-buyable`}>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.disk_quota ?? 0} Mb</td>
                                                    <td>{item.promotion_quota ?? 0} ???</td>
                                                    <td>
                                                        <a href={`${process.env.NEXT_PUBLIC_API_HOST}${storeId}/${item.id}/sendOrder`} rel="noreferrer noopenner nofollow" className="btn btn-primary" target={"_blank"}>??????</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                    <div className="justify-center w-full items-center text-center">
                        <span className="text-2xl">Contact: ryanchang1117@gmail.com</span>
                    </div>
                </div>
            </section>
        </div>
    )
}