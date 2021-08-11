import React from "react";
import "./InputStyles.scss";

const CustomInput = ({ minLength, maxLength, ...otherProps }) => {
  return (
    <>
      <input
        className="custom-input"
        {...otherProps}
        minLength={minLength}
        maxLength={maxLength}
      />
    </>
  );
};

export default CustomInput;
