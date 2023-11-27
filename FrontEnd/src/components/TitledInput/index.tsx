import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Container = styled.div`
  width: 100%;
`;

const Field = styled.input`
  background: var(--gray);
  margin: 1em 0;s
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: black;
`;

export const TitledInput: React.FC<GenericInputProps> = ({
  label,
  ...rest
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Field {...rest} />
    </Container>
  );
};
