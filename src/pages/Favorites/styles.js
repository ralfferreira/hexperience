import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #fff;
    display: flex;
    height: 90%;
    justify-content: center;
`

export const ListAndCreate = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    padding-bottom: 10px;
    padding-top: 15px;
`

export const OrderBy = styled.View`
    display: flex;
    background: #AEAEAE;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 10px;
    width: 140px;
    height: 35px;
`

export const OrderByText = styled.Text`
    color:#313131;
`

export const OrderByArrow = styled.Image`
    width: 12px;
    height: 12px;
    margin-top: 3px;
`
export const Folders = styled.ScrollView`
    display: flex;
    border: 1px #ddd solid;
`
export const FolderButton = styled.TouchableOpacity``
export const Folder = styled.View`
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FolderIcon = styled.Image``

export const FolderName = styled.Text`
    text-align: center;
    font-weight: 600;
    font-style: normal;
    color: #000;
    width: 150px;
    font-size: 15px;
`

export const Experiences = styled.ScrollView`
    padding: 10px;
`