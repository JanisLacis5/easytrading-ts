import {toast} from "react-toastify"
import {useGlobalContext} from "../../../context/globalContext"
import "./userupdateform.css"
import customFetch from "../../../utils"
import {useDispatch, useSelector} from "react-redux"
import {login, setIsLoading, setIsNotLoading} from "../../../features/userSlice"

const UserUpdateForm = () => {
    const dispatch = useDispatch()

    const {
        updatedUsername,
        setUpdatedUsername,
        updatedEmail,
        setUpdatedEmail,
        updatedAccountBalance,
        setUpdatedAccountBalance,
        updatedProfilePicture,
        setUpdatedProfilePicture,
    } = useGlobalContext()

    const {user} = useSelector((store) => store.user)

    const getImage = (e) => {
        const tgt = e.target
        const files = tgt.files

        if (FileReader && files && files.length) {
            const fr = new FileReader()
            fr.onload = function () {
                setUpdatedProfilePicture(fr.result)
            }
            fr.readAsDataURL(files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (
            !updatedUsername &&
            !updatedEmail &&
            !updatedAccountBalance &&
            !updatedProfilePicture
        ) {
            toast.error("At least one field should be filled")
            return
        }
        dispatch(setIsLoading())

        const {data} = await customFetch.post("/updateuser", {
            id: user.id,
            username: updatedUsername,
            email: updatedEmail,
            balance: updatedAccountBalance,
            image: updatedProfilePicture,
        })
        setUpdatedUsername("")
        setUpdatedEmail("")
        setUpdatedAccountBalance("")
        setUpdatedProfilePicture("")
        dispatch(
            login({
                id: user.id,
                trades: [...user.trades].reverse(),
                info: data.info,
            })
        )
        dispatch(setIsNotLoading())
    }

    return (
        <form className="user-update-form" onSubmit={handleSubmit}>
            <div className="user-update-form-input">
                <div className="floating">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={updatedUsername}
                        onChange={(e) => setUpdatedUsername(e.target.value)}
                    />
                    <label
                        htmlFor="username"
                        className={updatedUsername.length ? "label-up" : ""}>
                        Change Username:
                    </label>
                </div>
            </div>
            <div className="user-update-form-input">
                <div className="floating">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                    <label
                        htmlFor="email"
                        className={updatedEmail.length ? "label-up" : ""}>
                        Change Email:
                    </label>
                </div>
            </div>
            <div className="user-update-form-input">
                <div className="floating">
                    <input
                        type="number"
                        name="account"
                        id="account"
                        value={updatedAccountBalance}
                        onChange={(e) =>
                            setUpdatedAccountBalance(e.target.value)
                        }
                    />
                    <label
                        htmlFor="account"
                        className={
                            updatedAccountBalance.length ? "label-up" : ""
                        }>
                        Update Account Balance:
                    </label>
                </div>
            </div>
            <div className="image-input">
                <p>Update Profile Picture: </p>
                <div className="image-input-button">
                    <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        onChange={getImage}
                    />
                    <label htmlFor="profilePic">Choose image</label>
                </div>
            </div>
            <div className="user-update-form-submit">
                <button type="submit">Update</button>
            </div>
        </form>
    )
}
export default UserUpdateForm
