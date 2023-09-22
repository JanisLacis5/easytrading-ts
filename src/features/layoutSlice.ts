import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
    layoutsMainHeight: number
    layoutsMainWidth: number
}

const initialState: CounterState = {
    layoutParams: [],
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
    layoutsMainHeight: 0,
    layoutsMainWidth: 0,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setLayoutsMainParams: (
            state,
            action: PayloadAction<{height: number; width: number}>
        ) => {
            const {height, width} = action.payload
            if (height && width) {
                state.layoutsMainHeight = height
                state.layoutsMainWidth = width
            }
        },
        newLayout: (state, action: PayloadAction<IUserSingleLayout>) => {
            const layout = action.payload
            console.log(`passed to function = ${JSON.stringify(layout)}`)

            state.layoutParams.push(layout)
        },
        setIsDone: (state, action: PayloadAction<boolean>) => {
            state.isDone = action.payload
        },
        setIsAddingScreener: (state, action: PayloadAction<boolean>) => {
            state.isAddingScreener = action.payload
        },
        setActiveBlock: (state, action: PayloadAction<number | null>) => {
            state.activeBlock = action.payload
        },
    },
})

export const {
    newLayout,
    setIsDone,
    setIsAddingScreener,
    setActiveBlock,
    setLayoutsMainParams,
} = layoutSlice.actions
export default layoutSlice.reducer
