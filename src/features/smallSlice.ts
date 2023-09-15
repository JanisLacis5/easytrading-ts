import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    showSmallLinks: false,
    showSmallAside: false,
    showUserAside: false,
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
    },
})

export const {
    toggleSmallLinks,
    resetLinks,
    resetAside,
    toggleSmallAside,
    resetUserAside,
    toggleUserAside,
} = smallSlice.actions
export default smallSlice.reducer
