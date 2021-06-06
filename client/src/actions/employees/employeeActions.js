import { baseUrl } from "../../constants";
import axios from "../axios";

export default class EmployeeActions {
  static addEmployee(payload) {
    return axios.post(`${baseUrl}/employees`, payload);
  }
  static updateEmployee(payload, id) {
    return axios.put(`${baseUrl}/employees/${id}`, payload);
  }
  static deleteEmployee(id) {
    return axios.delete(`${baseUrl}/employees/${id}`);
  }
  static getAllEmployees(name) {
    return axios.get(`${baseUrl}/employees`, { params: { name } });
  }
}
