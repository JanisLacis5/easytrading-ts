import {Link} from "react-router-dom"
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
            <img
                className="background-image"
                src={backImage}
                alt="background image"
            />
            <div className="starter-page">
                <div className="title">
                    <h1>EasyTrading</h1>
                </div>
                <div className="description">
                    <h3>Trading trackers, screeners and more</h3>
                    <div className="buttons">
                        <Link to="/about">Read more</Link>
                        <Link to="/pricing">Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LandingPage
