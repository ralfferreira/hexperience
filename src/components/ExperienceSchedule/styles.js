import styled from 'styled-components/native';

export const Experience = styled.View`
    border: 1px;
    border-color: #00ff01;
    width: 150px;
    height: 170px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 15px;
`;
export const ExperienceDate = styled.Text`
    font-size: 15px;
    text-align: center;
`
export const ExperienceTime = styled.Text`
    font-size: 15px;
`
export const ExperienceButton = styled.TouchableOpacity`
    background: #00FF01;
    border-radius: 10px;
    width: 110px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ExperienceButtonText = styled.Text`
    padding: 10px;
    font-weight: bold;
    font-size: 15px;
`