import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import * as ga from '../components/GA'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { TextField } from "@material-ui/core";


export default function Navigation() {
    const [accountType, setAccountType] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [color, setColor] = useState('light')
    const router = useRouter()

    function handleRouteChange(url) {
        ga.pageview(url)
    }

    useEffect(() => {
        console.log(accountType)
        setAccountType(localStorage.getItem('account_type'))
        if (localStorage.getItem('session') === null) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    function searchProduct() {
        console.log('search')
        router.push(`/query?q=${searchTerm}`)
    }


    return (
        <Navbar bg="light"
            expand="lg"
            collapseOnSelect={true}
            variant={color}
        >
            <Navbar.Brand href="/" style={{ textDecoration: "none" }}>美廣訂餐系統</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/restaurant" style={{ textDecoration: "none" }}>餐廳</Nav.Link>
                    {accountType === '2' && <NavDropdown title="商家管理" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/config/menu" style={{ textDecoration: "none" }}>菜單設定</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/service" style={{ textDecoration: "none" }}>客服服務</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/booked" style={{ textDecoration: "none" }}>出餐</NavDropdown.Item>
                    </NavDropdown>}
                    <NavDropdown title="外部連結" id="basic-nav-dropdown" style={{ textDecoration: "none" }}>
                        <NavDropdown.Item href="https://sites.google.com/view/tnfshsu/"
                            rel="noreferrer noopener"
                            target="_blank"
                            style={{ textDecoration: "none" }}>學聯會</NavDropdown.Item>
                        <NavDropdown.Item href="https://tnfsacec.github.io"
                            rel="noreferrer noopener"
                            target="_blank"
                            style={{ textDecoration: "none" }}>選委會</NavDropdown.Item>
                    </NavDropdown>
                    <form onSubmit={event => {
                        event.preventDefault();
                        searchProduct();
                    }}>
                        <TextField value={searchTerm}
                            onChange={event => { setSearchTerm(event.target.value) }}
                            label="搜尋想吃的"
                            variant="outlined"
                            size="small"
                        />
                    </form>
                </Nav>
                {isLoggedIn ? <NavDropdown title={`嗨~ ${localStorage.getItem('user_name')}`} id="basic-nav-dropdown" style={{textDecoration: "none"}}>
                    <NavDropdown.Item href="/history" style={{textDecoration: "none"}}>歷史紀錄</NavDropdown.Item>
                    <NavDropdown.Item href="/settings" style={{textDecoration: "none"}}>設定</NavDropdown.Item>
                    <NavDropdown.Item onClick={signOut} style={{textDecoration: "none"}}>登出</NavDropdown.Item>
                </NavDropdown>
                    :
                    <Nav>
                        <Nav.Link href="/signup" 
                            style={{textDecoration: "none"}}>註冊</Nav.Link>
                        <Nav.Link href="/login" 
                            style={{textDecoration: "none"}}>登入</Nav.Link>
                    </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
}