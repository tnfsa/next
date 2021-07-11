import Title from "../components/Title";
import Footer from "../components/Footer";
import GoogleOAuth from "../components/Login/GoogleOAuth";
import LoginForm from '../components/Login/LoginForm'

export default function Login() {
    return (
        <div id="page-wrapper">
            <Title title="登入"
                   link="/login"/>

            <section id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-12-medium">
                            <h2>商家登入</h2>
                            <LoginForm />
                        </div>
                        <div className="col-6 col-12-medium">
                            <h2>學生登入</h2>
                            <br />
                            <GoogleOAuth />
                        </div>
                    </div>

                </div>
            </section>
            <Footer/>
        </div>
    )
}