import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const DinoImage = styled.Image`
    width: 100%;
    height: 400px;
    margin-left: 10px;
`
export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
`
export const Subtitle = styled.Text`
    font-size: 18px;
    text-align: center;
    padding: 20px;
`
export const LandingNavigation = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 30px;
`
export const Select = styled.Image`
    width: 12px;
    height: 12px;
    margin-right: 5px;
`
export const Start = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`
export const StartText = styled.Text`
    color: #312e38;
    font-size: 16px;
    font-weight: bold;
`
export const StartView = styled.TouchableOpacity`
    display: flex;
    width: 160px;
    height: 50px;
    background: #00FF01;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    elevation: 10;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`
export const Sign = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 50px;
`
export const SignText = styled.Text`
    color: #312e38;
    font-size: 16px;
    font-weight: bold;
`
export const SignView = styled.TouchableOpacity`
    display: flex;
    width: 160px;
    height: 40px;
    border-color: #00FF01;
    border-width: 2px;
    background: #fff;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`