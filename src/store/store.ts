import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import asideReducer from "../features/asideSlice"
import filterReducer from "../features/filterSlice"
import sortReducer from "../features/sortSlice"
import smallReducer from "../features/smallSlice"
import layoutReducer from "../features/layoutSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        aside: asideReducer,
        filter: filterReducer,
        sort: sortReducer,
        small: smallReducer,
        layout: layoutReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
