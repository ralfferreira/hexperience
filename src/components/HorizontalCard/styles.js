import styled from 'styled-components/native';

export const Experiences = styled.ScrollView`
    display: flex;
    padding: 10px;
`
export const Experience = styled.View`
    width: 99%;
    height: 100px;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    elevation: 5;
    margin-bottom: 10px;
    background-color: #fff;
`
export const ExperienceImage = styled.Image`
    height: 100px;
    width: 105px;
`
export const ExperienceName = styled.Text`
    font-weight: 700;
`
export const ExperienceDescription = styled.View`
    display: flex;
    flex-direction: column;
    padding: 7px;
    justify-content: space-around;
`
export const ExperienceDetails = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ExperienceLocalizationText = styled.Text`
    font-weight: 400;
    font-size: 14px;
    padding-right: 10px;
`
export const LocalizationIcon = styled.Image`
    margin-right: 5px;
`
export const ExperiencePrice = styled.Text`
    margin-left: 20px;
    padding-right: 10px;
    font-size: 14px;
    color: #2e2e2e;
`
export const ExperienceFavorite = styled.Image`
    width: 21px;
    height: 20px;
`
export const Touchable = styled.TouchableOpacity``
export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 68%;
    margin-top: 5px;
`