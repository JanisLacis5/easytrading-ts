import {IScreenerBlockProps} from "./GapBlock"

const HodBlock = ({height, width, x, y}: IScreenerBlockProps) => {
    return (
        <div
            className="hod-block"
            style={{
                height: `${height}%`,
                width: `${width}%`,
                left: `${x}%`,
                top: `${y}%`,
            }}></div>
    )
}
export default HodBlock
