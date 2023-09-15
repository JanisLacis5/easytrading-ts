import {Calendar, momentLocalizer} from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar.css"
import {useState} from "react"
import {useEffect} from "react"
import events from "./events"
import {useSelector} from "react-redux"

moment.locale("ko", {
    week: {
        dow: 1,
        doy: 1,
    },
})
const localizer = momentLocalizer(moment)

const MyCalendar = () => {
    const [date, setDate] = useState(new Date())
    const [profitDates, setProfitDates] = useState([])

    const {user} = useSelector((store) => store.user)

    useEffect(() => {
        setProfitDates(events(user.trades))
    }, [user.trades])

    const eventStyleGetter = (event) => {
        const backgroundColor =
            event.temp > 0
                ? "var(--color-trade-green)"
                : "var(--color-trade-red)"
        return {style: {backgroundColor}}
    }

    return (
        <section className="calendar-main">
            <div className="calendar-container">
                <Calendar
                    events={profitDates || []}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: 500,
                        backgroundColor: "var(--color-grey-600)",
                        color: " var(--color-grey-300)",
                    }}
                    views={["month"]}
                    defaultDate={date}
                    selectable
                    onNavigate={(newDate) => setDate(newDate)}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </section>
    )
}
export default MyCalendar
