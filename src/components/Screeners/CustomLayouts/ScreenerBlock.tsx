import {useEffect, useState} from "react"
import "./layouts.css"
import {Rnd} from "react-rnd"
import HodBlock from "./ScreenerBlocks/HodBlock"
import GapBlock from "./ScreenerBlocks/GapBlock"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {
    newLayout,
    setActiveBlock,
    setIsAddingScreener,
    setIsDone,
} from "../../../features/layoutSlice"
import {IUserSingleLayout} from "../../../interfaces"

interface IProps {
    index: number
    layout: string
}

const ScreenerBlock = ({layout, index}: IProps) => {
    const dispatch = useAppDispatch()
    let params: IUserSingleLayout = {
        screener: "",
        x: 0,
        y: 0,
        height: 240,
        width: 400,
    }

    const {isDone, activeBlock, layoutParams} = useAppSelector(
        (store) => store.layout
    )

    const done = () => {
        console.log(`params = ${JSON.stringify(params)}`)
        dispatch(newLayout(params))
        dispatch(setIsDone(false))
        dispatch(setIsAddingScreener(false))
        dispatch(setActiveBlock(null))
        return
    }

    useEffect(() => {
        if (isDone) done()
    }, [isDone])

    useEffect(() => {
        console.log(layoutParams)
    }, [layoutParams])

    if (layout === "hod") {
        params.screener = "hod"
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
                    params.x = d.x
                    params.y = d.y
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    console.log(Number(ref.style.width.slice(0, -2)))

                    params.width = Number(ref.style.width.slice(0, -2))
                    params.height = Number(ref.style.height.slice(0, -2))
                }}>
                <HodBlock />
            </Rnd>
        )
    }
    if (layout === "gap") {
        params.screener = "gap"
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
                    if (activeBlock !== index || activeBlock !== null) {
                        return
                    }
                    params.x = d.x
                    params.y = d.y
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if (activeBlock !== index || activeBlock !== null) {
                        return
                    }
                    params.width = Number(ref.style.width.slice(0, -2))
                    params.height = Number(ref.style.height.slice(0, -2))
                }}>
                <GapBlock />
            </Rnd>
        )
    }
}
export default ScreenerBlock
