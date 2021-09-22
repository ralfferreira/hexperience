import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 150 : 30}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  font-weight: bold;
  margin: 0 0 32px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`;

export const Underline = styled.Text`
  margin-top: 24px;
  color: #303030;
  text-decoration: underline;
`;

export const ForgotPasswordText = styled.Text`
  color: #393939;
  font-size: 16px;
`;

export const CreateAccount = styled.TouchableOpacity`
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 15px;
`;

export const CreateAccountText = styled.Text`
  color: #393939;
  font-size: 16px;
`;

export const Image = styled.Image`
  width: 175px;
  height: 175px;
  margin-top: 130px;
`

export const InputTitle = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 12px 0 12px;
  right: 42%;
`