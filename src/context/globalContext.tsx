import {useContext, useReducer, createContext} from "react"
import reducer from "./reducers/globalReducer"
import {
    SET_IS_MET_REQ,
    SET_IS_REQUIREMENTS,
    SET_SHOW_MODAL,
    SET_WIDTH,
} from "./actions"

export interface IInitialState {
    screenWidth: number
    isRequirements: boolean
    isMetReq: boolean
    isFilters: boolean
    showModal: boolean
}

const initialState: IInitialState = {
    screenWidth: window.innerWidth,
    isRequirements: false,
    isMetReq: true,
    isFilters: false,
    showModal: false,
}

const Context = createContext<IInitialState | undefined>(undefined)

const AppContext = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setScreenWidth = (width: number) => {
        dispatch({type: SET_WIDTH, payload: width})
    }

    const setIsRequirements = (isReq: boolean) => {
        dispatch({type: SET_IS_REQUIREMENTS, payload: isReq})
    }

    const setIsMetReq = (isReq: boolean) => {
        dispatch({type: SET_IS_MET_REQ, payload: isReq})
    }

    const setShowModal = (isShow: boolean) => {
        dispatch({type: SET_SHOW_MODAL, payload: isShow})
    }

    return (
        <Context.Provider
            value={{
                ...state,
                setScreenWidth,
                setIsRequirements,
                setIsMetReq,
                setShowModal,
            }}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(Context)
    if (context !== undefined) {
        return context
    }
    throw new Error("context is undefined")
}
export default AppContext
