import "./style.css";

import React, { ButtonHTMLAttributes } from "react";

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<GenericButtonProps> = ({ label, ...rest }) => {
  return (
    <button className="text-3xl font-bold underline" {...rest}>
      {label}
    </button>
  );
};
