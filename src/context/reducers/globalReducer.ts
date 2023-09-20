import {IInitialState} from "../globalContext"
import {Reducer} from "@reduxjs/toolkit"
import {
    SET_IS_FILETRS,
    SET_IS_MET_REQ,
    SET_IS_REQUIREMENTS,
    SET_SHOW_MODAL,
    SET_WIDTH,
} from "../actions"

interface ActionType {
    type:
        | "SET_WIDTH"
        | "SET_IS_REQUIREMENTS"
        | "SET_IS_MET_REQ"
        | "SET_IS_FILETRS"
        | "SET_SHOW_MODAL"
}

interface Action extends ActionType {
    payload: number | boolean
}

const globalReducer: Reducer<IInitialState | undefined, Action> = (
    state,
    action
) => {
    if (action.type === SET_IS_FILETRS) {
        if (typeof action.payload === "boolean" && state) {
            state.isFilters = action.payload
        } else {
            throw new Error("action type wasnt boolean")
        }
    }
    if (action.type === SET_WIDTH) {
        if (typeof action.payload === "number" && state) {
            state.screenWidth = action.payload
        } else {
            throw new Error("action type wasnt number")
        }
    }
    if (action.type === SET_IS_MET_REQ) {
        if (typeof action.payload === "boolean" && state) {
            return {...state, isMetReq: action.payload}
        } else {
            throw new Error("action type wasnt boolean")
        }
    }
    if (action.type === SET_IS_REQUIREMENTS) {
        if (typeof action.payload === "boolean" && state) {
            return {...state, isRequirements: action.payload}
        } else {
            throw new Error("action type wasnt boolean")
        }
    }
    if (action.type === SET_SHOW_MODAL) {
        if (typeof action.payload === "boolean" && state) {
            return {...state, showModal: action.payload}
        } else {
            throw new Error("action type wasnt boolean")
        }
    }
    return state
}

export default globalReducer
