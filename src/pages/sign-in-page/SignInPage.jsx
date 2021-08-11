import React, { useState } from "react";
import "./SignInPageStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignOutBtn from "../../components/auth-buttons/SignOutBtn";
import DarkBtn from "../../components/buttons/DarkBtn";
import CustomInput from "../../components/inputs/CustomInput";
import { signInUser } from "../../features/auth/authSlice";
import { auth } from "../../firebase/firebaseUtils";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  const [signInCreds, setSignInCreds] = useState({ email: "", password: "" });
  const { email, password } = signInCreds;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInCreds({ ...signInCreds, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email: email, password: password }));
  };

  return (
    <div className="sign-in-page">
      {isAuth ? (
        <Redirect to="/" />
      ) : (
        <>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="email"
              required
              style={{ fontSize: "1rem" }}
            />
            <CustomInput
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="password"
              required
              style={{ fontSize: "1rem" }}
            />
            <Link to="/signUp">Dont have an account yet?</Link>
            <DarkBtn type="submit">Sign in</DarkBtn>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInPage;
