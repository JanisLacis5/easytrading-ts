import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import "./tradelog.css"
import { useEffect } from "react"
import { setSortedTrades } from "../../../features/sortSlice"
import {
	filterProducts,
	setFilteredProducts,
} from "../../../features/filterSlice"
import { IUserSingleTrade } from "../../../interfaces"
import customFetch from "../../../utils"

const Trades = ({ trades }: { trades: IUserSingleTrade[] }) => {
	const dispatch = useAppDispatch()

	const { sortedTrades } = useAppSelector((store) => store.sort)
	const { user } = useAppSelector((store) => store.user)
	const { filters, filteredProducts } = useAppSelector(
		(store) => store.filter
	)
	const { screenWidth } = useAppSelector((store) => store.default)

	useEffect(() => {
		dispatch(filterProducts({ trades: sortedTrades }))
		dispatch(setSortedTrades({ trades: filteredProducts }))
	}, [filters])

	useEffect(() => {
		const asyncWrapper = async () => {
			if (!user) {
				return
			}
			const { data } = await customFetch.post("get-trades", {
				userId: user.id,
			})
			dispatch(setSortedTrades({ trades: data.trades }))
			dispatch(setFilteredProducts({ trades: data.trades }))
		}
		asyncWrapper()
	}, [user])

	return (
		<>
			{trades && trades.length ? (
				trades.map((trade, index) => {
					const pl = trade.pl < 0 ? trade.pl * -1 : trade.pl
					const { date, time, stock, action } = trade
					return (
						<div key={index} className="tradelog-trade-container">
							<div className="tradelog-trade-time">
								<h6>
									{screenWidth < 900 ? date.slice(5) : date}
								</h6>
								<h6>{time}</h6>
							</div>
							<h6>{stock.toUpperCase()}</h6>
							<h6
								style={
									trade.pl !== 0
										? trade.pl > 0
											? { color: "var(--green)" }
											: { color: "var(--red)" }
										: { color: "var(--black-50)" }
								}
							>
								{trade.pl !== 0
									? trade.pl > 0
										? "+"
										: "-"
									: ""}
								${pl % 1 === 0 ? pl : pl.toFixed(2)}
							</h6>
							<h6>{action}</h6>
						</div>
					)
				})
			) : (
				<h2 style={{ textAlign: "center" }}>No data</h2>
			)}
		</>
	)
}
export default Trades
