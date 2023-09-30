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
            <div className="starter-page">
                <h1 className="title">EasyTrading</h1>
                <h6>Trading screeners, trackers and more</h6>
            </div>
            <img
                className="background-image"
                src={backImage}
                alt="background image"
            />
            <div className="decorative-landing-div"></div>
        </section>
    )
}
export default LandingPage
