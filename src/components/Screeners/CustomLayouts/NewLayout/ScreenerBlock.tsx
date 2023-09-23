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

    const {
        isDone,
        activeBlock,
        layoutParams,
        layoutsMainHeight,
        layoutsMainWidth,
    } = useAppSelector((store) => store.layout)

    const [params, setParams] = useState<IUserSingleLayout>({
        screener: layout,
        x: 0,
        y: 0,
        height: (240 / layoutsMainHeight) * 100,
        width: (400 / layoutsMainWidth) * 100,
    })

    const done = () => {
        dispatch(newLayout(params))
        dispatch(setIsAddingScreener(false))
        dispatch(setActiveBlock(null))
        return
    }

    const resize = (
        params: IUserSingleLayout,
        height: number,
        width: number
    ) => {
        const heightInPercentage = (height / layoutsMainHeight) * 100
        const widthInPercentage = (width / layoutsMainWidth) * 100
        return {
            ...params,
            height: heightInPercentage,
            width: widthInPercentage,
        }
    }

    const drag = (params: IUserSingleLayout, x: number, y: number) => {
        const xInPrecentage = (x / layoutsMainWidth) * 100
        const yInPrecentage = (y / layoutsMainHeight) * 100
        return {
            ...params,
            x: xInPrecentage,
            y: yInPrecentage,
        }
    }

    useEffect(() => {
        console.log(isDone)

        if (isDone) done()
    }, [isDone])

    useEffect(() => {
        console.log(params)
    }, [params])

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
                    const x = d.x
                    const y = d.y
                    const tempParams = drag(params, x, y)
                    setParams({...tempParams})
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const width = Number(ref.style.width.slice(0, -2))
                    const height = Number(ref.style.height.slice(0, -2))
                    const tempParams = resize(params, height, width)
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
                    const x = d.x
                    const y = d.y
                    const tempParams = drag(params, x, y)
                    setParams({...tempParams})
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const width = Number(ref.style.width.slice(0, -2))
                    const height = Number(ref.style.height.slice(0, -2))
                    const tempParams = resize(params, height, width)
                    setParams({...tempParams})
                }}>
                <GapBlock />
            </Rnd>
        )
    }
}
export default ScreenerBlock
