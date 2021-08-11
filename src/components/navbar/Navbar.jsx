import React from "react";
import "./NavbarStyles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/q.svg";
import { useSelector } from "react-redux";
import SignOutBtn from "../auth-buttons/SignOutBtn";

const Navbar = () => {
  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  const authUserPhoto = useSelector(
    (state) => state.persistedReducer.auth.authInfo.photoUrl
  );
  const authUserId = useSelector(
    (state) => state.persistedReducer.auth.authInfo.uid
  );
  return (
    <div>
      <ul className="main-nav">
        <li className="main-nav__item">
          <Link to="/">
            <Logo className="logo" height="35" width="35" fill="#f7f7f7" />
          </Link>
        </li>
        <li className="main-nav__item">
          <ul className="secondary-nav">
            <li className="secondary-nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="secondary-nav__item">
              {" "}
              <Link to="/quiz">Quiz</Link>
            </li>
            {/* <li className="secondary-nav__item">
              {" "}
              <Link to="/create">Create</Link>
            </li> */}
            <li className="secondary-nav__item">
              {" "}
              <Link to="/leaderboard">Leaderboard</Link>
            </li>

            {!isAuth ? (
              <>
                <li className="secondary-nav__item">
                  {" "}
                  <Link to="/signIn">Sign-In</Link>
                </li>
                <li className="secondary-nav__item">
                  {" "}
                  <Link to="/signUp">Sign-up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="secondary-nav__item">
                  <Link to={`/userSettings/${authUserId}`}>
                    <img src={authUserPhoto} alt="user" />
                  </Link>
                </li>
                <li className="secondary-nav__item">
                  {" "}
                  <SignOutBtn />
                  {/*  ON THE SIGN OUT CLEAR THE AUTH INFO */}
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
