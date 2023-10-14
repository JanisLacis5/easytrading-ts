import {IUserSingleTrade} from "../../../../interfaces"

interface IDays {
    [key: string]: number
}

export const tradesPerDay = (weekDays: string[], data: IUserSingleTrade[]) => {
    if (!data || !data.length) {
        return null
    }

    const days: IDays = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
    }

    data.map((trade) => {
        const day = weekDays[new Date(trade.date).getDay()]
        days[day] = days[day] ? (days[day] += 1) : 1
    })

    return days
}
