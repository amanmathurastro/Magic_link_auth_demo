import React, { useState } from 'react';
import { loginUser } from '../magicServices/magicService';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authUserSlice';
import {
	Button,
	Card,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Container,
	Row,
} from 'react-bootstrap';

function LoginForm({ setStatus }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');

	const userEmailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			await loginUser(email, setStatus);
			dispatch(
				login({
					email: email,
					name: 'UserName',
					gender: 'male',
					mobileNo: '9999999999',
				}),
			);

			history.replace('/Home');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Card className='text-center' style={{ width: '18rem' }}>
					<Card.Header>Welcome to Demo Application</Card.Header>
					<Form onSubmit={submitHandler} className='p-2 my-5 mx-auto'>
						<FormGroup className='mb-3' controlId='formBasicEmail'>
							<FormLabel>Email:</FormLabel>
							<FormControl
								type='text'
								autoComplete='off'
								onChange={userEmailChangeHandler}
							/>
						</FormGroup>
						<Button variant='primary' type='submit'>
							Register/Login
						</Button>
					</Form>
				</Card>
			</Row>
		</Container>
	);
}

export default LoginForm;
