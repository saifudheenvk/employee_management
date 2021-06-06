import { baseUrl } from "../../constants";
import axios from "../axios";

export default class UserActions {
  static authenticateUser(payload) {
    return axios.post(`${baseUrl}/auth/login`, payload);
  }
  static registerUser(payload) {
    return axios.post(`${baseUrl}/users/create`, payload);
  }
  static getUserById(id) {
    return axios.get(`${baseUrl}/users/${id}`);
  }
  static getAllUsers(id) {
    return axios.get(`${baseUrl}/users`);
  }
}
