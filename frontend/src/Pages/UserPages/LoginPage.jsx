import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../Actions/userActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/plants");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div class="flexp-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 justify-center m-auto mt-[10%]">
      <form class="space-y-6" onSubmit={submitHandler}>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Welcome!
        </h5>
        <div>
          {/* <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Username</label> */}
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="username"
            name="username"
            value={username}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Username"
            required
          ></input>
        </div>
        <div>
          {/* <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label> */}
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            value={password}
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          ></input>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              ></input>
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <a
            href="#"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-stone-400 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <a
            href="/users/signup"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
