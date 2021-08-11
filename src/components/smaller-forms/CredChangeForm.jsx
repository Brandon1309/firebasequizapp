import React from "react";
import DarkBtn from "../buttons/DarkBtn";
import CustomInput from "../inputs/CustomInput";

const CredChangeForm = ({
  type,
  name,
  value,
  placeholder,
  btnValue,
  onSubmit,
  onChange,
  minLength,
  maxLength,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="cred-change-form">
        <CustomInput
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
        />
        <DarkBtn type="submit">{btnValue}</DarkBtn>
      </form>
    </div>
  );
};

export default CredChangeForm;
