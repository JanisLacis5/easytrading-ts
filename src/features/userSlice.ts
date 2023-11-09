import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import customFetch from "../utils"
import {
    IUserSingleNote,
    IUserInfo,
    IUserSingleTrade,
    IUserSingleLayout,
    IFriend,
    IUserMessages,
} from "../interfaces"

interface temp {
    [key: string]:
        | string
        | IUserSingleTrade[]
        | IUserInfo
        | IUserSingleNote[]
        | Array<IUserSingleLayout[]>
        | IUserMessages
        | IFriend[]
        | string[]
}

interface IUser extends temp {
    id: string
    trades: IUserSingleTrade[]
    notes: IUserSingleNote[]
    info: IUserInfo
    layouts: Array<IUserSingleLayout[]>
    messages: IUserMessages
    friends: IFriend[]
    recievedFriendRequests: Array<string>
    sentFriendRequests: Array<string>
    hiddenMessages: IFriend[]
}

interface IInitialState {
    isLogged: boolean
    isLoading: boolean
    user: IUser
}

interface ILogin {
    id: string
    trades: IUserSingleTrade[]
    notes: IUserSingleNote[]
    info: IUserInfo
    layouts: Array<IUserSingleLayout[]>
    messages: IUserMessages
    friends: IFriend[]
    recievedFriendRequests: Array<string>
    sentFriendRequests: Array<string>
    hiddenMessages: IFriend[]
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
            localStorage.getItem("messages") || JSON.stringify({})
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
        hiddenMessages: JSON.parse(
            localStorage.getItem("hiddenMessages") || JSON.stringify([])
        ),
    },
}

export const clearTrades = createAsyncThunk("user/clearTrades", async () => {
    const id = JSON.parse(localStorage.getItem("userId") || "")
    if (id) {
        try {
            const {data} = await customFetch.delete(
                `/deleteTrades/${JSON.stringify(id)}`,
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

export const logout = createAsyncThunk("user/logout", async () => {
    const id = JSON.parse(localStorage.getItem("userId") || "")
    if (id) {
        try {
            const {data} = await customFetch.patch("logout", {id: id})
            if (data.status === "success") {
                return
            } else {
                console.log(data)
            }
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
            const trades = action.payload.trades
            const notes = action.payload.notes
            const layouts = action.payload.layouts
            const info = action.payload.info
            const messages = action.payload.messages
            const friends = action.payload.friends
            const recievedFriendRequests = action.payload.recievedFriendRequests
            const sentFriendRequests = action.payload.sentFriendRequests
            const hiddenMessages = action.payload.hiddenMessages

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
            localStorage.setItem(
                "hiddenMessages",
                JSON.stringify(hiddenMessages)
            )

            return {
                ...state,
                isLogged: true,
                isLoading: false,
                user: {
                    ...state.user,
                    id: action.payload.id,
                    trades: trades,
                    info: info,
                    notes: notes,
                    layouts: layouts,
                    friends: friends,
                    recievedFriendRequests: recievedFriendRequests,
                    sentFriendRequests: sentFriendRequests,
                    hiddenMessages: hiddenMessages,
                    messages: messages,
                },
            }
        },
        updateUserField: (
            state,
            action: PayloadAction<{
                field:
                    | "userTrades"
                    | "info"
                    | "notes"
                    | "layouts"
                    | "messages"
                    | "friends"
                    | "recievedFriendRequests"
                    | "sentFriendRequests"
                    | "hiddenMessages"
                value:
                    | IUserSingleTrade[]
                    | IUserInfo
                    | IUserSingleNote[]
                    | Array<IUserSingleLayout[]>
                    | IUserMessages
                    | IFriend[]
                    | string[]
            }>
        ) => {
            const {field, value} = action.payload

            localStorage.setItem(`${field}`, JSON.stringify(value))

            if (field === "userTrades") {
                state.user.trades = value as IUserSingleTrade[]
            }
            if (field === "info") {
                state.user[field] = value as IUserInfo
            }
            if (field === "notes") {
                state.user[field] = value as IUserSingleNote[]
            }
            if (field === "layouts") {
                state.user[field] = value as Array<IUserSingleLayout[]>
            }
            if (field === "messages") {
                state.user[field] = value as IUserMessages
            }
            if (field === "hiddenMessages") {
                state.user[field] = value as IFriend[]
            }
            if (field === "friends") {
                state.user[field] = value as IFriend[]
            }
            if (
                field === "recievedFriendRequests" ||
                field === "sentFriendRequests"
            ) {
                state.user[field] = value as string[]
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
            ////////////////
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                localStorage.clear()
                state = {
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
                        messages: {},
                        friends: [],
                        recievedFriendRequests: [],
                        sentFriendRequests: [],
                        hiddenMessages: [],
                    },
                }
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const {login, setIsLoading, setIsNotLoading, updateUserField} =
    userSlice.actions
export default userSlice.reducer
