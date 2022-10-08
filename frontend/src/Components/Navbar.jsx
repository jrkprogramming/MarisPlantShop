import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/userActions";

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    // <nav>
    //   <Link to='/plants'>Plant Shop</Link>
    //   <Link to='/cart'>Cart</Link>
    //   {userInfo ? (
    //     <a>
    //       <Link to='/users/profile'>{userInfo.username}</Link>
    //       <button onClick={logoutHandler}>Logout</button>
    //     </a>
    //     ):
    //     <div>
    //       <Link to='/users/login'>Login</Link>
    //       <Link to='/users/signup'>Signup</Link>
    //     </div>

    //     }

    //   {userInfo?.is_staff === true ? <Link to='/admin/plantList'>Plants List</Link> : null}
    // </nav>

    <nav class="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        {userInfo ? (
          <div className="flex flex-row ">
            <a href="/plants" class="flex items-center px-2">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Welcome, {userInfo.username}
              </span>
            </a>
          </div>
        ) : (
          <div>
            <a href="/plants" class="flex items-center px-2">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Plant Cultivar
              </span>
            </a>
          </div>
        )}

        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/plants"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Browse
              </a>
            </li>

            {userInfo ? (
              <li>
                <a
                  href="/users/profile"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Orders
                </a>
              </li>
            ) : null}
            {userInfo ? (
              <li>
                <a
                  href="/cart"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Cart
                </a>
              </li>
            ) : null}

            {userInfo ? (
              <li>
                <a
                  href="/users/logout"
                  onClick={logoutHandler}
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign Out
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/users/login"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign In
                </a>
              </li>
            )}

            {userInfo?.is_staff === true ? (
              <li>
                <a
                  href="/admin/plantList"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Admin
                </a>
              </li>
            ) : // <li>
            //     <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Admin <svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>

            //     <div id="dropdownNavbar" class="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
            //         <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            //           <li>
            //             <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            //           </li>
            //           <li>
            //             <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            //           </li>
            //           <li>
            //             <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            //           </li>
            //         </ul>
            //         <div class="py-1">
            //           <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
            //         </div>
            //     </div>
            // </li>

            null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
