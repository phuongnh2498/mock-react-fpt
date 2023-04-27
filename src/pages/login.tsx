import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context";

type LoginProps = {};

const Login: FC<LoginProps> = (props: LoginProps) => {
  const [email, setEmail] = useState<string>("phuongnh292@fsoft.com.vn");
  const [password, setPassword] = useState<string>("phuongnh29");
  const { login, error } = useAuth();
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add your login logic here
    // If login is successful, redirect to the home page
    await login(email, password);
  };

  return (
    <div className="container mx-auto mt-10 md:w-1/3 border-2 border-gray-300 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-20"
      >
        {error && <div className="text-red-500 mt-1">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link
            className="text-blue-500 hover:text-blue-700 "
            type="submit"
            to={"/register"}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
