import React from "react";
import "./ButtonsStyles.scss";

const LightBtn = ({ ...otherProps }) => {
  return (
    <div>
      <button className="light-btn" {...otherProps}></button>
    </div>
  );
};

export default LightBtn;
