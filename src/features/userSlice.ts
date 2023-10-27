import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import customFetch from "../utils"
import {
    IUserSingleNote,
    IUserInfo,
    IUserSingleTrade,
    IUserSingleLayout,
    IMessage,
} from "../interfaces"

interface IUser {
    id: string
    trades: IUserSingleTrade[]
    notes: IUserSingleNote[]
    info: IUserInfo
    layouts: Array<IUserSingleLayout[]>
    messages: IMessage[]
    friends: Array<string>
    recievedFriendRequests: Array<string>
    sentFriendRequests: Array<string>
}

interface IInitialState {
    isLogged: boolean
    isLoading: boolean
    user: IUser
}

interface ILogin {
    id: string
    trades?: IUserSingleTrade[]
    notes?: IUserSingleNote[]
    info?: IUserInfo
    layouts?: Array<IUserSingleLayout[]>
    messages?: IMessage[]
    friends?: Array<string>
    recievedFriendRequests?: Array<string>
    sentFriendRequests?: Array<string>
}

const initialState: IInitialState = {
    isLogged: localStorage.getItem("userId") ? true : false,
    isLoading: false,
    user: {
        id: JSON.parse(localStorage.getItem("userId") || JSON.stringify("")),
        trades: JSON.parse(
            localStorage.getItem("userTrades") || JSON.stringify([])
        ),
        info: JSON.parse(
            localStorage.getItem("userInfo") || JSON.stringify({})
        ),
        notes: JSON.parse(
            localStorage.getItem("userNotes") || JSON.stringify([])
        ),
        layouts: JSON.parse(
            localStorage.getItem("layouts") || JSON.stringify([])
        ),
        messages: JSON.parse(
            localStorage.getItem("messages") || JSON.stringify([])
        ),
        friends: JSON.parse(
            localStorage.getItem("friends") || JSON.stringify([])
        ),
        recievedFriendRequests: JSON.parse(
            localStorage.getItem("recievedFriendRequests") || JSON.stringify([])
        ),
        sentFriendRequests: JSON.parse(
            localStorage.getItem("sentFriendRequests") || JSON.stringify([])
        ),
    },
}

export const clearTrades = createAsyncThunk("user/clearTrades", async () => {
    const id = JSON.parse(localStorage.getItem("userId") || "")
    if (id) {
        try {
            const {data} = await customFetch.delete(
                `/deleteTrades/${JSON.parse(id)}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            return data
        } catch (error) {
            console.log(error)
        }
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
        login: (state, action: PayloadAction<ILogin>) => {
            const trades = action.payload.trades || []
            const notes = action.payload.notes || []
            const layouts = action.payload.layouts || []
            const info = action.payload.info || state.user.info
            const messages = action.payload.messages || []
            const friends = action.payload.friends || []
            const recievedFriendRequests =
                action.payload.recievedFriendRequests || []
            const sentFriendRequests = action.payload.sentFriendRequests || []

            localStorage.setItem("userId", JSON.stringify(action.payload.id))
            localStorage.setItem("userTrades", JSON.stringify(trades))
            localStorage.setItem("userInfo", JSON.stringify(info))
            localStorage.setItem("userNotes", JSON.stringify(notes))
            localStorage.setItem("layouts", JSON.stringify(layouts))
            localStorage.setItem("messages", JSON.stringify(messages))
            localStorage.setItem("friends", JSON.stringify(friends))
            localStorage.setItem(
                "recievedFriendRequests",
                JSON.stringify(recievedFriendRequests)
            )
            localStorage.setItem(
                "sentFriendRequests",
                JSON.stringify(sentFriendRequests)
            )

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
                    id: action.payload.id,
                    trades: reverseTrades,
                    info: info,
                    notes: notes,
                    layouts: layouts,
                    messages: messages,
                    friends: friends,
                    recievedFriendRequests: recievedFriendRequests,
                    sentFriendRequests: sentFriendRequests,
                },
            }
        },
        logout: (state): IInitialState => {
            localStorage.clear()
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                user: {
                    id: "",
                    trades: [],
                    info: {
                        email: "",
                        firstName: "",
                        lastName: "",
                        username: "",
                        startingAccount: "",
                        account: "",
                        image: "",
                        pricing: "",
                    },
                    notes: [],
                    layouts: [],
                    messages: [],
                    friends: [],
                    recievedFriendRequests: [],
                    sentFriendRequests: [],
                },
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTrades.pending, (state) => {
                state.isLoading = true
            })
            .addCase(clearTrades.fulfilled, (state) => {
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
