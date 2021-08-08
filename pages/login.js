import Title from "../components/Title";
import Footer from "../components/Footer";
import GoogleOAuth from "../components/Login/GoogleOAuth";
import LoginForm from '../components/Login/LoginForm'

export default function Login() {
    return (
        <div id="page-wrapper">
            <Title title="登入"
                link="/login" />

            <section id="main">
                <div className="px-10 flex md:flex-row flex-col-reverse justify-center items-center md:items-start">
                    <div className="md:w-1/2 w-2/3 h-60 p-2">
                        <h2>商家登入</h2>
                        <LoginForm />
                    </div>
                    <div className="md:w-1/2 w-2/3 h-40 p-2">
                        <h2>學生登入</h2>
                        <br />
                        <div className="h-8">
                            <GoogleOAuth />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}