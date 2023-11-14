import styled from "styled-components";
import "./style.css";

import React, { ButtonHTMLAttributes } from "react";

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Style = styled.button`
  background-color: blue;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  border: none;
  margin-top: 1em;
  font-weight: 700;
  line-height: 19px;
`;

export const Button: React.FC<GenericButtonProps> = ({ label, ...rest }) => {
  return <Style {...rest}>{label}</Style>;
};
