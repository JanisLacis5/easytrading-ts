import {RxCross1} from "react-icons/rx"
import {useAppDispatch} from "../../../store/storeHooks"
import {clearTrades} from "../../../features/userSlice"
import {setDefaultStateBool} from "../../../features/defaultSlice"

const Modal = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="remove-modal">
            <div>
                <RxCross1 className="remove-modal-cross" />
            </div>
            <h2>Remove all trades?</h2>
            <h5>When you click "YES", this change is permanent</h5>
            <div className="remove-modal-btn-container">
                <button
                    type="button"
                    onClick={() => {
                        dispatch(clearTrades())
                        dispatch(
                            setDefaultStateBool({
                                prop: "showModal",
                                value: false,
                            })
                        )
                    }}>
                    YES
                </button>
                <button
                    type="button"
                    onClick={() => {
                        dispatch(
                            setDefaultStateBool({
                                prop: "showModal",
                                value: false,
                            })
                        )
                    }}>
                    NO
                </button>
            </div>
        </div>
    )
}
export default Modal
