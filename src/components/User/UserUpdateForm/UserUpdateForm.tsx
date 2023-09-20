import {toast} from "react-toastify"
import "./userupdateform.css"
import customFetch from "../../../utils"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {login, setIsLoading, setIsNotLoading} from "../../../features/userSlice"
import {setAccountUpdateState} from "../../../features/accuntUpdateSlice"

const UserUpdateForm = () => {
    const dispatch = useAppDispatch()

    const {
        updatedUsername,
        updatedEmail,
        updatedAccountBalance,
        updatedProfilePicture,
    } = useAppSelector((store) => store.accountUpdate)

    const {user} = useAppSelector((store) => store.user)

    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tgt = e.target
        const files = tgt.files

        if (FileReader && files && files.length) {
            const fr = new FileReader()
            fr.onload = function () {
                dispatch(
                    setAccountUpdateState({
                        prop: "updatedProfilePicture",
                        value: fr.result as string,
                    })
                )
            }
            fr.readAsDataURL(files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(updatedUsername)

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

        dispatch(setAccountUpdateState({prop: "updatedUsername", value: ""}))
        dispatch(setAccountUpdateState({prop: "updatedEmail", value: ""}))
        dispatch(
            setAccountUpdateState({prop: "updatedAccountBalance", value: ""})
        )
        dispatch(
            setAccountUpdateState({prop: "updatedProfilePicture", value: ""})
        )
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
                        onChange={(e) =>
                            dispatch(
                                setAccountUpdateState({
                                    prop: "updatedUsername",
                                    value: e.target.value,
                                })
                            )
                        }
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
                        onChange={(e) =>
                            dispatch(
                                setAccountUpdateState({
                                    prop: "updatedEmail",
                                    value: e.target.value,
                                })
                            )
                        }
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
                            dispatch(
                                setAccountUpdateState({
                                    prop: "updatedAccountBalance",
                                    value: e.target.value,
                                })
                            )
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
