import { createContext, useContext, useEffect, useState } from "react";
import { axios_getUsersByID, axios_login } from "../services";
import { getLocalAuthData, setLocalAuthData } from "../shared/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: AuthData | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  if (!context?.user) {
    context.user = getLocalAuthData();
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // make API request to fetch user data
    const response = await axios_login(email, password);
    const responseData = response.data;

    const AuthData = responseData.data;
    if (!responseData.errors && AuthData) {
      //set to local storage
      setLocalAuthData(AuthData);
      setUser(AuthData);
      setIsLoading(false);
      navigate("/");
      return;
    }
    setError(
      (responseData.errors && responseData.errors[0].error_message) ||
        "Some thing gone Wrong!"
    );
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
