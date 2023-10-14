import {IUserSingleTrade} from "../../../../interfaces"
import {constDays, constMonths, constHours, weekDays, months} from "./constants"

// PER MONTH

export const tradesPerMonth = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const funcMonths = {...constMonths}

    trades.map((trade) => {
        const month = months[new Date(trade.date).getMonth()]
        funcMonths[month] = funcMonths[month] += 1
    })

    return funcMonths
}

export const plPerMonth = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const funcMonths = {...constMonths}

    trades.map((trade) => {
        const month = months[new Date(trade.date).getMonth()]
        funcMonths[month] = funcMonths[month] += trade.pl
    })

    return funcMonths
}

// PER DAY

export const tradesPerDay = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const days = {...constDays}

    trades.map((trade) => {
        const day = weekDays[new Date(trade.date).getDay()]
        days[day] = days[day] += 1
    })

    return days
}

export const plPerDay = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const days = {...constDays}

    trades.map((trade) => {
        const day = weekDays[new Date(trade.date).getDay()]
        days[day] = days[day] += trade.pl
    })

    return days
}

// PER HOUR

export const tradesPerHour = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const hours = {...constHours}

    trades.map((trade) => {
        const hour = trade.time.slice(0, 2)
        hours[hour] = hours[hour] += 1
    })

    return hours
}

export const plPerHour = (trades: IUserSingleTrade[]) => {
    if (!trades || !trades.length) {
        return null
    }

    const hours = {...constHours}

    trades.map((trade) => {
        const hour = trade.time.slice(0, 2)
        hours[hour] = hours[hour] += trade.pl
    })

    return hours
}
