import Link from 'next/link'
export default function SideBar() {
    return (
        <div className="sidebar">
            <li><Link href="/settings/personal">個人檔案</Link></li>
        </div>
    )
}