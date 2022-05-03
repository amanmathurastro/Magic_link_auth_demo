import React from 'react';
import UserInfo from './UserInfo';
import { logoutUser } from '../magicServices/magicService';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
	const history = useHistory();
	const logoutHandler = async () => {
		localStorage.clear();
		await logoutUser();
		history.replace('/');
	};

	return (
		<Container>
			<Row>
				<Col>
					<UserInfo />
				</Col>
				<Col>
					<Button onClick={logoutHandler}>Logout</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
