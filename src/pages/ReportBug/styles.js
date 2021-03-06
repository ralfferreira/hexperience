import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
`;
export const Title = styled.Text`
    font-size: 20px;
    padding: 20px;
`
export const InputTitle = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin: 12px 0 12px;
`
export const AlignForm = styled.View`
    padding: 20px;
`
export const SaveBtn = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 50px;
`
export const SaveBtnText = styled.Text`
    color: #312e38;
    font-size: 16px;
    font-weight: bold;
`
export const SaveBtnView = styled.TouchableOpacity`
    display: flex;
    width: 120px;
    height: 50px;
    background: #00FF01;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    elevation: 10;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`