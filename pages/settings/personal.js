import Title from '../../components/Title'
import Footer from '../../components/Footer'
import SettingsMenu from '../../components/settings/sidebar'

export default function Personal() {
    return (
        <div id="page-wrapper">
            <Title title="設定"
                link={`/settings`} />

            <section id="main">
                <div className="flex p-10">
                    <SettingsMenu />

                    <div className="px-10 w-full">
                        <div className="bg-white w-full">
                            <div id="section-1">
                                <h1 className="text-center text-3xl font-bold">我還沒有想到</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}