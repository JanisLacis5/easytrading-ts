export interface IScreenerBlockProps {
    width?: number
    height?: number
    x?: number
    y?: number
}
import {useEffect} from "react"
const GapBlock = ({width, height, x, y}: IScreenerBlockProps) => {
    // useEffect(() => {
    //     console.log(
    //         `gapBLOCK:\nheight = ${height?.toFixed(
    //             0
    //         )}%\n width = ${width?.toFixed(0)}%\n x = ${x?.toFixed(
    //             0
    //         )}%\n y = ${y?.toFixed(0)}%`
    //     )
    // }, [x])
    return (
        <div
            className="gap-block"
            style={{
                height: `${height}%`,
                width: `${width}%`,
                left: `${x}%`,
                top: `${y}%`,
            }}></div>
    )
}
export default GapBlock
