import "../dashboard.css"
import "./addtrade.css"
import customFetch from "../../../utils"
import {useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {login} from "../../../features/userSlice"
import {toast} from "react-toastify"
import {setState} from "../../../features/addTradeFormSlice"
import {useState} from "react"

const AddTrade = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((store) => store.user)
    const [pl, setPl] = useState<string>()

    const {stock, accBefore, accAfter, date, time, action} = useAppSelector(
        (store) => store.addTrade
    )

    // SEND TRADE DATA TO DB ON SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(setState({prop: "accAfter", value: ""}))
        dispatch(setState({prop: "accBefore", value: ""}))
        dispatch(setState({prop: "action", value: ""}))
        dispatch(setState({prop: "date", value: ""}))
        dispatch(setState({prop: "stock", value: ""}))
        dispatch(setState({prop: "time", value: ""}))
    }

    return (
        <form className="add-trade" onSubmit={handleSubmit}>
            <h3>Add trade</h3>
            <div className="add-trade-input">
                <input
                    type="text"
                    name="stock"
                    id="stock"
                    value={stock}
                    onChange={(e) =>
                        dispatch(
                            dispatch(
                                setState({prop: "stock", value: e.target.value})
                            )
                        )
                    }
                    required
                />
                <label htmlFor="stock" className={stock ? "label-up" : ""}>
                    Stock :{" "}
                </label>
            </div>
            <div className="add-trade-input">
                <select
                    name="action"
                    onChange={(e) =>
                        dispatch(
                            setState({prop: "action", value: e.target.value})
                        )
                    }
                    value={action}
                    required>
                    <option value=""></option>
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                </select>
                <label htmlFor="action" className={action ? "label-up" : ""}>
                    Action:{" "}
                </label>
            </div>
            <div className="add-trade-input">
                <input
                    type="text"
                    name="pl"
                    id="pl"
                    value={pl}
                    onChange={(e) => setPl(e.target.value)}
                    required
                />
                <label
                    htmlFor="pl"
                    id="pl-label"
                    className={pl?.length ? "label-up" : ""}>
                    Trade +/- $ :{" "}
                </label>
            </div>
            <div className="add-trade-input">
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) =>
                        dispatch(
                            setState({
                                prop: "date",
                                value: e.target.value,
                            })
                        )
                    }
                    required
                />
            </div>
            <div className="add-trade-input">
                <input
                    type="time"
                    name="time"
                    id="time"
                    value={time}
                    onChange={(e) =>
                        dispatch(
                            setState({
                                prop: "time",
                                value: e.target.value,
                            })
                        )
                    }
                    required
                />
            </div>
            <div className="add-trade-btn">
                <button type="submit">
                    <h5>Add Trade</h5>
                </button>
            </div>
        </form>
    )
}
export default AddTrade
