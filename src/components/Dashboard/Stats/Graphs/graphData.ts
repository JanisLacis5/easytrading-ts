import {IUserSingleTrade} from "../../../../interfaces"
import {constHours, weekDays} from "./constants"
import {constDays} from "./constants"

export const splitData = (data: number[]) => {
    const positive = []
    const negative = []

    for (let i = 0; i < data.length; i++) {
        if (data[i] > 0) {
            positive.push(data[i])
        } else {
            negative.push(data[i])
        }
    }

    return {
        positive,
        negative,
    }
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
