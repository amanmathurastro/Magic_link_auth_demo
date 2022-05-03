import { configureStore } from '@reduxjs/toolkit';
import authUserReducers from './authUserSlice';

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
	return (next) => (action) => {
		const result = next(action);
		localStorage.setItem('applicationState', JSON.stringify(getState()));
		return result;
	};
};

const reHydrateStore = () => {
	if (localStorage.getItem('applicationState') !== null) {
		return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
	}
};

const store = configureStore({
	reducer: {
		authUser: authUserReducers,
	},
	preloadedState: reHydrateStore(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
