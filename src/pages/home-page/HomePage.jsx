import React from "react";
import { Link } from "react-router-dom";
import LightBtn from "../../components/buttons/LightBtn";
import "./HomePageStyles.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to My Quiz App!</h1>
      <div className="home-sec-btn">
        <Link to="/quiz">
          <LightBtn>Try a Quiz!</LightBtn>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
