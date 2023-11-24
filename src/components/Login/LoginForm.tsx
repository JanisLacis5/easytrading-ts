import "./login.css"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/storeHooks"
import { toast } from "react-toastify"
import { login, setIsLoading, setIsNotLoading } from "../../features/userSlice"
import { useNavigate } from "react-router-dom"
import { loginFunc } from "../../functions/userFunc"

const LoginForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { isLoading } = useAppSelector((store) => store.user)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(setIsLoading())

		const data = await loginFunc(email, password)

		if (data.error) {
			toast.error(data.error)
		} else {
			dispatch(
				login({
					data: data,
				})
			)
			navigate("/dashboard")
		}
		dispatch(setIsNotLoading())
	}

	if (isLoading) {
		return <div className="loading"></div>
	}

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="login-input">
				<input
					className="login-input-field"
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="email" className={email ? "label-up" : ""}>
					Email
				</label>
			</div>
			<div className="login-input">
				<input
					className="login-input-field"
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label
					htmlFor="password"
					className={password ? "label-up" : ""}
				>
					Password
				</label>
			</div>
			<button type="submit" className="login-button">
				Login
			</button>
		</form>
	)
}
export default LoginForm
