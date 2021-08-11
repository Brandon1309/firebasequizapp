import React from "react";
import "./UserSettingsPageStyles.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CredChangeForm from "../../components/smaller-forms/CredChangeForm";
import {
  updateUserDisplayName,
  updateUserEmail,
  updateUserPhotoUrl,
} from "../../features/auth/authSlice";
import {
  changeDisplayNameInDb,
  changeEmailInDb,
  changePhotoUrlInDb,
} from "../../features/users/userDataSlice";
import "./UserSettingsPageStyles.scss";
import { Link, Redirect } from "react-router-dom";
import DarkBtn from "../../components/buttons/DarkBtn";

const UserSettingsPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  const authUserId = useSelector(
    (state) => state.persistedReducer.auth.authInfo.uid
  );
  const authDisplayName = useSelector(
    (state) => state.persistedReducer.auth.authInfo.displayName
  );
  const authEmail = useSelector(
    (state) => state.persistedReducer.auth.authInfo.email
  );
  const authPhotoUrl = useSelector(
    (state) => state.persistedReducer.auth.authInfo.photoUrl
  );
  const currentUserId = useSelector(
    (state) => state.persistedReducer.auth.currentUserId
  );
  const [settingsCredentials, setSettingsCredentials] = useState({
    email: "",
    photoUrl: "",
    displayName: "",
  });
  const { email, photoUrl, displayName } = settingsCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsCredentials({ ...settingsCredentials, [name]: value });
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    dispatch(updateUserEmail(email));
    dispatch(changeEmailInDb({ uid: authUserId, newEmail: email }));
  };
  const handleDisplayNameChange = (e) => {
    e.preventDefault();
    dispatch(updateUserDisplayName(displayName));
    dispatch(
      changeDisplayNameInDb({ uid: authUserId, newDisplayName: displayName })
    );
  };
  const handlePhotoChange = (e) => {
    e.preventDefault();
    dispatch(updateUserPhotoUrl(photoUrl));
    dispatch(changePhotoUrlInDb({ uid: authUserId, newPhotoUrl: photoUrl }));
  };

  return (
    <div className="user-settings-page">
      {isAuth && currentUserId === authUserId ? (
        <>
          <h1>User Settings</h1>
          <p>Current DisplayName: {authDisplayName}</p>
          <CredChangeForm
            type="text"
            name="displayName"
            value={displayName}
            placeholder="displayName"
            onSubmit={handleDisplayNameChange}
            btnValue="Change Display Name"
            onChange={handleChange}
            minLength="4"
            maxLength="15"
          />
          <p>Current Email: {authEmail}</p>
          <CredChangeForm
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onSubmit={handleEmailChange}
            btnValue="Change Email"
            onChange={handleChange}
            minLength="4"
            maxLength="15"
          />
          <p>Current Photo:</p>
          <img src={authPhotoUrl} alt="" />
          <CredChangeForm
            type="text"
            name="photoUrl"
            value={photoUrl}
            placeholder="PhotoUrl"
            onSubmit={handlePhotoChange}
            btnValue="Change Photo URL"
            onChange={handleChange}
            minLength="4"
            maxLength="250"
          />
          <div className="change-pass-section">
            <DarkBtn>
              <Link to={`/userSettings/${authUserId}/ChangePasswordPage`}>
                Change Password
              </Link>
            </DarkBtn>
          </div>
        </>
      ) : (
        <Redirect to="/signIn" />
      )}
    </div>
  );
};

export default UserSettingsPage;
