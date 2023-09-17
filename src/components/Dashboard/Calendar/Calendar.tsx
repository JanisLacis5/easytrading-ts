import {Calendar, momentLocalizer} from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar.css"
import {useState} from "react"
import {useEffect} from "react"
import events, {IAnsArr} from "./events"
import {useAppSelector} from "../../../store/storeHooks"

moment.locale("ko", {
    week: {
        dow: 1,
        doy: 1,
    },
})
const localizer = momentLocalizer(moment)

const MyCalendar = () => {
    const [date, setDate] = useState(new Date())
    const [profitDates, setProfitDates] = useState<IAnsArr[] | null>([])

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        setProfitDates(events(user.trades))
    }, [user.trades])

    const eventStyleGetter = (event: IAnsArr) => {
        const backgroundColor =
            event.profit > 0
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
                    onNavigate={(newDate: Date) => setDate(newDate)}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </section>
    )
}
export default MyCalendar
