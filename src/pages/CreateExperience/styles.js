import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
`
export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`
export const ExperienceImage = styled.Image`
    width: 250px;
    height: 200px;
    margin-right: 30px;
`
export const AddExperienceImage = styled.TouchableOpacity`
    border-width: 2px;
    border-color: #7C7C7C;
    border-radius: 11px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
`
export const ExperienceImageView = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding: 15px;
    align-items: center;
`
export const ExperienceImageCarrousel = styled.ScrollView`
`
export const ExperienceDetails = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`
export const ExperienceDetailsRow = styled.View`
    display: flex;
    flex-direction: row;
    padding: 10px;
`
export const ParentalRating = styled.View`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    padding: 5px;
`
export const ParentalRatingOption = styled.TouchableOpacity`
    border-color: #818f81;
    border-width: 3px;
`

export const ImageDetails = styled.Image`
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-right: 7px;
`
export const PlusImg = styled.Image`
    width: 16px;
    height: 16px;
`
export const ParentalRatingImg = styled.Image`
    width: 32px;
    height: 32px;
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
    width: 185px;
    height: 50px;
    background: #00FF01;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    elevation: 10;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`