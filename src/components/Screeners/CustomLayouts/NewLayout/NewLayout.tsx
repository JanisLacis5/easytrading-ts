import '../layouts.css'
import { useEffect, useState } from 'react'
import ScreenerBlock from './ScreenerBlock'
import customFetch from '../../../../utils'
import {
    newLayoutScreener,
    resetLayoutParams,
    setEdit,
    setIsAddingScreener,
    setLayoutMainPosition,
    setLayoutsMainParams,
    setActiveBlock,
} from '../../../../features/layoutSlice'
import { login } from '../../../../features/userSlice'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks'
import { useNavigate } from 'react-router-dom'

const NewLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [notAllowedHover, setNotAllowedHover] = useState(false)
    const [layoutsMain, setLayoutsMain] = useState<Element | null>()

    const { isAddingScreener, layoutParams, edit } = useAppSelector(
        (store) => store.layout
    )
    const { user } = useAppSelector((store) => store.user)

    const newLayout = async () => {
        if (!layoutParams.length) {
            toast.error('you must add at least 1 screener')
            return
        }
        const { data } = await customFetch.post('/new-layout', {
            layout: layoutParams,
            id: user.id,
        })
        const {
            id,
            trades,
            notes,
            info,
            messages,
            friends,
            sentFriendRequests,
            recievedFriendRequests,
        } = user
        dispatch(
            login({
                id,
                trades,
                notes,
                info,
                layouts: data.layouts,
                messages,
                friends,
                sentFriendRequests,
                recievedFriendRequests,
            })
        )
        dispatch(resetLayoutParams())
        toast.success('success')
        navigate('/screeners')
    }

    const editLayout = async () => {
        const { data } = await customFetch.post('/edit-layout', {
            layoutIndex: edit,
            layout: layoutParams,
            id: user.id,
        })
        const {
            id,
            trades,
            notes,
            info,
            messages,
            friends,
            sentFriendRequests,
            recievedFriendRequests,
        } = user

        dispatch(
            login({
                id,
                trades,
                notes,
                info,
                layouts: data.layouts,
                messages,
                friends,
                sentFriendRequests,
                recievedFriendRequests,
            })
        )
        dispatch(resetLayoutParams())
        dispatch(setEdit(null))
        toast.success('success')
        navigate('/screeners')
    }

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        if (edit !== null) {
            editLayout()
        } else {
            newLayout()
        }
    }

    useEffect(() => {
        setLayoutsMain(document.querySelector('.new-layout-main'))
    }, [])

    useEffect(() => {
        if (layoutsMain) {
            const { x, y } = layoutsMain.getBoundingClientRect()
            dispatch(
                setLayoutsMainParams({
                    height: (layoutsMain as HTMLElement).clientHeight,
                    width: (layoutsMain as HTMLElement).clientWidth,
                })
            )
            dispatch(
                setLayoutMainPosition({
                    x: x,
                    y: y,
                })
            )
        }
    }, [layoutsMain])

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                {isAddingScreener && notAllowedHover && (
                    <p>Press "Done" to add next screener</p>
                )}
                <div className="new-layout-buttons">
                    <div
                        className="screener-select-container"
                        onMouseEnter={() => setNotAllowedHover(true)}
                        onMouseLeave={() => setNotAllowedHover(false)}
                    >
                        <select
                            value={''}
                            name="addScreener"
                            onChange={(e) => {
                                dispatch(
                                    newLayoutScreener(
                                        e.target.value as 'gap' | 'hod'
                                    )
                                )
                                dispatch(setIsAddingScreener(true))
                            }}
                            disabled={isAddingScreener ? true : false}
                        >
                            <option value="">Add Screener</option>
                            <option value="gap">Gap Screener</option>
                            <option value="hod">HOD Screener</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        style={
                            isAddingScreener
                                ? { backgroundColor: 'green' }
                                : {
                                      backgroundColor: 'green',
                                      opacity: '0.5',
                                      pointerEvents: 'none',
                                  }
                        }
                        onClick={() => {
                            dispatch(setIsAddingScreener(false))
                            dispatch(setActiveBlock(null))
                        }}
                    >
                        Done
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={
                            !isAddingScreener
                                ? {}
                                : { pointerEvents: 'none', opacity: '0.5' }
                        }
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="new-layout-main">
                <div id="lines" style={{ position: 'relative' }}>
                    {layoutParams.map((layout, index) => {
                        return (
                            <ScreenerBlock
                                key={index}
                                layout={layout}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default NewLayout
