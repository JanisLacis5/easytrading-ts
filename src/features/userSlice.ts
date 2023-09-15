import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import customFetch from "../utils"

const initialState = {
    isLogged: localStorage.getItem("userId") ? true : false,
    isLoading: false,
    user: {
        id:
            typeof localStorage.getItem("userId") !== "undefined"
                ? JSON.parse(localStorage.getItem("userId"))
                : "",
        trades: JSON.parse(localStorage.getItem("userTrades" || [])),
        info:
            typeof localStorage.getItem("userInfo") !== "undefined"
                ? JSON.parse(localStorage.getItem("userInfo"))
                : "",
        notes: JSON.parse(localStorage.getItem("userNotes")),
        layouts: JSON.parse(localStorage.getItem("layouts")),
    },
}

export const clearTrades = createAsyncThunk("user/clearTrades", async () => {
    const id = localStorage.getItem("userId")
    try {
        const {data} = await customFetch.delete(
            `/deleteTrades/${JSON.parse(id)}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        return data
    } catch (error) {
        console.log(error)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true
        },
        setIsNotLoading: (state) => {
            state.isLoading = false
        },
        login: (state, {payload}) => {
            const trades = payload.trades || []
            const notes = payload.notes || []
            const layouts = payload.layouts || []
            localStorage.setItem("userId", JSON.stringify(payload.id))
            localStorage.setItem("userTrades", JSON.stringify(trades))
            localStorage.setItem("userInfo", JSON.stringify(payload.info))
            localStorage.setItem("userNotes", JSON.stringify(notes))
            localStorage.setItem("layouts", JSON.stringify(layouts))

            let reverseTrades = [...trades]
            if (trades && trades.length) {
                reverseTrades = reverseTrades.reverse()
            }

            return {
                ...state,
                isLogged: true,
                isLoading: false,
                user: {
                    ...state.user,
                    id: payload.id,
                    trades: reverseTrades,
                    info: payload.info,
                    notes: notes,
                    layouts: layouts,
                },
            }
        },
        logout: (state) => {
            localStorage.clear()
            return {...state, isLoading: false, isLogged: false, user: {}}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTrades.pending, (state) => {
                state.isLoading = true
            })
            .addCase(clearTrades.fulfilled, (state, {payload}) => {
                state.user.trades = []
                localStorage.setItem("userTrades", JSON.stringify([]))
                state.isLoading = false
            })
            .addCase(clearTrades.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const {login, logout, setIsLoading, setIsNotLoading} = userSlice.actions
export default userSlice.reducer
