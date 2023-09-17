import "../dashboard.css"
import "./addtrade.css"
import {useGlobalContext} from "../../../context/globalContext"
import customFetch from "../../../utils"
import {useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {login} from "../../../features/userSlice"
import {toast} from "react-toastify"

const AddTrade = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((store) => store.user)
    const {
        stock,
        setStock,
        accBefore,
        setAccBefore,
        accAfter,
        setAccAfter,
        date,
        setDate,
        time,
        setTime,
        action,
        setAction,
    } = useGlobalContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data} = await customFetch.post("/newtrade", {
            id: user.id,
            stock: stock.toUpperCase(),
            accBefore: accBefore,
            accAfter: accAfter,
            pl: Number(accAfter) - Number(accBefore),
            date: date,
            time: time,
            action: action,
        })
        const infoUpdate = await customFetch.patch("/updateaccbalance", {
            id: user.id,
            setAcc: accAfter,
        })
        if (infoUpdate.data.message === "success") {
            dispatch(
                login({
                    id: data.id,
                    trades: data.trades,
                    info: infoUpdate.data.info,
                    notes: user.notes,
                    layouts: user.layouts,
                })
            )
            navigate("/dashboard")
        } else {
            toast.error("There was an error")
        }
        setStock("")
        setAccBefore("")
        setAccAfter("")
        setDate("")
        setTime("")
        setAction("")
    }

    return (
        <form className="addtrade" onSubmit={handleSubmit}>
            <h2 className="graph-title">Add trade</h2>
            <div className="addtrade-stock-input">
                <label htmlFor="stock">Stock : </label>
                <input
                    type="text"
                    name="stock"
                    id="stock"
                    placeholder="AAPL"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </div>
            <div className="addtrade-stock-input">
                <label htmlFor="action">Action: </label>
                <select
                    name="action"
                    onChange={(e) => setAction(e.target.value)}
                    value={action}
                    required>
                    <option value="">Long / Short</option>
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                </select>
            </div>
            <div className="addtrade-account-input-container">
                <div className="addtrade-account-input">
                    <label htmlFor="stock">Account Before : </label>
                    <input
                        type="number"
                        name="acc-bef"
                        id="acc-bef"
                        placeholder="1000.00"
                        value={accBefore}
                        onChange={(e) => setAccBefore(e.target.value)}
                        required
                    />
                </div>
                <div className="addtrade-account-input">
                    <label htmlFor="stock">Account After : </label>
                    <input
                        type="number"
                        name="acc-aft"
                        id="acc-aft"
                        placeholder="10000.00"
                        value={accAfter}
                        onChange={(e) => setAccAfter(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="addtrade-account-input">
                <label htmlFor="pl" id="pl-label">
                    Trade +/- $ :{" "}
                </label>
                <input
                    type="text"
                    name="pl"
                    id="pl"
                    placeholder="+100.00"
                    value={(Number(accAfter) - Number(accBefore)).toFixed(2)}
                    readOnly
                />
            </div>
            <div className="addtrade-daytime-inputs-container">
                <div className="addtrade-daytime-inputs">
                    <div className="addtrade-daytime-input">
                        <label htmlFor="date">Date :</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addtrade-daytime-input">
                        <label htmlFor="time">Time :</label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="addtrade-btn">
                <button type="submit">Add Trade</button>
            </div>
        </form>
    )
}
export default AddTrade
