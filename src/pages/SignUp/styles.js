import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  display: flex;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 150 : 30}px;
  margin-bottom: 300px;
`;

export const Center = styled.View`
  align-items: center;
  display: flex;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  font-weight: bold;
  margin: 0 0 16px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;

export const Underline = styled.Text`
  color: #303030;
  text-decoration: underline;
`;

export const BackToSignInText = styled.Text`
  color: #393939;
  font-size: 16px;
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 140px;
`

export const InputTitle = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 12px 0 12px;
`