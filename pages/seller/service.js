import Authenticate from '../../components/authenticate';
import Title from '../../components/Title'

export default function Service() {
    return (
        <div id="page-wrapper">
            <Title title="加值服務"
                link="/seller/service" />

            <Authenticate seller="true"/>
            <section id="main">
                <div className="container">

                </div>
            </section>
        </div>
    )
}