import styled from 'styled-components/native';

export const Experience = styled.View`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    elevation: 6;
    border-radius: 10px;
    width: 200px;
    height: 300px;
    margin-left: 10px;
    display: flex;
    background-color: #fff;
`;

export const ExperienceImage = styled.Image `
    width: 200px;
    height: 180px;
`
export const ExperienceDescription = styled.View `
    display: flex;
    padding: 8px 12px;
    flex-direction: column;
    justify-content: space-around;
`
export const ExperienceName = styled.Text `
    font-weight: 700;
`
export const ExperienceDetails = styled.View `
    display: flex;
    flex-direction: row;
    align-self: flex-start;
`
export const LocalizationIcon = styled.Image `
    margin-right: 5px;
    margin-left: -2px;
`
export const ExperienceLocalizationText = styled.Text `
    font-weight: 400;
    font-size: 14px;
`
export const ExperiencePrice = styled.Text `
    font-size: 14px;
`
export const ExperienceRating = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
`
export const ExperienceFavorite = styled.Image `
    width: 21px;
    height: 20px;
`
export const Touchable = styled.TouchableOpacity``