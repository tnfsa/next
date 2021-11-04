import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/router";
import * as ga from '../components/GA'
// TODO: consider refactor the navbar into tailwind css
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {TextField, LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux"
import {store} from '../redux/store';

export default function Navigation() {
    const [accountType, setAccountType] = useState(useSelector(state => state.profile.account_type));
    const [session, setSession] = useState(useSelector(state => state.profile.session))
    const [user_name, setUserName] = useState(useSelector(state => state.profile.username))

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingProcess, setLoadingProcess] = useState(0);
    const [color, setColor] = useState('light');
    const [navbarExpanded, setNavbarExpended] = useState(false)
    const router = useRouter();

    store.subscribe(() => {
        setUserName(store.getState().profile.username)
        setSession(store.getState().profile.session)
        setAccountType(store.getState().profile.account_type)
        setColor(store.getState().settings.theme)
    })

    function handleRouteChange(url, status) {
        switch (status) {
            case "start":
                setNavbarExpended(false)
                setLoading(true)
                setLoadingProcess(20)
                break;
            default:
                ga.pageview(url)
                setLoadingProcess(100)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
        }

    }

    useEffect(() => {
        router.events.on('routeChangeStart', (event) => {
            handleRouteChange(event, "start")
        })
        router.events.on('routeChangeComplete', (event) => {
            handleRouteChange(event, "end")
        })

        return () => {
            router.events.off('routerChangeStart', (event) => {
                handleRouteChange(event, "start")
            })
            router.events.off('routeChangeComplete', (event) => {
                handleRouteChange(event, "end")
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.events])

    function searchProduct() {
        console.log('search')
        router.push(`/query?q=${searchTerm}`)
    }

    function navToggle() {
        if (navbarExpanded === true)
            return setNavbarExpended(false)
        setNavbarExpended(true)
    }

    return (
        <>
            {loading && <LinearProgress variant="determinate" value={loadingProcess}/>}
            <Navbar bg="light"
                    expand="lg"
                    expanded={navbarExpanded}
                    variant={color}
                    onToggle={navToggle}
            >
                <Navbar.Brand><Link href="/" prefetch={false}>美廣訂餐系統</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/restaurant" passHref><Nav.Link className="no-underline">餐廳</Nav.Link></Link>
                        {accountType === "store_manager" &&
                        <NavDropdown title="商家管理" id="basic-nav-dropdown">
                            <Link href="/seller/menu" passHref><NavDropdown.Item
                                className="no-underline">菜單設定</NavDropdown.Item></Link>
                            <Link href="/seller/service" passHref><NavDropdown.Item
                                className="no-underline">客服服務</NavDropdown.Item></Link>
                            <Link href="/seller/booked" passHref><NavDropdown.Item
                                className="no-underline">出餐</NavDropdown.Item></Link>
                        </NavDropdown>}
                        <NavDropdown title="外部連結" id="basic-nav-dropdown">
                            <NavDropdown.Item href="https://sites.google.com/view/tnfshsu/"
                                              rel="noreferrer noopener"
                                              target="_blank">學聯會</NavDropdown.Item>
                            <NavDropdown.Item href="https://tnfsacec.github.io"
                                              rel="noreferrer noopener"
                                              target="_blank">選委會</NavDropdown.Item>
                        </NavDropdown>
                        <form onSubmit={event => {
                            event.preventDefault();
                            searchProduct();
                        }}>
                            <TextField value={searchTerm}
                                       onChange={event => {
                                           setSearchTerm(event.target.value)
                                       }}
                                       label="搜尋想吃的"
                                       variant="outlined"
                                       size="small"
                            />
                        </form>
                    </Nav>
                    {session !== null ?
                        <NavDropdown title={`嗨~ ${user_name}`} id="basic-nav-dropdown">
                            {accountType === "student" &&
                            <Link href="/history" passHref><NavDropdown.Item>訂購紀錄</NavDropdown.Item></Link>}
                            <Link href="/settings" passHref><NavDropdown.Item>設定</NavDropdown.Item></Link>
                            <Link href="/logout" passHref><NavDropdown.Item>登出</NavDropdown.Item></Link>
                        </NavDropdown>
                        :
                        <Nav>
                            <Link href="/signup" passHref><Nav.Link>註冊</Nav.Link></Link>
                            <Link href="/login" passHref><Nav.Link>登入</Nav.Link></Link>
                        </Nav>}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

