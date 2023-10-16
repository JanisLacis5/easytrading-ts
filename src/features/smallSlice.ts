import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IObj {
    [key: string]: boolean
}

interface IInitialState extends IObj {
    showSmallLinks: boolean
    showSmallAside: boolean
    showUserAside: boolean
    showTrading: boolean
    showScreeners: boolean
}

const initialState: IInitialState = {
    showSmallLinks: false,
    showSmallAside: false,
    showUserAside: false,
    showTrading: false,
    showScreeners: false,
}

const smallSlice = createSlice({
    name: "small",
    initialState,
    reducers: {
        resetLinks: (state) => {
            state.showSmallLinks = false
        },
        resetAside: (state) => {
            state.showSmallAside = false
        },
        resetUserAside: (state) => {
            state.showUserAside = false
        },
        toggleSmallLinks: (state) => {
            state.showSmallLinks = !state.showSmallLinks
        },
        toggleSmallAside: (state) => {
            state.showSmallAside = !state.showSmallAside
        },
        toggleUserAside: (state) => {
            state.showUserAside = !state.showUserAside
        },
        smallNav: (
            state,
            action: PayloadAction<{prop: string; value: boolean}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
            if (prop === "showTrading") {
                state.showScreeners = false
            } else {
                state.showTrading = false
            }
        },
        reset: (state) => {
            state.showScreeners = false
            state.showSmallAside = false
            state.showSmallLinks = false
            state.showTrading = false
            state.showScreeners = false
        },
    },
})

export const {
    toggleSmallLinks,
    resetLinks,
    resetAside,
    toggleSmallAside,
    resetUserAside,
    toggleUserAside,
    smallNav,
    reset,
} = smallSlice.actions
export default smallSlice.reducer
