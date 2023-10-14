import {IUserSingleTrade} from "../../../../interfaces"

export const maxPl = (trades: IUserSingleTrade[]) => {
    return Math.max(...trades.map((trade: IUserSingleTrade) => trade.pl))
}

export const minPl = (trades: IUserSingleTrade[]) => {
    return Math.min(...trades.map((trade: IUserSingleTrade) => trade.pl))
}

export const wonPl = (trades: IUserSingleTrade[] | null) => {
    if (!trades?.length) {
        return {averageWonDayPl: 0, maxWonDayPl: 0, biggestWin: 0, wonDays: 0}
    }
    let tradesCopy = [...trades]
    let sortedTrades = tradesCopy.sort((a, b) => {
        const date1 = Number(a.date.replaceAll("-", ""))
        const date2 = Number(b.date.replaceAll("-", ""))
        return date1 - date2
    })

    let wonTradeDays = []
    let tempDate = sortedTrades[0].date
    let temp = 0

    for (let i = 0; i < sortedTrades.length; i++) {
        if (tempDate !== sortedTrades[i].date) {
            tempDate = sortedTrades[i].date
            if (temp > 0) {
                wonTradeDays.push(temp)
            }
            temp = 0
        }
        temp += sortedTrades[i].pl
        if (i === sortedTrades.length - 1) {
            if (temp > 0) {
                wonTradeDays.push(temp)
            }
        }
    }

    return {
        averageWonDayPl:
            wonTradeDays.length === 0
                ? 0
                : wonTradeDays.reduce((acc, val) => acc + val, 0) /
                  wonTradeDays.length,
        maxWonDayPl: Math.max(...wonTradeDays),
        biggestWin: Math.max(...tradesCopy.map((o) => o.pl)),
        wonDays: wonTradeDays.length,
    }
}

export const lostPl = (trades: IUserSingleTrade[] | null) => {
    if (!trades?.length) {
        return {
            averageLostDayPl: 0,
            biggestLostDayPl: 0,
            biggestLoss: 0,
            lostDays: 0,
        }
    }
    let tradesCopy = [...trades]
    let sortedTrades = tradesCopy.sort((a, b) => {
        const date1 = Number(a.date.replaceAll("-", ""))
        const date2 = Number(b.date.replaceAll("-", ""))
        return date1 - date2
    })

    let lostTradeDays = []
    let tempDate = sortedTrades[0].date
    let temp = 0

    for (let i = 0; i < sortedTrades.length; i++) {
        if (tempDate !== sortedTrades[i].date) {
            tempDate = sortedTrades[i].date
            if (temp < 0) {
                lostTradeDays.push(temp)
            }
            temp = 0
        }
        temp += sortedTrades[i].pl
        if (i === sortedTrades.length - 1) {
            if (temp < 0) {
                lostTradeDays.push(temp)
            }
        }
    }

    return {
        averageLostDayPl:
            lostTradeDays.length === 0
                ? 0
                : lostTradeDays.reduce((acc, val) => acc + val, 0) /
                  lostTradeDays.length,
        biggestLostDayPl:
            lostTradeDays.length === 0 ? 0 : Math.min(...lostTradeDays),
        biggestLoss:
            lostTradeDays.length === 0
                ? 0
                : Math.min(...tradesCopy.map((o) => o.pl)),
        lostDays: lostTradeDays.length,
    }
}
