import "../dashboard.css"
import "./addtrade.css"
import customFetch from "../../../utils"
import {useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {login} from "../../../features/userSlice"
import {toast} from "react-toastify"
import {setAcc, setState} from "../../../features/addTradeFormSlice"
import {setPl} from "../../../features/addTradeFormSlice"

const AddTrade = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((store) => store.user)

    const {stock, pl, date, time, action} = useAppSelector(
        (store) => store.addTrade
    )

    const calcAcc = (pl: number) => {
        return {
            accBefore: Number(user.info.account),
            accAfter: Number(user.info.account) + pl,
        }
    }

    // SEND TRADE DATA TO DB ON SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const {accBefore, accAfter} = calcAcc(pl)
        dispatch(setAcc({accAfter: accAfter, accBefore: accBefore}))

        const {data} = await customFetch.post("/newtrade", {
            id: user.id,
            stock: stock.toUpperCase(),
            accAfter: accAfter,
            accBefore: accBefore,
            pl: pl,
            date: date,
            time: time,
            action: action,
        })
        const infoUpdate = await customFetch.patch("/updateaccbalance", {
            id: user.id,
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
                    onChange={(e) => dispatch(setPl(e.target.value))}
                    required
                />
                <label
                    htmlFor="pl"
                    id="pl-label"
                    className={pl ? "label-up" : ""}>
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
