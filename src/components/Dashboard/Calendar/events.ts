import {profitsPerDate} from "../../../functions"

const events = (trades) => {
    if (!trades || !trades.length) {
        return null
    }
    const dateProfits = profitsPerDate(trades)
    let ansArr = []
    let eventNr = 1
    for (const [key, value] of Object.entries(dateProfits)) {
        let newValue = value
        if (value < 0) {
            newValue = `-$${(value * -1).toFixed(2)}`
        } else {
            newValue = `$${value.toFixed(2)}`
        }
        ansArr.push({
            title: newValue,
            start: key,
            end: key,
            temp: value,
        })
        eventNr++
    }
    return ansArr
}

export default events
