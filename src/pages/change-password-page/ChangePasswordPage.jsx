import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import DarkBtn from "../../components/buttons/DarkBtn";
import CustomInput from "../../components/inputs/CustomInput";
import { changeUserPassword } from "../../features/auth/authSlice";
import "./ChangePasswordPageStyles.scss";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const [passwordCreds, setPasswordCreds] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = passwordCreds;

  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  //   const authUserId = useSelector(
  //     (state) => state.persistedReducer.auth.authInfo.uid
  //   );
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPasswordCreds({ ...passwordCreds, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(changeUserPassword(password));
    } else {
      console.log("passwords dont match");
    }
  };
  return (
    <div>
      {isAuth ? (
        <div className="change-password-page">
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="password"
            />
            <CustomInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="confirmPassword"
            />
            <DarkBtn>Change</DarkBtn>
          </form>
        </div>
      ) : (
        <Redirect to="/signIn" />
      )}
    </div>
  );
};

export default ChangePasswordPage;
