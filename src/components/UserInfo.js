import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData, updateUserData } from '../store/authUserSlice';
import {
	Button,
	FormControl,
	Card,
	Container,
	Row,
	Form,
	ListGroup,
	FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';

const UserInfo = () => {
	const fetchedUserData = useSelector(getAuthUserData);
	const [isEdit, setIsEdit] = useState(false);
	const [userData, setUserData] = useState(fetchedUserData);

	const dispatch = useDispatch();
	const validEmail = new RegExp(
		'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
	);
	const validMobileNo = new RegExp('^[0-9]{10}$');

	const saveEditedData = (data) => {
		setUserData({ ...data });
		dispatch(updateUserData({ ...data }));
		setIsEdit(false);
	};
	const editHandler = () => {
		setIsEdit(true);
	};

	const formik = useFormik({
		initialValues: {
			name: userData.name,
			email: userData.email,
			gender: userData.gender,
			mobileNo: userData.mobileNo,
		},
		onSubmit: (values) => {
			saveEditedData(values);
		},
		validate: (values) => {
			let errors = {};
			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.email) {
				errors.email = 'Required';
			} else if (!validEmail.test(values.email)) {
				errors.email = 'Enter Valid email';
			}
			if (!values.mobileNo) {
				errors.mobileNo = 'Required';
			} else if (!validMobileNo.test(values.mobileNo)) {
				errors.mobileNo = 'Enter Valid Mobile NO';
			}

			if (!values.gender) {
				errors.gender = 'Required';
			}

			return errors;
		},
	});

	const renderUserInformation = !isEdit ? (
		<>
			<ListGroup variant='flush'>
				<ListGroup.Item>{userData.name}</ListGroup.Item>
				<ListGroup.Item>{userData.email}</ListGroup.Item>
				<ListGroup.Item>{userData.gender}</ListGroup.Item>
				<ListGroup.Item>{userData.mobileNo}</ListGroup.Item>
			</ListGroup>
		</>
	) : (
		<>
			<Form onSubmit={formik.handleSubmit}>
				<FormLabel>Name:</FormLabel>
				<FormControl
					type='text'
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					autoComplete='off'
				/>
				{formik.errors.name && (
					<div className='error'>{formik.errors.name}</div>
				)}
				<FormLabel>Gender:</FormLabel>
				<FormControl
					type='text'
					name='gender'
					value={formik.values.gender}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					autoComplete='off'
				/>
				{formik.errors.gender && (
					<div className='error'>{formik.errors.gender}</div>
				)}
				<FormLabel>Mobile No:</FormLabel>
				<FormControl
					type='text'
					name='mobileNo'
					value={formik.values.mobileNo}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					autoComplete='off'
				/>
				{formik.errors.mobileNo && (
					<div className='error'>{formik.errors.mobileNo}</div>
				)}
				<FormLabel>Email:</FormLabel>
				<FormControl
					type='text'
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					autoComplete='off'
				/>
				{formik.errors.email && (
					<div className='error'>{formik.errors.email}</div>
				)}
				<Button size='sm' type='submit'>
					Save
				</Button>
			</Form>
		</>
	);

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Card className='text-center' style={{ width: '40rem' }}>
					<Card.Header>USER INFORMATION</Card.Header>
					<Card.Body>
						{renderUserInformation}
						{!isEdit && (
							<Button onClick={editHandler} size='sm'>
								Edit Details
							</Button>
						)}
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};

export default UserInfo;
