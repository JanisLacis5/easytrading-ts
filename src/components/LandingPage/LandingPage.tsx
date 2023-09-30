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
                    <button type="button">
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
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
                <img
                    className="background-image"
                    src={backImage}
                    alt="background image"
                />
                <div className="landing-shadow"></div>
            </section>
            <section className="about" id="about"></section>
        </section>
    )
}
export default LandingPage
