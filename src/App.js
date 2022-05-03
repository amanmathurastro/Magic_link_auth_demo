import { useState } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoutes';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthUserData } from './store/authUserSlice';
import './App.css';

function App() {
	const [user, setUser] = useState({ isLoggedIn: false, email: '' });

	const isLoggedIn = useSelector(getAuthUserData);

	return (
		<>
			{isLoggedIn && <Redirect to='/Home' />}
			<Switch>
				<Route path='/' exact>
					<LoginForm setStatus={setUser} />
				</Route>
				<PrivateRoutes path='/Home' component={Home} />
			</Switch>
		</>
	);
}

export default App;
