export interface IScreenerBlockProps {
    width?: number
    height?: number
}

const GapBlock = ({width, height}: IScreenerBlockProps) => {
    return (
        <div
            className="gap-block"
            style={
                width || height
                    ? {
                          height: `${height}px`,
                          width: `${width}px`,
                          position: "absolute",
                      }
                    : {}
            }></div>
    )
}
export default GapBlock
