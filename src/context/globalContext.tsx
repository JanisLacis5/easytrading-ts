import {useContext, createContext, useState} from "react"
import userIcon from "../assets/user-icon.svg"
import {IUserSingleLayout} from "../interfaces"

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({children}) => {
    const [isRequirements, setIsRequirements] = useState(false)

    const [screenWidth, setScreenWidth] = useState(window.screen.width)

    // ADD TRADE FORM
    const [stock, setStock] = useState("")
    const [accBefore, setAccBefore] = useState("")
    const [accAfter, setAccAfter] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [action, setAction] = useState("")

    // REQUIREMENTS
    const [isMetReq, setIsMetReq] = useState(true)

    // FILTERS
    const [isFilters, setIsFilters] = useState(false)

    // MODAL
    const [showModal, setShowModal] = useState(false)

    //USER INFO FORM
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [choosePricing, setChoosePricing] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [account, setAccount] = useState("")
    const [image, setImage] = useState(userIcon)
    const [pricingPlan, setPricingPlan] = useState("")
    const [changePlan, setChangePlan] = useState(false)

    // ACCOUNT UPDATE FORM
    const [updatedUsername, setUpdatedUsername] = useState("")
    const [updatedEmail, setUpdatedEmail] = useState("")
    const [updatedAccountBalance, setUpdatedAccountBalance] = useState("")
    const [updatedProfilePicture, setUpdatedProfilePicture] = useState("")

    // DANGER ZONE
    const [changePassword, setChangePassword] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [askPassword, setAskPassword] = useState(false)

    // CUSTOM LAYOUT

    return (
        <GlobalContext.Provider
            value={{
                isRequirements,
                setIsRequirements,
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
                isFilters,
                setIsFilters,
                isMetReq,
                setIsMetReq,
                showModal,
                setShowModal,
                email,
                setEmail,
                password,
                setPassword,
                confirmPassword,
                setConfirmPassword,
                updatedUsername,
                setUpdatedUsername,
                updatedEmail,
                setUpdatedEmail,
                updatedAccountBalance,
                setUpdatedAccountBalance,
                updatedProfilePicture,
                setUpdatedProfilePicture,
                changePassword,
                setChangePassword,
                isDelete,
                setIsDelete,
                askPassword,
                setAskPassword,
                choosePricing,
                setChoosePricing,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                username,
                setUsername,
                account,
                setAccount,
                image,
                setImage,
                pricingPlan,
                setPricingPlan,
                changePlan,
                setChangePlan,
                screenWidth,
                setScreenWidth,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default AppContext
