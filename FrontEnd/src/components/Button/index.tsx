import styled from "styled-components";
import "./style.css";

import React, { ButtonHTMLAttributes } from "react";

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Style = styled.button`
  background-color: var(--thistle);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--lavenderblush);
  border: none;
  margin-top: 1em;
  font-weight: 700;
  line-height: 19px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Button: React.FC<GenericButtonProps> = ({ label, ...rest }) => {
  return <Style {...rest}>{label}</Style>;
};
