import Link from 'next/link'
import Authenticate from '../authenticate'
import Cookies from 'universal-cookie'

export default function SideBar() {
    const cookies = new Cookies()
    const accountType = cookies.get('account_type')
    return (
        <>
            <Authenticate />
            <ul className="w-1/5 list-none space-y-2" key="navigation">

                <li className="block w-full bg-gray-200 rounded-2xl h-10 text-center">
                    <Link href="/settings/personal" passHref>
                        <a className="block text-3xl">個人設定</a>
                    </Link>
                </li>
                {accountType === "2" &&
                    < li className="block w-full bg-gray-200 rounded-2xl h-10 text-center">
                        <Link href="/settings/store" passHref>
                            <a className="block text-3xl">商家設定</a>
                        </Link>
                    </li>
                }

            </ul>
        </>
    )
}