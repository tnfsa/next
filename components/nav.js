import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/router";
import * as ga from '../components/GA'

export default function Nav() {
    const [current, setCurrent] = useState()
    const [accountType, setAccountType] = useState(0)
    const router = useRouter()
    console.log(router.query)

    function handleRouteChange(url) {
        ga.pageview(url)
    }

    useEffect(() => {
        switch (router.pathname) {
            case "/restaurant":
                setCurrent(1)
                break;
            case "/signup":
            case "/login":
                setCurrent(3)
                break;
            case "/":
                setCurrent(0)
                break;
        }
        console.log()
        switch(localStorage.getItem('account_type')){
            case "1":
                setAccountType(1)
                break;
            case "2":
                setAccountType(2)
                break;
            default:
                setAccountType(0)
                break;
        }
        console.log(accountType)
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    const goTo = (obj)=>{
        if(obj === undefined){
            return
        }
        const target = `/${obj.target[obj.target.options.selectedIndex].value}`
        router.push(target)
    }

    return (
        <nav id="nav">
            <ul>
                <li className={current === 0 && "current"}><Link href="/">首頁</Link></li>
                <li className={current === 1 && "current"}><Link href="/restaurant">餐廳</Link></li>
                <li>
                    <a href="#">外部連結</a>
                    <ul>
                        <li><a href="#">臺南一中學聯會</a></li>
                        <li><a href="#">臺南一中選舉委員會</a></li>
                    </ul>
                </li>
                {/*未登入*/}
                {accountType === 0 && <>
                    <li>
                        <a href="/login">登入</a>
                        <ul>
                            <li><a href="/signup">註冊</a></li>
                        </ul>
                    </li>
                </>}
                {/*學生*/}
                {accountType === 1 && <>
                    <select onChange={goTo}>
                        <option value="selected">嗨! {localStorage.getItem('user_name')}</option>
                        <option value="settings">個人設定</option>
                        <option value="history">訂餐紀錄</option>
                        <option value="logout">登出</option>
                    </select>
                </>}
                {/*店家*/}
                {accountType === 2 && <>
                    <select onChange={goTo}>
                        <option value="selected">嗨! {localStorage.getItem('user_name')}</option>
                        <option value="settings">設定</option>
                        <option value="logout">登出</option>
                    </select>
                </>}
            </ul>
        </nav>
    )
}