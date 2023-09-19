import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitalStateKeys {
    updatedUsername: string
    updatedEmail: string
    updatedAccountBalance: string
    updatedProfilePicture: string
}

interface IInitialState extends IInitalStateKeys {
    [key: string]: string
}

const initialState: IInitialState = {
    updatedUsername: "",
    updatedEmail: "",
    updatedAccountBalance: "",
    updatedProfilePicture: "",
}

const accountUpdate = createSlice({
    name: "accountUpdate",
    initialState,
    reducers: {
        setAccountUpdateState: (
            state,
            action: PayloadAction<{prop: string; value: string}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
        },
    },
})

export const {setAccountUpdateState} = accountUpdate.actions
export default accountUpdate.reducer
