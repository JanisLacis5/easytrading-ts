import "./gap.css"

interface IProps {
	height?: number
	width?: number
	x?: number
	y?: number
}

const GapScreener = ({ height, width, x, y }: IProps) => {
	return (
		<div
			className="gap"
			style={{
				height: `${height}%`,
				width: `${width}%`,
				left: `${x}%`,
				top: `${y}%`,
			}}
		>
			<div className="gap-screener-header">
				<div>
					<p>Gap %</p>
				</div>
				<div>
					<p>Time</p>
				</div>
				<div>
					<p>Stock</p>
				</div>
				<div>
					<p>Price</p>
				</div>
				<div>
					<p>Float</p>
				</div>
				<div>
					<p>Volume</p>
				</div>
				<div>
					<p>Rel. vol.</p>
				</div>
			</div>
		</div>
	)
}

export default GapScreener
