import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import userIcon from "../assets/user-icon.svg"

interface IInitialStateKeys {
    [key: string]: string | boolean
}

interface IInitialState extends IInitialStateKeys {
    email: string
    password: string
    confirmPassword: string
    choosePricing: boolean
    firstName: string
    lastName: string
    username: string
    account: string
    image: string
    pricingPlan: string
    changePlan: boolean
}

const initialState: IInitialState = {
    email: "",
    password: "",
    confirmPassword: "",
    choosePricing: false,
    firstName: "",
    lastName: "",
    username: "",
    account: "",
    image: userIcon,
    pricingPlan: "",
    changePlan: false,
}

const userInfoFormSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfoString: (
            state,
            action: PayloadAction<{prop: string; value: string}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
        },
        setUserInfoBool: (
            state,
            action: PayloadAction<{prop: string; value: boolean}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
        },
    },
})

export const {setUserInfoString, setUserInfoBool} = userInfoFormSlice.actions
export default userInfoFormSlice.reducer
