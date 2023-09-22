import {IScreenerBlockProps} from "./GapBlock"

const HodBlock = ({height, width}: IScreenerBlockProps) => {
    return (
        <div
            className="hod-block"
            style={{
                height: `${height}px`,
                width: `${width}px`,
                position: "absolute",
            }}></div>
    )
}
export default HodBlock
