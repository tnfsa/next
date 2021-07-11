import Title from "../components/Title";
import Footer from '../components/Footer'

import Input from '../components/Signup/Input'

export default function Signup(){
    return(
        <div id="page-wrapper">
            <Title title="註冊"
                   link="/signup"/>

            <section id="main">
                <div className="container">
                    <Input />
                </div>
            </section>
            <Footer/>
        </div>
    )
}