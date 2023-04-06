import axios, { AxiosInstance, AxiosError ,AxiosRequestConfig} from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
// Define your base URL
const API_BASE_URL = 'https://api.example.com';

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
function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}


// Define a function to get the refresh token from storage
function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

// Define a function to store the access token and refresh token
function setAuthTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

// Define an interceptor to add the access token to every request

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
    const refreshToken = getRefreshToken();
    if (error.response && error.response.status === 401 && refreshToken && originalRequest&& !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('/refresh-token', { refreshToken });
        const newAccessToken = response.data.accessToken;
        setAuthTokens(newAccessToken, refreshToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
