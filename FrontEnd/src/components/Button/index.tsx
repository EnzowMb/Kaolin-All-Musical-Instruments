import styled from "styled-components";

import React, { ButtonHTMLAttributes } from "react";

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Style = styled.button`
  background-color: var(--PaleGoldenrod);
  border-radius: 8px;
  padding: 12px 16px;
  color: black;
  border: none;
  font-weight: 700;
  line-height: 19px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--MistyRose);
  }
`;

export const Button: React.FC<GenericButtonProps> = ({ label, ...rest }) => {
  return <Style {...rest}>{label}</Style>;
};
