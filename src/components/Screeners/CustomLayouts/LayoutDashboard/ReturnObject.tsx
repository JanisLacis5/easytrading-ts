import { IUserSingleLayout } from "../../../../interfaces"
import HodScreener from "../../HodScreener/HodScreener"
import GapScreener from "../../GapScreener/GapScreener"

const ReturnObject = ({
	index,
	layout,
}: {
	index: number
	layout: IUserSingleLayout
}) => {
	const { screener, x, y, height, width } = layout

	if (screener === "hod") {
		return (
			<HodScreener
				key={index}
				height={height}
				width={width}
				x={x}
				y={y}
			/>
		)
	}
	if (screener === "gap") {
		return (
			<GapScreener
				key={index}
				height={height}
				width={width}
				x={x}
				y={y}
			/>
		)
	}
}
export default ReturnObject
