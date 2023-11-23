import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import "./tradelog.css"
import {
	updateFilters,
	filterProducts,
	clearFilters,
	closeFilters,
} from "../../../features/filterSlice"
import { RxCross1 } from "react-icons/rx"

const Filters = () => {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((store) => store.user)
	const { filters } = useAppSelector((store) => store.filter)
	const { stock, date, action, PL } = filters

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const name = (e.target as HTMLInputElement).name as
			| "stock"
			| "date"
			| "action"
			| "PL"
		const value = (e.target as HTMLInputElement).value
		dispatch(updateFilters({ name: name, value: value }))
	}

	return (
		<form
			className="tradelog-filters"
			onChange={() => dispatch(filterProducts({ trades: user.trades }))}
		>
			<div>
				<label htmlFor="stock">Stock: </label>
				<input
					id="stock"
					type="text"
					name="stock"
					placeholder="AAPL"
					value={stock}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="date">Date: </label>
				<input
					id="date"
					type="date"
					name="date"
					value={date}
					onChange={handleChange}
				/>
			</div>
			<button type="button" onClick={() => dispatch(closeFilters())}>
				<RxCross1 />
			</button>
			<div>
				<label htmlFor="action">Action: </label>
				<select
					id="action"
					name="action"
					value={action}
					onChange={handleChange}
				>
					<option value="">Long / Short</option>
					<option value="long">Long</option>
					<option value="short">Short</option>
				</select>
			</div>
			<div>
				<label htmlFor="PL">P/L: </label>
				<select id="PL" name="PL" value={PL} onChange={handleChange}>
					<option value="default"></option>
					<option value="positive">+</option>
					<option value="negative">-</option>
				</select>
			</div>
			<button
				type="button"
				id="tradelog-filters-clear"
				onClick={() => {
					dispatch(clearFilters({ trades: user.trades }))
				}}
			>
				Clear Filters
			</button>
		</form>
	)
}
export default Filters
