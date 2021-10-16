import Link from 'next/link'
import Authenticate from '../authenticate'

import {useSelector} from 'react-redux'

export default function SideBar() {
    const accountType = useSelector(state => state.profile.account_type)

    return (
        <>
            <Authenticate />
            <ul className="w-1/5 list-none space-y-2" key="navigation">

                <li className="block w-full bg-gray-200 rounded-2xl text-center p-2">
                    <Link href="/settings/personal" passHref>
                        <a className="block md:text-2xl text-md">個人設定</a>
                    </Link>
                </li>
                {accountType === "store_manager" &&
                    < li className="block w-full bg-gray-200 rounded-2xl text-center p-2">
                        <Link href="/settings/store" passHref>
                            <a className="block md:text-2xl text-md">商家設定</a>
                        </Link>
                    </li>
                }

            </ul>
        </>
    )
}