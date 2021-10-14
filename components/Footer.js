export default function Footer() {
    return (
        <>
            <section id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div id="copyright">
                                <ul className="links">
                                    <li>&copy; <a href={"https://tfcis.org"}>TFCIS.</a> All rights reserved.</li>
                                    <li>Frontend: <a href="https://sivir.pw">Milliax</a></li>
                                    <li>Backend: <a href="https://hsuan.app">Hsuan</a></li>
                                    <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                                    <li>最後更新時間：{new Date().toUTCString()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<New />*/}
        </>
    )
}

function New() {
    return (
        <div id="footer" className="absolute">
            <div className="w-4/5 justify-center grid grid-cols-3 gap-4 bg-Cgray ">
                <div className="text-xl font-semibold text-black">&copy; <a href="https://tfcis.org">TFCIS.</a> All rights reserved.</div>
                <div className="text-xl font-semibold text-black">Frontend: <a href="https://sivir.pw">Milliax</a></div>
                <div className="text-xl font-semibold text-black">Backend: <a href="https://hsuan.app">Hsuan</a></div>
                <div className="text-xl font-semibold text-black">Design: <a href="http://html5up.net">HTML5 UP</a></div>
                <div className="text-xl font-semibold text-black">最後更新時間</div>

            </div>
        </div>
    )
}