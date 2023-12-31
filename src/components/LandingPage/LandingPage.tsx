import backImage from "../../photos/candlestick-chart.jpg"
import "./landingpage.css"
import {useEffect} from "react"
import {setIsNotLoading} from "../../features/userSlice"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import {Link} from "react-router-dom"
import Reviews from "./Reviews"
import AboutScreeners from "./AboutScreeners"
import AboutAnalysis from "./AboutAnalysis"
import AboutChatroom from "./AboutChatroom"

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
                    <div className="landing-buttons">
                        <Link to="/login">
                            <div>
                                <h6>Login</h6>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                    />
                                </svg>
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div>
                                <h6>Get Started</h6>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                        </Link>
                    </div>
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
            <AboutAnalysis />
            <AboutScreeners />
            <Reviews />
            <AboutChatroom />
        </section>
    )
}

export default LandingPage
