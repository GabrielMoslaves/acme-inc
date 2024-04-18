import React from "react";
import stlyes from "./styles.module.scss";

const Input = ({ type, id, label, onChange, onSubmit, ...rest }) => {
  return (
    <div className={stlyes.inputWrapper}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChange} {...rest} />
    </div>
  );
};

export default Input;
