import React from "react";
// import "antd/dist/antd.css";
// import { Button } from "antd";
import "./ButtonsStyles.scss";

const QuizAnswerBtn = ({ ...otherProps }) => {
  return (
    <>
      <button className="quiz-ans-btn" {...otherProps}></button>
    </>
  );
};

export default QuizAnswerBtn;
