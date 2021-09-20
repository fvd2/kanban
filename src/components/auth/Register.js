import { auth } from '../../services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Formik, Form, Field } from 'formik'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack
} from '@chakra-ui/react'

const Register = ({onCancel}) => {
	const registrationForm = (
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
				const createUser = async (email, password) => {
					try {
						await createUserWithEmailAndPassword(
							auth,
							email,
							password
						)
					} catch (error) {
						console.error(
							`An error occurred when registering a new user: ${error}`
						)
					}
				}
				createUser(values.email, values.password)
				setSubmitting(false)
			}}>
			{({ values, errors, touched, isSubmitting }) => (
				<Form>
					<Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
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
								<Flex>
									<Button mr={2} onClick={onCancel} variant="outline">Cancel</Button>
									<Button
										bg={'blue.400'}
										type="submit"
										color={'white'}
										_hover={{
											bg: 'blue.500'
										}}
										isDisabled={
											errors.email || errors.password
										}
										isLoading={isSubmitting}>
										Register
									</Button>
								</Flex>
							</Stack>
						</Stack>
					</Box>
				</Form>
			)}
		</Formik>
	)

	return (
		<Flex minH={'100vh'} direction="column" align="center" bg="gray.50">
			<Flex align={'center'} justify={'center'}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Create an account</Heading>
					</Stack>
					{registrationForm}
				</Stack>
			</Flex>
		</Flex>
	)
}

export default Register
