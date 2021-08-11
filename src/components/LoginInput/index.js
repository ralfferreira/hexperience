import React, {
  useEffect,
} from "react";
import { Container, TextInput } from "./styles";

const Input = () => {
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
}

const LoginInput = () => {
  return (
    <Container>
      <TextInput />
    </Container>
  );
};

export default LoginInput;
