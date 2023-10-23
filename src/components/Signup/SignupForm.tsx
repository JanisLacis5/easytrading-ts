import './signup.css'
import '../Login/login.css'
import customFetch from '../../utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/storeHooks'
import { setIsNotLoading } from '../../features/userSlice'
import { setDefaultStateBool } from '../../features/defaultSlice'
import { setUserInfoString } from '../../features/userInfoFormSlice'
import { passwordRequirements } from '../../functions'

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { email, password, confirmPassword } = useAppSelector(
        (store) => store.userInfo
    )
    const { isMetReq } = useAppSelector((store) => store.default)
    const { isLoading } = useAppSelector((store) => store.user)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === confirmPassword) {
            const { data } = await customFetch.post('/checkuser', {
                email: email,
            })
            if (data.message === 'success') {
                // if (!passwordRequirements(password)) {
                //     dispatch(
                //         setDefaultStateBool({prop: "isMetReq", value: false})
                //     )
                //     dispatch(setUserInfoString({prop: "password", value: ""}))
                //     dispatch(
                //         setUserInfoString({prop: "confirmPassword", value: ""})
                //     )
                //     return
                // }
                dispatch(setDefaultStateBool({ prop: 'isMetReq', value: true }))
                navigate('/signup/form')
            } else {
                toast.error(data.message)
                dispatch(setUserInfoString({ prop: 'email', value: '' }))
                dispatch(setUserInfoString({ prop: 'password', value: '' }))
                dispatch(
                    setUserInfoString({
                        prop: 'confirmPassword',
                        value: '',
                    })
                )
            }
        } else {
            dispatch(setIsNotLoading())
            toast.error('Passwords do not match')
            dispatch(setUserInfoString({ prop: 'email', value: '' }))
            dispatch(setUserInfoString({ prop: 'password', value: '' }))
            dispatch(
                setUserInfoString({
                    prop: 'confirmPassword',
                    value: '',
                })
            )
        }
    }

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-input">
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        dispatch(
                            setUserInfoString({
                                prop: 'email',
                                value: e.target.value,
                            })
                        )
                        dispatch(
                            setDefaultStateBool({
                                prop: 'isMetReq',
                                value: true,
                            })
                        )
                    }}
                    required
                />
                <label htmlFor="email" className={email ? 'label-up' : ''}>
                    Email
                </label>
            </div>
            <div className="signup-input">
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        dispatch(
                            setUserInfoString({
                                prop: 'password',
                                value: e.target.value,
                            })
                        )
                        dispatch(
                            setDefaultStateBool({
                                prop: 'isMetReq',
                                value: true,
                            })
                        )
                    }}
                    required
                />
                <label
                    htmlFor="password"
                    className={password ? 'label-up' : ''}
                >
                    Password
                </label>
                {!isMetReq && (
                    <p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                        Password doesn't meet the requirements
                    </p>
                )}
            </div>
            <div className="signup-input">
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                        dispatch(
                            setUserInfoString({
                                prop: 'confirmPassword',
                                value: e.target.value,
                            })
                        )
                        dispatch(
                            setDefaultStateBool({
                                prop: 'isMetReq',
                                value: true,
                            })
                        )
                    }}
                    required
                />
                <label
                    htmlFor="confirmPassword"
                    className={confirmPassword ? 'label-up' : ''}
                >
                    Confirm Password
                </label>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignupForm
