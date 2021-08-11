import React, { useState } from "react";
import "./SignUpPageStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setSignInState } from "../../features/auth/authSlice";
import { saveUserToDb } from "../../features/users/userDataSlice";
import { auth } from "../../firebase/firebaseUtils";
import { Link } from "react-router-dom";
import DarkBtn from "../../components/buttons/DarkBtn";
import CustomInput from "../../components/inputs/CustomInput";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [signUpCreds, setSignUpCreds] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = signUpCreds;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignUpCreds({ ...signUpCreds, [name]: value });
  };
  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          user.updateProfile({
            displayName: displayName,
            photoURL:
              "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          });
          // will need this for sign in with google
          var isNewUser = userCredential.additionalUserInfo.isNewUser;

          // add user to database
          dispatch(
            saveUserToDb({
              displayName: displayName,
              email: user.email,
              photoUrl:
                "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              uid: user.uid,
            })
          );
          // add user to redux state
          console.log(user);
          dispatch(
            setSignInState({
              uid: user.uid,
              permissions: "client",
              email: user.email,
              isAuthenticated: true,
              displayName: displayName,
              photoURL:
                "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            })
          );
          return user;
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
          // ..
        });
    } else {
      console.log("passwords do not match");
    }
  };
  return (
    <div className="sign-up-page">
      {isAuth ? (
        <Redirect to="/" />
      ) : (
        <>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              placeholder="displayName "
              minLength="3"
              maxLength="12"
            />
            <CustomInput
              type="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={handleChange}
            />
            <CustomInput
              // change this to password when finished with app

              type="text"
              name="password"
              value={password}
              onChange={handleChange}
              minLength="6"
              maxLength="12"
              placeholder="password"
            />
            <CustomInput
              // change this to password when finished with app
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              minLength="6"
              maxLength="12"
              placeholder="confirm password"
            />
            <Link to="/signIn">Already Have an Account?</Link>

            <DarkBtn>Sign up</DarkBtn>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
