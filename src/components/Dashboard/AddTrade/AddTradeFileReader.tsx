import { useState } from "react"
import "./addtrade.css"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import { updateUserField } from "../../../features/userSlice"
import { useNavigate } from "react-router-dom"
import customFetch from "../../../utils"

const AddTradeFileReader = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [file, setFile] = useState<File>()
	const [platform, setPlatform] = useState("")

	const { user } = useAppSelector((store) => store.user)

	// SEND DATA TO DB ON SUBMIT
	const handleSubmitIbkr = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (file) {
			const reader = new FileReader()
			reader.onload = async (e) => {
				try {
					const fileContent = e.target?.result
					const { data } = await customFetch.post("ibkr-file", {
						file: fileContent,
						userId: user.id,
					})
					dispatch(
						updateUserField({
							field: "userTrades",
							value: data.trades as any,
						})
					)
					setFile(undefined)
					setPlatform("")
					navigate("/dashboard")
				} catch (error) {
					console.log(error)
				}
			}
			reader.readAsBinaryString(file)
		}
	}

	const handleSubmitTrW = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form
			onSubmit={platform === "ibkr" ? handleSubmitIbkr : handleSubmitTrW}
			className="addtrade-filereader"
		>
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
							? { color: "var(--black-50)" }
							: { color: "var(--black)" }
					}
					required
				>
					<option value="">Choose platform</option>
					<option value="tradingview">Tradingview</option>
					<option value="ibkr">Interactive Borkers</option>
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
