import React from "react";
import "./ButtonsStyles.scss";

const DarkBtn = ({ ...otherProps }) => {
  return (
    <>
      <button className="dark-btn" {...otherProps}></button>
    </>
  );
};

export default DarkBtn;
