import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Formik, Form, Field } from 'formik'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { FaTheaterMasks } from 'react-icons/fa'
import ProviderButton from './ProviderButton'
import Register from './Register'
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack
} from '@chakra-ui/react'

const SignIn = ({ onSignIn }) => {
	const auth = getAuth()
	const [isRegistering, setIsRegistering] = useState(false)
	const providersAndIcons = {
		Google: <FcGoogle />,
		GitHub: <AiFillGithub />,
		anonymous: <FaTheaterMasks />
	}

	const toggleRegisterView = () => {
		setIsRegistering(prevState => !prevState)
	}

	const signInForm = (
		<Formik
			initialValues={{
				email: '',
				password: ''
			}}
			validate={values => {
				const errors = {}
				if (!values.email) {
					errors.email = 'Required'
				}
				if (
					!/[A-Za-z0-9]+@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}/i.test(
						values.email
					)
				) {
					errors.email = 'Please enter a valid e-mail address'
				}
				if (!values.password || values.password.length < 8) {
					errors.password =
						'Password is empty or less than 8 characters'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				const signInUser = async (email, password) => {
					try {
						await signInWithEmailAndPassword(auth, email, password)
					} catch (error) {
						console.error(
							`An error occurred when registering a new user: ${error}`
						)
					}
				}
				signInUser(values.email, values.password)
				setSubmitting(false)
			}}>
			{({ values, errors, touched, isSubmitting }) => (
				<Form>
					<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
						<Stack spacing={4}>
							<Field>
								{({ field }) => (
									<FormControl
										id="email"
										isInvalid={
											touched.email && errors.email
										}>
										<FormLabel>Email address</FormLabel>
										<Input
											{...field}
											name="email"
											value={values.email}
											type="email"
										/>
										<FormErrorMessage>
											{errors.email}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field>
								{({ field }) => (
									<FormControl
										id="password"
										isInvalid={
											touched.password && errors.password
										}>
										<FormLabel>Password</FormLabel>
										<Input
											{...field}
											name="password"
											value={values.password}
											type="password"
										/>
										<FormErrorMessage isTruncated>
											{errors.password}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Stack spacing={3}>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}></Stack>
								<Button
									bg={'blue.400'}
									type="submit"
									color={'white'}
									_hover={{
										bg: 'blue.500'
									}}
									isDisabled={errors.email || errors.password}
									isLoading={isSubmitting}>
									Sign in
								</Button>
								<Link
									align="center"
									onClick={toggleRegisterView}
									color={'blue.400'}>
									New here? Create an account
								</Link>
							</Stack>
							<Divider />
							{Object.keys(providersAndIcons).map(
								(provider, index) => (
									<ProviderButton
										key={index}
										providerName={provider}
										icon={providersAndIcons[provider]}
										onSignIn={onSignIn}
									/>
								)
							)}
						</Stack>
					</Box>
				</Form>
			)}
		</Formik>
	)

	const signInView = (
		<Flex minH={'100vh'} direction="column" align="center" bg={'gray.50'}>
			{/* Sign-in form via https://chakra-templates.dev/forms/authentication */}
			<Flex align={'center'} direction="column" justify={'center'}>
				<Stack spacing={3} mx={'auto'} maxW={'lg'} py={4} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Sign in</Heading>
					</Stack>
					{signInForm}
				</Stack>
			</Flex>
		</Flex>
	)

	return isRegistering ? (
		<Register onCancel={toggleRegisterView} />
	) : (
		signInView
	)
}

export default SignIn
