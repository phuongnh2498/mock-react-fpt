import axios, { AxiosInstance, AxiosError ,AxiosRequestConfig, InternalAxiosRequestConfig, AxiosHeaders} from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
// Define your base URL
const API_BASE_URL = 'http://10.133.222.255:8080/v1/api';

// Define your headers without the token
const API_HEADERS = {
  'Content-Type': 'application/json',
};

// Create a custom Axios instance with the base URL and headers
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: API_HEADERS,
});

// Define a function to get the access token from storage
export const getLocalAuthData=(): AuthData | null =>{
  const authDataString = localStorage.getItem('authData');
  if(!authDataString || authDataString===undefined|| authDataString===null){
  return null;  
  }
 const authData: AuthData =  JSON.parse(authDataString);
  return authData;
}

// Define a function to store the access token and refresh token
export const setLocalAuthData=(authData:AuthData): void =>{
  localStorage.setItem('authData', JSON.stringify(authData));
}

// Define an interceptor to add the access token to every request

apiClient.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    const auth = getLocalAuthData();
    if (auth?.access_token) {
        config.headers.access_token = auth?.access_token;
    }
    return config;},
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Define an interceptor to refresh the access token if it has expired
apiClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest:AxiosRequestConfig|undefined = error.config;
    const auth = getLocalAuthData();
    if (error.response && error.response.status === 401 && auth?.refresh_token && originalRequest&& !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const options = {
          headers: {
            refresh_token: auth.refresh_token,
          },
        };
        const response = await axios.get('/auths/refreshToken', options);
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;
        auth.access_token = newAccessToken;
        auth.refresh_token = newRefreshToken;
        setLocalAuthData(auth);
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
