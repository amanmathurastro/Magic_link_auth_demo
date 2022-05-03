import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuthUserStatus } from '../store/authUserSlice';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component, ...rest }) => {
	const isLoggedIn = useSelector(getAuthUserStatus);
	console.log(isLoggedIn);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	);
};

export default PrivateRoutes;
