import React, { InputHTMLAttributes } from "react";
import "./styles.css";

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TitledInput: React.FC<GenericInputProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className="inputWrapper">
      <label className="Label">{label}</label>
      <input className="Input" {...rest} />
    </div>
  );
};
