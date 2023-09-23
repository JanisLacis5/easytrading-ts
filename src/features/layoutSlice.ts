import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
    layoutsMainHeight: number
    layoutsMainWidth: number
    isSaved: boolean
}

const initialState: CounterState = {
    layoutParams: [],
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
    layoutsMainHeight: 0,
    layoutsMainWidth: 0,
    isSaved: false,
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
        resetLayoutParams: (state) => {
            state.layoutParams = []
            state.isDone = false
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
        setIsSaved: (state, action: PayloadAction<boolean>) => {
            state.isSaved = action.payload
        },
    },
})

export const {
    newLayout,
    setIsDone,
    setIsAddingScreener,
    setActiveBlock,
    setLayoutsMainParams,
    setIsSaved,
    resetLayoutParams,
} = layoutSlice.actions
export default layoutSlice.reducer
