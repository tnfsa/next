import { useSelector } from 'react-redux'

export default function LoggedInAlert() {
    const session = useSelector(state => state.profile.session)
  

    return (
        <>
            {session === null &&
                <div className="bg-red-600 p-2">
                    <h1 className="font-bold text-2xl text-center">點餐前請先登入</h1>
                </div>
            }
        </>
    )
}