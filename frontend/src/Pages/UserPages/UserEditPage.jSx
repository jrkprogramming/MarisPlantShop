import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserDetails, editUserInfo } from "../Actions/userActions";
import { listOrders } from "../Actions/orderActions";

const UserEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userEdit = useSelector((state) => state.userEdit);
  const { success } = userEdit;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/users/login");
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: "USER_RESET" });
        dispatch(getUserDetails("profile"));
        dispatch(listOrders());
      } else {
        setUsername(user.username);
        setEmail(user.email);
        set_first_name(user.first_name);
        set_last_name(user.last_name);
      }
    }
  }, [userInfo, navigate, user, dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match");
    } else {
      dispatch(
        editUserInfo({
          id: user.id,
          username: user.username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password,
        })
      );
    }
    navigate("/plants");
  };

  return <div></div>;
};

export default UserEditPage;
