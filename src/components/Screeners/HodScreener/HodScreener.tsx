import "./hod.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {setHodData} from "../../../features/screenerSlice"

interface IProps {
    height?: number
    width?: number
    x?: number
    y?: number
}

const HodScreener = ({height, width, x, y}: IProps) => {
    const dispatch = useAppDispatch()
    const {hodData} = useAppSelector((store) => store.screener)

    // GET DATA FROM SERVER
    const socket = new WebSocket("ws://localhost:3001")
    socket.onopen = () => {
        console.log("Connected to WebSocket server")
    }
    socket.onmessage = (event) => {
        const stockData = event.data
        if (stockData !== "Client connected") {
            dispatch(setHodData(JSON.parse(stockData)))
        }
        console.log(`Received from server: ${stockData}`)
    }

    // FORMAT LARGE NUMBERS
    const formatFloat = (flt: number) => {
        if (flt > 1_000_000_000) {
            return String((flt / 1_000_000_000).toFixed(2)) + "B"
        }

        if (flt > 1_000_000) {
            return String((flt / 1_000_000).toFixed(2)) + "M"
        }

        if (flt > 1_000) {
            return String((flt / 1_000).toFixed(2)) + "K"
        }
    }

    return (
        <section
            className="hod"
            id="hod"
            style={{
                height: `${height}%`,
                width: `${width}%`,
                left: `${x}%`,
                top: `${y}%`,
            }}>
            <div className="screener-header">
                <div>
                    <p>Time</p>
                </div>
                <div>
                    <p>Stock</p>
                </div>
                <div>
                    <p>Price</p>
                </div>
                <div>
                    <p>Float</p>
                </div>
                <div>
                    <p>Volume</p>
                </div>
                <div>
                    <p>Rel. vol.</p>
                </div>
            </div>
            <div className="screener-main">
                {hodData.length ? (
                    hodData.reverse().map((stockObj, index) => {
                        const {stock, time, price, float, volume, relVolume} =
                            stockObj
                        return (
                            <div className="hod-stock" key={index}>
                                <div>
                                    <p>{time}</p>
                                </div>
                                <div>
                                    <p>{stock?.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p>${price}</p>
                                </div>
                                <div>
                                    <p>{formatFloat(float)}</p>
                                </div>
                                <div>
                                    <p>{formatFloat(volume)}</p>
                                </div>
                                <div>
                                    <p>{relVolume.toFixed(2)}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <></>
                )}
            </div>
        </section>
    )
}
export default HodScreener
