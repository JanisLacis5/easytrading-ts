import HodBlock from "../ScreenerBlocks/HodBlock"
import GapBlock from "../ScreenerBlocks/GapBlock"
import {IUserSingleLayout} from "../../../../interfaces"
import HodScreener from "../../HodScreener/HodScreener"

const ReturnObject = ({
    index,
    layout,
}: {
    index: number
    layout: IUserSingleLayout
}) => {
    const {screener, x, y, height, width} = layout
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
            <GapBlock key={index} height={height} width={width} x={x} y={y} />
        )
    }
}
export default ReturnObject
