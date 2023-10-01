import {useEffect} from "react"
import {setIsNotLoading} from "../../features/userSlice"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"

const AboutScreeners = () => {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector((store) => store.user)

    useEffect(() => {
        dispatch(setIsNotLoading())
    }, [])

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <section className="about-screeners">
            <h3>Screeners</h3>
            <div>
                <h5>
                    Maximize your trading potential with our dual-screening
                    system. Our first screener identifies stocks with the
                    biggest gap percentage, helping you capitalize on
                    early-morning volatility. Meanwhile, our second screener
                    scans for stocks approaching their high of the day, ensuring
                    you never miss out on momentum plays. Unlock the power of
                    precision trading with us
                </h5>
                <div className="screeners-images">
                    <div className="first-image"></div>
                    <div className="second-image"></div>
                </div>
            </div>
        </section>
    )
}

export default AboutScreeners
