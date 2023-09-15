import {useState} from "react"
import "./hod.css"

const HodScreener = () => {
    // GET DATA FROM SERVER
    const socket = new WebSocket("ws://localhost:3001")
    const [data, setData] = useState([])
    socket.onopen = (event) => {
        console.log("Connected to WebSocket server")
    }
    socket.onmessage = (event) => {
        const stockData = event.data
        if (stockData !== "Client connected") {
            setData([...data, JSON.parse(stockData)])
        }
        console.log(`Received from server: ${stockData}`)
    }

    // FORMAT LARGE NUMBERS
    const formatFloat = (flt) => {
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
        <section className="hod">
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
                    <p>Relative volume</p>
                </div>
            </div>
            <div className="screener-main">
                {data.length &&
                    data.toReversed().map((stockObj, index) => {
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
                    })}
            </div>
        </section>
    )
}
export default HodScreener
