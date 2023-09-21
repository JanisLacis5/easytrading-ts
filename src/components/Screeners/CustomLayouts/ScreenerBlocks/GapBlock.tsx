export interface IScreenerBlockProps {
    width: number
    height: number
}

const GapBlock = ({width, height}: IScreenerBlockProps) => {
    console.log("gap")

    return (
        <div
            className="gap-block"
            style={{height: `${height}px`, width: `${width}px`}}></div>
    )
}
export default GapBlock
