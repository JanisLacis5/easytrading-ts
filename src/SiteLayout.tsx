import {Outlet, useNavigate} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import {useEffect} from "react"
import {useAppDispatch} from "./store/storeHooks"
import {resetLinks} from "./features/smallSlice"
import "./components/Navbar/smalllink.css"
import {useAppSelector} from "./store/storeHooks"
import {setWidth} from "./features/defaultSlice"
import SmallLinks from "./components/Navbar/SmallLinks"

const SiteLayout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLogged} = useAppSelector((store) => store.user)
    const {showSmallLinks} = useAppSelector((store) => store.small)
    const {screenWidth} = useAppSelector((store) => store.default)

    const screenerPaths = ["/hod", "/gap", "loading"]
    const pathsWithoutNavbar = [
        ...screenerPaths,
        "/landing",
        "/login",
        "/signup",
        "/signup/form",
    ]

    useEffect(() => {
        window.onresize = () => dispatch(setWidth(window.innerWidth))
    }, [])

    useEffect(() => {
        if (screenWidth > 900) {
            dispatch(resetLinks())
        }
    }, [screenWidth])

    useEffect(() => {
        if (screenerPaths.find((s) => s === window.location.pathname)) {
            return
        }
        if (window.location.pathname !== "/loading") {
            const currentPage = sessionStorage.getItem("currentPage")
            if (isLogged) {
                if (currentPage && currentPage !== "/landing") {
                    navigate(currentPage)
                } else {
                    navigate("/dashboard")
                }
            } else {
                navigate("/landing")
            }
        } else {
            navigate("/dashboard")
        }
    }, [])

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem("currentPage", window.location.pathname)
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

    return (
        <main>
            {!pathsWithoutNavbar.find(
                (s) => s === window.location.pathname
            ) && <Navbar />}
            {showSmallLinks ? <SmallLinks /> : <Outlet />}
        </main>
    )
}
export default SiteLayout
