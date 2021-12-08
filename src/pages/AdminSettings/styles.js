import styled from 'styled-components/native';

export const Container = styled.View`
    height: 100%;
    background: #fff;
`;
export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    text-align: left;
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
export const DetailsInput = styled.TextInput`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #B8B8B8;
    flex-direction: row;
    align-items: center;
`
export const SaveBtn = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 100px;
`
export const SaveBtnText = styled.Text`
    color: #312e38;
    font-size: 16px;
    font-weight: bold;
`
export const SaveBtnView = styled.TouchableOpacity`
    display: flex;
    width: 185px;
    height: 50px;
    background: #00FF01;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    elevation: 10;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`
export const OptionTitle = styled.Text`
    font-size: 22px;
    font-weight: 400;
    height: 50px;
    padding: 5px;
    margin-top: 5px;
`
export const Touchable = styled.TouchableOpacity``