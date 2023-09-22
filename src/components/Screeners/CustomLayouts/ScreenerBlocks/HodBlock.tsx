import {IScreenerBlockProps} from "./GapBlock"

const HodBlock = ({height, width, x, y}: IScreenerBlockProps) => {
    return (
        <div
            className="hod-block"
            style={{
                height: `${height}px`,
                width: `${width}px`,
                left: `${x}px`,
                top: `${y}px`,
            }}></div>
    )
}
export default HodBlock
