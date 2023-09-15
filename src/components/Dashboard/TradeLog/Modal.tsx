import {RxCross1} from "react-icons/rx"
import {useGlobalContext} from "../../../context/globalContext"
import {useDispatch} from "react-redux"
import {clearTrades} from "../../../features/userSlice"

const Modal = () => {
    const dispatch = useDispatch()
    const {setShowModal} = useGlobalContext()

    return (
        <div className="remove-modal">
            <div>
                <RxCross1 className="remove-modal-cross" />
            </div>
            <h1>Remove all trades?</h1>
            <p>When you click "YES", this change is permanent</p>
            <div className="remove-modal-btn-container">
                <button
                    type="button"
                    onClick={() => {
                        dispatch(clearTrades())
                        setShowModal(false)
                    }}>
                    YES
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowModal(false)
                    }}>
                    NO
                </button>
            </div>
        </div>
    )
}
export default Modal
