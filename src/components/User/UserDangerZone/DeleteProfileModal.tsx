import {RxCross1} from "react-icons/rx"
import {setAskPassword, setIsDelete} from "../../../features/dangerZoneSlice"
import AskPasswordForm from "./AskPasswordForm"
import {useAppSelector} from "../../../store/storeHooks"

const DeleteProfileModal = () => {
    const {askPassword} = useAppSelector((store) => store.dangerZone)

    return (
        <div className="delete-profile-modal">
            {askPassword ? (
                <AskPasswordForm />
            ) : (
                <>
                    <div className="delete-ptofile-modal-content">
                        <RxCross1 className="delete-cross" />
                    </div>
                    <h2 className="delete-ptofile-modal-content">
                        Are you sure?
                    </h2>
                    <p className="delete-ptofile-modal-content">
                        Pressing "Yes" means that you will never be able to get
                        back your profile
                    </p>
                    <div className="delete-ptofile-modal-content">
                        <div className="delete-modal-button-container">
                            <button
                                type="button"
                                onClick={() => setAskPassword(true)}>
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsDelete(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default DeleteProfileModal
