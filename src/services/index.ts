// define some example arrow funtion to call api using axios exported from axios.ts

import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../shared/axios";

const handleError = (error:AxiosError) => {
  const message=
    (error.response && error.response.data+"" ) ||
    error.message ||
    "Something went wrong!";
  throw new Error(message);
};

// Login API Call
export const axios_login = async (email:string, password:string): Promise<AxiosResponse<LoginResponse>>  => {
  const response = await apiClient.post<LoginRequest,AxiosResponse<LoginResponse>>("/auths/login", { email, password }).catch(handleError);
  return response;
};
// Add Register API Call
export const axios_addUser = async (user:RegisterRequest): Promise<AxiosResponse<RegisterResponse>>  => {
  const response = await apiClient.post("/users", user).catch(handleError);
  return response;
};
export const axios_getUsersByID= async (userId:string): Promise<AxiosResponse<UserResponse>>  => {
  const response = await apiClient.get(`/users/filter/${userId}`).catch(handleError);
  return response;
};

// Get Users API Call
export const axios_getUsers = async (): Promise<AxiosResponse<User[]>>  => {
  const response = await apiClient.get("/users").catch(handleError);
  return response;
};

