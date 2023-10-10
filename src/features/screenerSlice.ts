import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IHodData} from "../interfaces"

interface IInitialState {
    hodData: IHodData[]
}

const initialState: IInitialState = {
    hodData: [],
}

const screenerSlice = createSlice({
    name: "screener",
    initialState,
    reducers: {
        setHodData: (state, action: PayloadAction<IHodData>) => {
            if (state.hodData.length > 30) {
                state.hodData = state.hodData.slice(1)
            }
            state.hodData.push(action.payload)
        },
    },
})

export const {setHodData} = screenerSlice.actions
export default screenerSlice.reducer
