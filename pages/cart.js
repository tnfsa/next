import Title from '../components/Title'
import Authenticate from '../components/authenticate'

export default function Cart() {
    return (
        <div id="page-wrapper">
            <Title title="Go物車"
                link="/cart" />
            <Authenticate option="student" />
            <section id="main">
                <div className="text-center font-black">暫未開放</div>
            </section>
        </div>
    )
}