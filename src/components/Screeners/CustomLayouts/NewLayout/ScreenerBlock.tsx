import {useEffect} from "react"
import "../layouts.css"
import {Rnd} from "react-rnd"
import GapBlock from "../ScreenerBlocks/GapBlock"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {
    setActiveBlock,
    setIsAddingScreener,
    setLayoutPosition,
} from "../../../../features/layoutSlice"
import HodScreener from "../../HodScreener/HodScreener"
import {IUserSingleLayout} from "../../../../interfaces"
import waitForElm from "../../../../waitForDOMElement"

interface IProps {
    index: number
    layout: IUserSingleLayout
}

const ScreenerBlock = ({layout, index}: IProps) => {
    const dispatch = useAppDispatch()

    const {
        screener,
        x: positionX,
        y: positionY,
        height: positionHeight,
        width: positionWidth,
    } = layout

    const {
        isDone,
        activeBlock,
        layoutsMainHeight,
        layoutsMainWidth,
        layoutMainPosition,
    } = useAppSelector((store) => store.layout)

    const done = () => {
        dispatch(setIsAddingScreener(false))
        dispatch(setActiveBlock(null))
        return
    }

    const move = async () => {
        const waitResult = await waitForElm(".rnd-block")
        const rect = (waitResult as HTMLElement).getBoundingClientRect()

        const {
            x: layoutMainX,
            y: layoutMainY,
            height: layoutMainHeight,
            width: layoutMainWidth,
        } = layoutMainPosition

        const {
            height: screenerHeight,
            width: screenerWidth,
            x: screenerX,
            y: screenerY,
        } = rect

        const xInPercentage =
            ((screenerX - layoutMainX) / layoutsMainWidth) * 100
        const yInPercentage =
            ((screenerY - layoutMainY) / layoutsMainHeight) * 100
        const heightInPercentage = (screenerHeight / layoutsMainHeight) * 100
        const widthInPercentage = (screenerWidth / layoutsMainWidth) * 100

        return {
            height: heightInPercentage,
            width: widthInPercentage,
            x: xInPercentage,
            y: yInPercentage,
        }
    }

    useEffect(() => {
        if (isDone) done()
    }, [isDone])

    if (screener === "hod") {
        return (
            <Rnd
                className="rnd-block"
                style={
                    activeBlock !== index
                        ? activeBlock !== null
                            ? {pointerEvents: "none", position: "absolute"}
                            : {position: "absolute"}
                        : {position: "absolute"}
                }
                default={{
                    x: (positionX / 100) * layoutsMainWidth,
                    y: (positionY / 100) * layoutsMainHeight,
                    width: (positionWidth / 100) * layoutsMainWidth,
                    height: (positionHeight / 100) * layoutsMainHeight,
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
                onDragStop={() => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    move()
                        .then(({x, y, height, width}) => {
                            dispatch(
                                setLayoutPosition({
                                    x: x,
                                    y: y,
                                    height: height,
                                    width: width,
                                    index: index,
                                })
                            )
                        })
                        .catch((e) => console.log(e))
                }}
                onResizeStop={async () => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const {height, width, x, y} = await move()
                    dispatch(
                        setLayoutPosition({
                            x: x,
                            y: y,
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
    if (screener === "gap") {
        return (
            <Rnd
                className="rnd-block"
                style={
                    activeBlock !== index
                        ? activeBlock !== null
                            ? {pointerEvents: "none"}
                            : {}
                        : {}
                }
                default={{
                    x: (positionX / 100) * layoutsMainWidth,
                    y: (positionY / 100) * layoutsMainHeight,
                    width: (positionWidth / 100) * layoutsMainWidth,
                    height: (positionHeight / 100) * layoutsMainHeight,
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
                onDragStop={() => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    move()
                        .then(({x, y, width, height}) => {
                            dispatch(
                                setLayoutPosition({
                                    x: x,
                                    y: y,
                                    height: height,
                                    width: width,
                                    index: index,
                                })
                            )
                        })
                        .catch((e) => console.log(e))
                }}
                onResizeStop={async () => {
                    if (activeBlock !== index && activeBlock !== null) {
                        return
                    }
                    const {height, width, x, y} = await move()
                    dispatch(
                        setLayoutPosition({
                            x: x,
                            y: y,
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
