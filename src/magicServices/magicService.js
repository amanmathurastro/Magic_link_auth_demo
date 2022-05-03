import { Magic } from 'magic-sdk';

const magic = new Magic(process.env.REACT_APP_PK_KEY);

export const loginUser = async (email, setStatus) => {
	await magic.auth.loginWithMagicLink({ email });
	return setStatus({ isLoggedIn: true, email: email });
};

export const isUserLoggedIn = async (setStatus) => {
	const isLoggedIn = await magic.user.isLoggedIn();
	if (isLoggedIn) {
		const userData = await magic.user.getMetadata();
		console.log(userData);
		return setStatus({ isLoggedIn: true, email: userData.email });
	} else {
		return setStatus({ isLoggedIn: false, email: '' });
	}
};

export const logoutUser = async () => {
	await magic.user.logout();
};

export const getToken = async () => {
	try {
		return await magic.user.getIdToken();
	} catch (err) {
		throw new Error('Authenticate current session failed');
	}
};
