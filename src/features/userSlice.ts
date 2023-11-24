import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
        | IFriend
        | string[]
}

interface IUser extends temp {
    id: string
    trades: IUserSingleTrade[]
    notes: IUserSingleNote[]
    data: IUserInfo
    layouts: Array<IUserSingleLayout[]>
    messages: IUserMessages
    friends: IFriend[]
    recievedFriendRequests: Array<string>
    sentFriendRequests: Array<string>
    hiddenMessages: IFriend[]
    blockedUsers: IFriend[]
}

interface IInitialState {
    isLogged: boolean
    isLoading: boolean
    user: IUser
}

export interface ILogin {
    _id: string
    trades: IUserSingleTrade[]
    notes: IUserSingleNote[]
    data: IUserInfo
    layouts: Array<IUserSingleLayout[]>
    messages: IUserMessages
    friends: IFriend[]
    recievedFriendRequests: Array<string>
    sentFriendRequests: Array<string>
    hiddenMessages: IFriend[]
    blockedUsers: IFriend[]
}

const initialState: IInitialState = {
    isLogged: localStorage.getItem("userId") ? true : false,
    isLoading: false,
    user: {
        id: JSON.parse(localStorage.getItem("userId") || JSON.stringify("")),
        trades: [],
        data: {} as IUserInfo,
        notes: [],
        layouts: [],
        messages: {},
        friends: [],
        recievedFriendRequests: [],
        sentFriendRequests: [],
        hiddenMessages: [],
        blockedUsers: [],
    },
}

export const clearTrades = createAsyncThunk("user/clearTrades", async () => {
    const id = JSON.parse(localStorage.getItem("userId") || "")
    if (id) {
        try {
            const { data } = await customFetch.delete(
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
            const { data } = await customFetch.patch("logout", { id: id })
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
        login: (state, action: PayloadAction<{ data: ILogin }>) => {
            const {
                _id: id,
                trades,
                notes,
                layouts,
                data,
                messages,
                friends,
                recievedFriendRequests,
                sentFriendRequests,
                hiddenMessages,
                blockedUsers,
            } = action.payload.data

            localStorage.setItem("userId", JSON.stringify(id))

            return {
                ...state,
                isLogged: true,
                isLoading: false,
                user: {
                    ...state.user,
                    id: id,
                    trades: trades,
                    data: data,
                    notes: notes,
                    layouts: layouts,
                    friends: friends,
                    recievedFriendRequests: recievedFriendRequests,
                    sentFriendRequests: sentFriendRequests,
                    hiddenMessages: hiddenMessages,
                    messages: messages,
                    blockedUsers: blockedUsers,
                },
            }
        },
        updateUserField: (
            state,
            action: PayloadAction<{
                field:
                    | "userTrades"
                    | "data"
                    | "notes"
                    | "layouts"
                    | "messages"
                    | "friends"
                    | "recievedFriendRequests"
                    | "sentFriendRequests"
                    | "hiddenMessages"
                    | "blockedUsers"
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
            const { field, value } = action.payload

            if (field === "userTrades") {
                state.user.trades = value as IUserSingleTrade[]
            }
            if (field === "data") {
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
            if (field === "blockedUsers") {
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
                        data: {
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
                        blockedUsers: [],
                    },
                }
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { login, setIsLoading, setIsNotLoading, updateUserField } =
    userSlice.actions
export default userSlice.reducer
