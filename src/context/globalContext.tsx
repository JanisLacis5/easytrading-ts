import {useContext, createContext, useState} from "react"

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({children}) => {
    const [isRequirements, setIsRequirements] = useState(false)

    const [screenWidth, setScreenWidth] = useState(window.screen.width)

    // REQUIREMENTS
    const [isMetReq, setIsMetReq] = useState(true)

    // FILTERS
    const [isFilters, setIsFilters] = useState(false)

    // MODAL
    const [showModal, setShowModal] = useState(false)

    return (
        <GlobalContext.Provider
            value={{
                isRequirements,
                setIsRequirements,
                isFilters,
                setIsFilters,
                isMetReq,
                setIsMetReq,
                showModal,
                setShowModal,
                screenWidth,
                setScreenWidth,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default AppContext
