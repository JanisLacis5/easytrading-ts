import backImage from "../../photos/candlestick-chart.jpg"
import "./landingpage.css"
import {useEffect} from "react"
import {setIsNotLoading} from "../../features/userSlice"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"

const LandingPage = () => {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector((store) => store.user)

    useEffect(() => {
        dispatch(setIsNotLoading())
    }, [])

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <section className="landing-page">
            <section className="hero">
                <div className="starter-page">
                    <div>
                        <h1 className="title">EasyTrading</h1>
                        <h5>Trading screeners, trackers and more</h5>
                    </div>
                    <a href="#about">
                        <div>
                            <h6>Get Started</h6>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </a>
                </div>
                <img
                    className="background-image"
                    src={backImage}
                    alt="background image"
                />
                <div className="landing-shadow"></div>
            </section>
            <section className="about" id="about">
                <div className="about-image"></div>
                <div className="about-text">
                    <h3>All the trading tools you need</h3>
                    <h5>
                        Welcome to EasyTrading, your go-to platform for in-depth
                        stock market trade analysis. Our user-friendly tools
                        empower traders to make informed decisions, track their
                        portfolio performance, and gain valuable insights into
                        their investments. Join us on the journey to financial
                        success today!
                    </h5>
                </div>
            </section>
            <section className="about-analysis">
                <div>
                    <h3>Analyze your past trades</h3>
                    <div className="analysis-image"></div>
                </div>
                <h5>
                    Explore our intuitive dashboard, where you can effortlessly
                    monitor key trade metrics such as successful trades, losses,
                    and your overall profit and loss. Gain a comprehensive view
                    of your trading performance at a glance, helping you refine
                    your strategies and achieve your financial goals.
                </h5>
            </section>
            <section className="about-screeners">
                <h3>Screeners</h3>
                <div>
                    <h5>
                        Maximize your trading potential with our dual-screening
                        system. Our first screener identifies stocks with the
                        biggest gap percentage, helping you capitalize on
                        early-morning volatility. Meanwhile, our second screener
                        scans for stocks approaching their high of the day,
                        ensuring you never miss out on momentum plays. Unlock
                        the power of precision trading with us
                    </h5>
                    <div className="images">
                        <div className="first-image"></div>
                        <div className="second-image"></div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default LandingPage
