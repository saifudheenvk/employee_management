import axios from "axios";
import { baseUrl } from "../constants";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const requestHandler = (request) => {
  // Modify request here
  request.headers = {
    ...request.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userCredentials")}`,
  };

  return request;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

const errorHandler = (error) => {
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (!response) message.error("Something went wrong at server side!");
  // handle success response
  const { data, status } = response;
  if (status === 500) {
    message.error("Something went wrong at server side");
  } else if (status === 400 || status === 401) {
    message.error(data.statusText);
  }

  return response;
};

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
