import {useEffect,useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/router";
import * as ga from '../components/GA'

export default function Nav(){
    const [current,setCurrent] = useState()
    const router = useRouter()
    console.log(router.query)
    function handleRouteChange(url){
        ga.pageview(url)
    }

    useEffect(()=>{
        switch(router.pathname){
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
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    },[router.events])
    return(
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
                <li className={current === 3 && "current"}>
                    <Link href="/login">登入</Link>
                    <ul>
                        <li className={""}><Link href="/signup">註冊</Link></li>
                    </ul>
                </li>

            </ul>
        </nav>
    )
}