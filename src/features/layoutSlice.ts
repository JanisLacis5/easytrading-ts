import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface ILayoutPosition {
    x: number
    y: number
}

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isAddingScreener: boolean
    activeBlock: number | null
    layoutsMainHeight: number
    layoutsMainWidth: number
    layoutMainPosition: ILayoutPosition
    edit: number | null
}

const initialState: CounterState = {
    layoutParams: [],
    isAddingScreener: false,
    activeBlock: null,
    layoutsMainHeight: 0,
    layoutsMainWidth: 0,
    layoutMainPosition: {
        x: 0,
        y: 0,
    },
    edit: null,
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
        },
        setLayoutMainPosition: (
            state,
            action: PayloadAction<ILayoutPosition>
        ) => {
            const {x, y} = action.payload
            state.layoutMainPosition = {
                x: x,
                y: y,
            }
        },
        editExistingLayout: (
            state,
            action: PayloadAction<IUserSingleLayout[]>
        ) => {
            state.layoutParams = [...action.payload]
        },

        ///////////////////////////////////////////////////////////////////////////////

        newLayoutScreener: (state, action: PayloadAction<"gap" | "hod">) => {
            state.layoutParams.push({
                screener: action.payload,
                x: 0,
                y: 0,
                height: (250 / state.layoutsMainHeight) * 100,
                width: (400 / state.layoutsMainWidth) * 100,
            })
        },
        setLayoutPosition: (
            state,
            action: PayloadAction<{
                x: number
                y: number
                height: number
                width: number
                index: number
            }>
        ) => {
            const {x, y, height, width, index} = action.payload

            state.layoutParams[index].x = x
            state.layoutParams[index].y = y
            state.layoutParams[index].height = height
            state.layoutParams[index].width = width
        },

        //////////////////////////////////////////////////////////////////////////////////

        setIsAddingScreener: (state, action: PayloadAction<boolean>) => {
            state.isAddingScreener = action.payload
        },
        setActiveBlock: (state, action: PayloadAction<number | null>) => {
            state.activeBlock = action.payload
        },
        setEdit: (state, action: PayloadAction<number | null>) => {
            state.edit = action.payload
        },
    },
})

export const {
    setLayoutPosition,
    newLayoutScreener,
    setIsAddingScreener,
    setActiveBlock,
    setLayoutsMainParams,
    setLayoutMainPosition,
    resetLayoutParams,
    editExistingLayout,
    setEdit,
} = layoutSlice.actions
export default layoutSlice.reducer
