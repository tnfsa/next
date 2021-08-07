import Link from 'next/link'
export default function SideBar() {

    const menu = [
        {
            "link": "personal",
            "text": "個人設定"
        }
    ]

    return (
        <ul className="w-1/5 list-none">
            {menu.map((item) => (
                <li className="block w-full bg-gray-200 rounded-2xl h-10 text-center p-1">
                    <Link href={`/settings/${item.link}`} passHref>
                        <a className="block">{item.text}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}