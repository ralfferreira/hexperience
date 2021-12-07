import styled from 'styled-components/native';

export const Container = styled.View`
    height: 100%;
    background: #fff;
`
export const Leafs = styled.View `
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
export const Leaf = styled.Image `
    width: 65px;
    height: 65px;
`
export const EditProfileContent = styled.View`
    display: flex;
    justify-content: center;
    flex-direction: column;
`
export const EditProfilePhoto = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    margin-top: -40px;
`
export const EditProfilePhotoImage = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 540px;
`
export const EditProfileChangePhoto = styled.Image`
    position: absolute;
    top: 75%;
    right: 25%;
    width: 40px;
    height: 40px; 
`
export const EditProfileForm = styled.View`
    display: flex;
    justify-content: center;
    padding: 20px;
`
export const InputTitle = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin: 12px 0 12px;
`
export const EditProfileInputName = styled.TextInput`
    width: 100%;
    height: 50px;
    padding: 0 16px;
    background: #F0F0F0;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #C4C4C4;
    flex-direction: row;
    align-items: center;
`
export const EditProfileInputBio = styled.TextInput`
    width: 100%;
    height: 100px;
    padding: 0 16px;
    background: #F0F0F0;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #C4C4C4;
    flex-direction: row;
    align-items: center;
`
export const ChangePassword = styled.View`
    display: flex;
    justify-content: center;
    padding: 20px;
`
export const ChangePasswordText = styled.Text`
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin: 12px 0 12px;
    padding: 3px;
`
export const ChangePasswordInput = styled.TextInput`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #B8B8B8;
    flex-direction: row;
    align-items: center;
`
export const SaveBtn = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 100px;
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