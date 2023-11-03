import {useEffect, useState} from "react"
import customFetch from "../../../utils"
import "./addtrade.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {updateUserField} from "../../../features/userSlice"
import {useNavigate} from "react-router-dom"

interface ITradeData {
    stock: string
    accAfter: number
    accBefore: number
    pl: number
    date: string
    time: string
    action: string
}

const AddTradeFileReader = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [file, setFile] = useState<File>()
    const [platform, setPlatform] = useState("")
    const [tradeData, setTradeData] = useState<ITradeData[]>([])

    const {user} = useAppSelector((store) => store.user)

    // SEND DATA TO DB ON SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const {data} = await customFetch.post("/tradesfile", {
                data: tradeData,
                id: user.id,
            })
            dispatch(updateUserField({field: "userTrades", value: data.trades}))
        } catch (e) {
            console.log(e)
        }
        setFile(undefined)
        setPlatform("")
        setTradeData([])
        navigate("/dashboard")
    }

    // READ AND PREPARE FILE FOR SENDING TO DB
    const prepareFile = () => {
        if (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                if (!e.target) return
                const content: string = String(e.target.result)
                const lines = content.split("\n")
                let tempArr: ITradeData[] = []

                for (let i = 1; i < lines.length - 1; i++) {
                    const LINE = lines[i].split(",")
                    const stock = LINE[4].split(" ")[5].split(":")[1]
                    const accBefore = parseFloat(LINE[1].replace(/\s/g, ""))
                    const accAfter = parseFloat(LINE[2].replace(/\s/g, ""))
                    const pl = parseFloat(LINE[3])
                    const date = LINE[0].slice(1, 9)
                    const time = LINE[0].slice(11, 17)
                    const action = LINE[4].slice(8, 13)
                    tempArr.push({
                        stock,
                        accAfter,
                        accBefore,
                        pl,
                        date,
                        time,
                        action,
                    })
                }
                setTradeData([...tempArr])
            }
            reader.readAsText(file)
        }
    }

    // WHEN USER ADDS FILE DO prepareFile() FUNCTION
    useEffect(() => {
        prepareFile()
    }, [file])

    return (
        <form onSubmit={handleSubmit} className="addtrade-filereader">
            <h3>File info</h3>
            <div>
                <label htmlFor="platform">
                    Please provide from where you downloaded your file:
                </label>
                <select
                    name="platform"
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={
                        platform === ""
                            ? {color: "var(--black-50)"}
                            : {color: "var(--black)"}
                    }>
                    <option value="">Choose platform</option>
                    <option value="tradingview">Tradingview</option>
                </select>
            </div>
            <div>
                <label htmlFor="file">File:</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => {
                        if (!e.target.files) return
                        setFile(e.target.files[0])
                    }}
                />
            </div>
            <div>
                <button type="submit">
                    <h5>Read</h5>
                </button>
            </div>
        </form>
    )
}
export default AddTradeFileReader
