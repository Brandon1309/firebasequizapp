import React from "react";
import { useDispatch } from "react-redux";
import { clearSignInState, signOutUser } from "../../features/auth/authSlice";
// import { auth } from "../../firebase/firebaseUtils";
// import { Button } from "antd";
import "../buttons/ButtonsStyles.scss";

const SignOutBtn = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signOutUser());
    dispatch(clearSignInState());
  };
  return (
    <>
      <button className="sign-out-btn" onClick={handleClick}>
        Sign-Out
      </button>
    </>
  );
};

export default SignOutBtn;
