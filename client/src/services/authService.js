import axios from "axios";
import { URLS } from "../constants/consts";

const API_URL = URLS.baseURL + '/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        
        return Promise.resolve(response.data);
      }).catch((err) => {
        console.error('Error in Login', err);
        Promise.reject(err);
      })
  }

  reset_password(username) {
    return axios
      .post(API_URL + "send-reset-link", { username })
      .then((response) => {
        return response.data;
      });
  }

  update_password(code, password) {
    return axios
      .post(API_URL + "reset-password", { code, password })
      .then((response) => {
        return response.data;
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
