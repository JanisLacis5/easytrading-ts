export interface IScreenerBlockProps {
    width?: number
    height?: number
    x?: number
    y?: number
}

const GapBlock = ({width, height, x, y}: IScreenerBlockProps) => {
    return (
        <div
            className="gap-block"
            style={
                width || height
                    ? {
                          height: `${height}%`,
                          width: `${width}%`,
                          left: `${x}%`,
                          top: `${y}%`,
                      }
                    : {}
            }></div>
    )
}
export default GapBlock
