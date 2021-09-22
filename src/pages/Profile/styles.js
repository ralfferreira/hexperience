import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #fff;
    display: flex;
    height: 90%;
    /* justify-content: center; */
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
export const ProfileContent = styled.View `
    display: flex;
`
export const ProfileHeader = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: -40px;
`
export const EditProfile = styled.Image `
    width: 50px;
    height: 50px;
`
export const ProfileImage = styled.Image `
    width: 160px;
    height: 160px;
    border-radius: 80px;
`
export const Settings = styled.Image `
    width: 50px;
    height: 50px;
`
export const ProfileBody = styled.View `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`
export const ProfileInfo = styled.View `
    display: flex;
    justify-content: space-between;
`
export const ProfileName = styled.Text `
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    font-style: normal;
    margin-bottom: 10px;
`
export const ProfileDescription = styled.Text `
    font-size: 16px;
    font-weight: 200;
    text-align: center;
`
export const Experiences = styled.ScrollView `
    height: 320px;
    padding: 7px;
`
export const Title = styled.Text `
    font-size: 22px;
    font-weight: bold;
    padding: 16px;
`