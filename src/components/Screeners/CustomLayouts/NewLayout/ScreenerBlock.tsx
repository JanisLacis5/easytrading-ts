import {useEffect, useState} from "react"
import "../layouts.css"
import {Rnd} from "react-rnd"
import HodBlock from "../ScreenerBlocks/HodBlock"
import GapBlock from "../ScreenerBlocks/GapBlock"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {
    newLayout,
    setActiveBlock,
    setIsAddingScreener,
    setIsDone,
} from "../../../../features/layoutSlice"
import {IUserSingleLayout} from "../../../../interfaces"

interface IProps {
    index: number
    layout: string
}

const ScreenerBlock = ({layout, index}: IProps) => {
    const dispatch = useAppDispatch()
    const [params, setParams] = useState<IUserSingleLayout>({
        screener: "",
        x: 0,
        y: 0,
        height: 240,
        width: 400,
    })

    const {
        isDone,
        activeBlock,
        layoutParams,
        layoutsMainHeight,
        layoutsMainWidth,
    } = useAppSelector((store) => store.layout)

    const done = () => {
        dispatch(newLayout(params))
        dispatch(setIsDone(false))
        dispatch(setIsAddingScreener(false))
        dispatch(setActiveBlock(null))
        return
    }

    const resize = (
        params: IUserSingleLayout,
        screener: "gap" | "hod",
        height: number,
        width: number
    ) => {
        const heightInPrecentage = (height / layoutsMainHeight) * 100
        const widthInPrecentage = (width / layoutsMainWidth) * 100
        console.log(heightInPrecentage)
        return {
            ...params,
            screener: screener,
            height: heightInPrecentage,
            width: widthInPrecentage,
        }
    }

    const drag = (
        params: IUserSingleLayout,
        screener: "gap" | "hod",
        x: number,
        y: number
    ) => {
        const xInPrecentage = (x / layoutsMainHeight) * 100
        const yInPrecentage = (y / layoutsMainWidth) * 100
        return {
            ...params,
            screener: screener,
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
                    dispatch(setIsDone(false))
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onResizeStart={() => {
                    dispatch(setIsDone(false))
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onDragStop={(e, d) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const x = d.x
                    const y = d.y
                    const tempParams = drag(params, layout, x, y)
                    setParams({...tempParams})
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const width = Number(ref.style.width.slice(0, -2))
                    const height = Number(ref.style.height.slice(0, -2))
                    const tempParams = resize(params, layout, height, width)
                    setParams({...tempParams})
                }}>
                <HodBlock />
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
                    dispatch(setIsDone(false))
                    dispatch(setIsAddingScreener(true))
                }}
                onResizeStart={() => {
                    dispatch(setIsDone(false))
                    dispatch(setIsAddingScreener(true))
                    dispatch(setActiveBlock(index))
                }}
                onDragStop={(e, d) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const x = d.x
                    const y = d.y
                    const tempParams = drag(params, layout, x, y)
                    setParams({...tempParams})
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const width = Number(ref.style.width.slice(0, -2))
                    const height = Number(ref.style.height.slice(0, -2))
                    const tempParams = resize(params, layout, height, width)
                    setParams({...tempParams})
                }}>
                <GapBlock />
            </Rnd>
        )
    }
}
export default ScreenerBlock
