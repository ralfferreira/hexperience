import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
`;
export const Title = styled.Text`
    font-size: 18px;
    padding: 20px;
    text-align: left;
`
export const AlignForm = styled.View`
    padding: 20px;
`
export const InputRow = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
export const InputTitle = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin: 12px 0 12px;
`
export const DateInput = styled.TouchableOpacity`
    width: 150px;
    height: 40px;
    padding: 0 16px;
    background: #fff;
    color: #000;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #B8B8B8;
    flex-direction: row;
    align-items: center;
`
export const DetailsInput = styled.TextInput`
    width: 100%;
    height: 140px;
    padding: 0 16px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #B8B8B8;
    flex-direction: row;
    align-items: center;
`
export const HeaderContent = styled.View`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    padding-bottom: 20px;
    border: 1px #ddd solid;
`
export const Back = styled.TouchableOpacity`
    width: 48px;
    height: 48px;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: -30px;
`
export const BackIcon = styled.Image`
    width: 32px;
    height: 32px;
    margin-top: 3px;
`
export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000;
    text-align: center;
`
export const Logo = styled.Image`
    width: 50px;
    height: 50px;
    margin-top: 5px;
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