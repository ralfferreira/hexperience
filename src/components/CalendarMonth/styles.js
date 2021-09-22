import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex-direction: column;
`;

export const Month = styled.Text`
    padding-bottom: 10px;
    padding-top: 5px;
    font-size: 22px;
    font-weight: bold;
`;

export const Day = styled.Text`
    padding-bottom: 10px;
    padding-top: 5px;
    font-size: 22px;
    font-weight: normal;
    border-bottom-width: 1px;
    border-color: #ececec;
`;
