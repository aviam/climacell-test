import axios, { AxiosResponse } from 'axios';
import { AuthContextValue } from 'src/contexts/AuthContext';
import { AppDispatch } from 'src/store';

const axiosInstance = axios.create();

// disabled caching for http requests
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';
axiosInstance.defaults.headers.common['Pragma'] = 'no-cache';
axiosInstance.defaults.headers.common['Expires'] = '0';

export const initAxios = (
	user: AuthContextValue['user'],
	logout: AuthContextValue['logout'],
	updateToken: AuthContextValue['updateToken'],
	dispatch: AppDispatch,
): void => {
	const tokenRefresher = (res: AxiosResponse) => {
		if (res && res.headers['x-new-token']) {
			updateToken(res.headers['x-new-token']);
		}
	};

	axiosInstance.interceptors.response.use(
		(response) => {
			tokenRefresher(response);

			return response;
		},
		(error) => {
			tokenRefresher(error.response);

			if (error.response && error.response.headers['x-logout']) {
				logout(dispatch, user);
				console.log(`Server logged me out -  ${ user?.email }`);
			}

			if (typeof error === 'string') return Promise.reject(error);

			// Backend error that has some valid data to process
			if (error.no_error) return Promise.reject(error);

			return Promise.reject((error.response?.data || error.message) || 'Something went wrong');
		},
	);
};

export default axiosInstance;
