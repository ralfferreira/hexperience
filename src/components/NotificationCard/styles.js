import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 15px;
`;
export const Notification = styled.View`
    elevation: 6;
    border-radius: 10px;
    width: 100%;
    display: flex;
    background-color: #fff;
`
export const NotificationHeader = styled.View`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const NotificationTitle = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #000;
`
export const NotificationBody = styled.View`
    padding: 10px;
`
export const NotificationText = styled.Text`
    font-size: 15px;
    margin-bottom: 5px;
    color: #000;
`
export const NotificationIcon = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 10px;
`