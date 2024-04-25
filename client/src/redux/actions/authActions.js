import axios from 'axios';
import authService from '../../services/authService';
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from '../types/types';
import { API_Key } from '../../constants/consts';

export const loginUser = (formData) => (dispatch) => {
    // return axios.post("http://localhost:3000/api/v1/login", formData)
    return authService.login(formData.user, formData.password)
        .then((data) => {
            console.log(data);
            const payload = {
                token: data.accessToken,
                user: data,
            }
            dispatch({
                type: LOGIN_SUCCESS,
                payload,
            });
            
            localStorage.setItem('token', JSON.stringify(data.accessToken));
            localStorage.setItem('user', JSON.stringify(data));
            setAuthorization(data.accessToken);

            return Promise.resolve();
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAILURE, 
                payload: 'You cannot Login, Confirm the Crediential!'
            });
            return Promise.reject(err);
        });
};

export const registUser = (formData) => (dispatch) => {
    return authService.register(formData.username, formData.email, formData.password)
        .then((response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            return Promise.resolve();
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_FAILURE
            });

            return Promise.reject(err);
        });
}

export const logoutUser = () => {
    authService.logout();
    setAuthorization('');
}

export const setAuthorization = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
};