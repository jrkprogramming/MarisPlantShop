import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserDetails, editUserInfo } from "../Actions/userActions";
import { listOrders } from "../Actions/orderActions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userEdit = useSelector((state) => state.userEdit);
  const { success } = userEdit;

  const listMyOrders = useSelector((state) => state.listMyOrders);
  const { orders } = listMyOrders;

  useEffect(() => {
    if (!userInfo) {
      navigate("/users/login");
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: "USER_RESET" });
        dispatch(getUserDetails("profile"));
        dispatch(listOrders());
      }
    }
  }, [userInfo, navigate, user, dispatch, success]);

  console.log(orders);

  return (
    <div>
      <div class="max-w-2xl mx-auto mb-[10%]">
        <div>
          <h2 className="mt-5 mb-2 text-5xl font-medium leading-tight text-neutral-100">
            My Orders
          </h2>
          <div class="p-4 rounded-lg"></div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order #
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Paid Status
                </th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={order._id}
                >
                  <td class="px-6 py-4">{order.id}</td>
                  <td class="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                  <td class="px-6 py-4">${order.totalPrice}</td>
                  <td class="px-6 py-4" style={{ color: "green" }}>
                    {order.isPaid ? (
                      "PAID"
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}>
                        Not Paid
                      </i>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order.id}`}>
                      <button className="btn-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
      </div>
    </div>
  );
};

export default ProfilePage;
