import styled from 'styled-components/native';

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
export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-left: 10px;
`
export const Logo = styled.Image`
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-right: -20px;
`