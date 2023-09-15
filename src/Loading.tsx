import {useEffect} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import {login} from "./features/userSlice"
import customFetch from "./utils"
import {toast} from "react-toastify"

const Loading = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = searchParams.get("id")

    useEffect(() => {
        const getData = async () => {
            const {data} = await customFetch.post("/socialdata", {id: id})
            dispatch(
                login({
                    id: data.id,
                    trades: data.trades,
                    info: data.info,
                    notes: data.notes,
                })
            )
            if (data.info.account === "0") {
                toast.success(
                    'Enter your account balance in "Update Account Balance" field'
                )
                navigate("/userpage")
            }
        }
        getData()
    }, [])

    return <div className="loading"></div>
}
export default Loading
