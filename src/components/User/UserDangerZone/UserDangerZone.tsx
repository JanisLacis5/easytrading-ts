import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./userdangerzone.css"
import {setIsDelete} from "../../../features/dangerZoneSlice"
import {Link} from "react-router-dom"

const UserDangerZone = () => {
    const dispatch = useAppDispatch()

    const {screenWidth} = useAppSelector((store) => store.default)

    return (
        <div className="danger-zone">
            <div className="danger-zone-action">
                <div>
                    <h3>Change password</h3>
                    {screenWidth > 768 && (
                        <p>
                            Wen you choose to change your passsword, this change
                            is inreverasble and unless there is a problem with
                            your existing password this change is not
                            reccomended
                        </p>
                    )}
                </div>
                <div>
                    <Link to="/user-page/change-password">Change</Link>
                </div>
            </div>
            <div className="danger-zone-action">
                <div>
                    <h3>Delete profile</h3>
                    {screenWidth > 768 && (
                        <p>
                            Profile delete option is inreversable and all data
                            from your profile will be deleted from our databases
                        </p>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => dispatch(setIsDelete(true))}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UserDangerZone
