
interface Error {
  error_code: number;
  error_field: string;
  error_message: string;
}

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}
interface AuthData {
  access_token: string;
  refresh_token: string;
  user_id: string;
  full_name: string;
}
interface UserResponse {
  data?: User;
  error?: Error[];
}
interface LoginResponse {
  data?: AuthData;
  errors?: Error[];
}
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirm_password: string;
  email: string;
}

interface RegisterResponse {
  timestamp: string;
  status_code: number;
  status_message: string;
  errors?:Error[]
}
interface FormValues {
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}