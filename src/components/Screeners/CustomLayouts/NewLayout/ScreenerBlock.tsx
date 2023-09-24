import {useEffect} from "react"
import "../layouts.css"
import {Rnd} from "react-rnd"
import GapBlock from "../ScreenerBlocks/GapBlock"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {
    setActiveBlock,
    setIsAddingScreener,
    setLayoutPosition,
    setLayoutSize,
} from "../../../../features/layoutSlice"
import HodScreener from "../../HodScreener/HodScreener"

interface IProps {
    index: number
    layout: string
}

const ScreenerBlock = ({layout, index}: IProps) => {
    const dispatch = useAppDispatch()

    const {isDone, activeBlock, layoutsMainHeight, layoutsMainWidth} =
        useAppSelector((store) => store.layout)

    const done = () => {
        dispatch(setIsAddingScreener(false))
        dispatch(setActiveBlock(null))
        return
    }

    const resize = (height: number, width: number) => {
        const heightInPercentage = (height / layoutsMainHeight) * 100
        const widthInPercentage = (width / layoutsMainWidth) * 100
        return {
            height: heightInPercentage,
            width: widthInPercentage,
        }
    }

    const drag = (x: number, y: number) => {
        const xInPrecentage = (x / layoutsMainWidth) * 100
        const yInPrecentage = (y / layoutsMainHeight) * 100
        return {
            x: xInPrecentage,
            y: yInPrecentage,
        }
    }

    useEffect(() => {
        if (isDone) done()
    }, [isDone])

    if (layout === "hod") {
        return (
            <Rnd
                style={
                    activeBlock !== index
                        ? activeBlock !== null
                            ? {pointerEvents: "none"}
                            : {}
                        : {}
                }
                default={{
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 250,
                }}
                dragGrid={[40, 25]}
                resizeGrid={[40, 25]}
                bounds={"parent"}
                onDragStart={() => {
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onResizeStart={() => {
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onDragStop={(e, d) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const tempX = d.x
                    const tempY = d.y
                    const {x, y} = drag(tempX, tempY)
                    dispatch(setLayoutPosition({x: x, y: y, index: index}))
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const tempWidth = Number(ref.style.width.slice(0, -2))
                    const tempHeight = Number(ref.style.height.slice(0, -2))
                    const {height, width} = resize(tempHeight, tempWidth)
                    dispatch(
                        setLayoutSize({
                            height: height,
                            width: width,
                            index: index,
                        })
                    )
                }}>
                <HodScreener />
            </Rnd>
        )
    }
    if (layout === "gap") {
        return (
            <Rnd
                style={
                    activeBlock !== index
                        ? activeBlock !== null
                            ? {pointerEvents: "none"}
                            : {}
                        : {}
                }
                default={{
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 250,
                }}
                dragGrid={[40, 25]}
                resizeGrid={[40, 25]}
                bounds={"parent"}
                onDragStart={() => {
                    dispatch(setActiveBlock(index))
                    dispatch(setIsAddingScreener(true))
                }}
                onResizeStart={() => {
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onDragStop={(e, d) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const tempX = d.x
                    const tempY = d.y
                    const {x, y} = drag(tempX, tempY)
                    dispatch(setLayoutPosition({x: x, y: y, index: index}))
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const tempWidth = Number(ref.style.width.slice(0, -2))
                    const tempHeight = Number(ref.style.height.slice(0, -2))
                    const {height, width} = resize(tempHeight, tempWidth)
                    dispatch(
                        setLayoutSize({
                            height: height,
                            width: width,
                            index: index,
                        })
                    )
                }}>
                <GapBlock />
            </Rnd>
        )
    }
}
export default ScreenerBlock
