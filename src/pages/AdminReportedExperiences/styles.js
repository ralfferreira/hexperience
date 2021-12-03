import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
`;
export const Content = styled.ScrollView`
    height: 100%;
`
export const ReportedExperiencesList = styled.View`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 15px;
    margin-bottom: 100px;
`
export const ReportedExperiencesItem = styled.View`
    width: 180px;
    height: 275px;
    background: #FCFCFC;
    box-shadow: 0px 1px 20px #B5B5B5;
    elevation: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
`
export const ReportedExperiencesRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const ReportedExperiencesHeader = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ReportedExperiencesImage = styled.Image`
    width: 100%;
    height: 120px;
`
export const ReportedExperiencesName = styled.Text`
    font-size: 16px;
    padding: 5px;
`
export const ReportedExperiencesAlert = styled.Text`
    font-size: 13px;
    padding: 5px;
`
export const ReportedExperiencesDate = styled.Text`
    font-size: 10px;
    padding: 5px;
    text-align: right;
    color: #161616;
`
export const Touchable = styled.TouchableOpacity``