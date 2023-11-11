import userIcon from '../../../assets/user-icon.svg'
import './signupinfoform.css'
import {
	login,
	setIsLoading,
	setIsNotLoading,
} from '../../../features/userSlice'
import customFetch from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import md5 from 'md5'
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks'
import {
	setUserInfoBool,
	setUserInfoString,
} from '../../../features/userInfoFormSlice'

const SignupInfoForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const {
		email,
		password,
		choosePricing,
		firstName,
		lastName,
		username,
		account,
		image,
		pricingPlan,
	} = useAppSelector((store) => store.userInfo)

	const temp = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tgt = e.target
		const files = tgt.files

		if (FileReader && files && files.length) {
			const fr = new FileReader()
			fr.onload = function () {
				setUserInfoString({ prop: 'image', value: fr.result as string })
			}
			fr.readAsDataURL(files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(setIsLoading())
		if (!choosePricing) {
			dispatch(setUserInfoBool({ prop: 'choosePricing', value: true }))
			navigate('/pricing')
			dispatch(setIsNotLoading())
			return
		}

		const { data } = await customFetch.post('/signup', {
			email: email,
			userData: {
				email,
				firstName,
				lastName,
				username,
				startingAccount: account,
				account,
				image,
				pricing: pricingPlan,
			},

			password: md5(password),
		})
		if (data.message !== 'success') {
			dispatch(setIsNotLoading())
			toast.error(data.message)
			return
		}
		localStorage.setItem('token', data.token)

		dispatch(setUserInfoString({ prop: 'email', value: '' }))
		dispatch(setUserInfoString({ prop: 'password', value: '' }))
		dispatch(setUserInfoString({ prop: 'confirmPassword', value: '' }))
		dispatch(setUserInfoString({ prop: 'firstName', value: '' }))
		dispatch(setUserInfoString({ prop: 'lastName', value: '' }))
		dispatch(setUserInfoString({ prop: 'username', value: '' }))
		dispatch(setUserInfoString({ prop: 'account', value: '' }))
		dispatch(setUserInfoString({ prop: 'image', value: userIcon }))
		dispatch(setUserInfoBool({ prop: 'choosePricing', value: false }))
		console.log(data)
		dispatch(
			login({
				id: data.id,
				info: data.info,
				trades: data.trades,
				notes: data.notes,
				layouts: data.layouts,
				messages: data.messages,
				friends: data.friends,
				recievedFriendRequests: data.recievedFriendRequests,
				sentFriendRequests: data.sentFriendRequests,
				blockedUsers: data.blockedUsers,
				lastActiveChat: data.lastActiveChat,
				hiddenMessages: data.hiddenMessages,
			})
		)
		toast.success('success')
		dispatch(setIsNotLoading())
		navigate('/dashboard')
	}

	return (
		<section className='signup-info-form'>
			<form onSubmit={handleSubmit}>
				{/* left  */}
				<div className='signup-info-form-profile-pic'>
					<h2>Profile picture</h2>
					<div>
						<input
							onChange={temp}
							type='file'
							name='profilePic'
							id='profilePic'
							accept='image/*'
						/>
						<label htmlFor='profilePic' id='outImage'>
							<img src={image} alt='profile picture' />
						</label>
					</div>
					<p>
						*for better image design it would be great to choose or
						crop image with aspect ratio of 1:1
					</p>
				</div>
				{/* right */}
				<div className='signup-info-form-input-container'>
					<div>
						<input
							value={firstName}
							onChange={(e) =>
								dispatch(
									setUserInfoString({
										prop: 'firstName',
										value: e.target.value,
									})
								)
							}
							type='text'
							name='firstName'
							id='firstName'
						/>
						<label
							className={firstName ? 'label-up' : ''}
							htmlFor='firstName'
						>
							<h5>First Name: </h5>
						</label>
					</div>
					<div>
						<input
							type='text'
							name='lastName'
							id='lastName'
							value={lastName}
							onChange={(e) =>
								dispatch(
									setUserInfoString({
										prop: 'lastName',
										value: e.target.value,
									})
								)
							}
						/>
						<label
							className={lastName ? 'label-up' : ''}
							htmlFor='lastName'
						>
							<h5>Last Name: </h5>
						</label>
					</div>
					<div>
						<input
							type='text'
							name='username'
							id='username'
							value={username}
							onChange={(e) =>
								dispatch(
									setUserInfoString({
										prop: 'username',
										value: e.target.value,
									})
								)
							}
						/>
						<label
							className={username ? 'label-up' : ''}
							htmlFor='username'
						>
							<h5>Create Username: </h5>
						</label>
					</div>
					<div>
						<input
							type='number'
							name='account'
							id='account'
							value={account}
							onChange={(e) =>
								dispatch(
									setUserInfoString({
										prop: 'account',
										value: e.target.value,
									})
								)
							}
						/>
						<label
							className={account ? 'label-up' : ''}
							htmlFor='account'
						>
							<h5>Your Account Balance ($): </h5>
						</label>
					</div>
					<div className='signup-form-submit'>
						<button type='submit'>
							<h5>Finish</h5>
						</button>
					</div>
				</div>
			</form>
		</section>
	)
}
export default SignupInfoForm
