import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #fff;
    display: flex;
    height: 90%;
    justify-content: center;
`;

export const Header = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
    padding-bottom: 20px;
    border: 1px #ddd solid;
`

export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-left: 10px;
`

export const Logo = styled.Image`
    width: 50px;
    height: 50px;
    margin-top: 5px;
`

export const Search = styled.Image`
    width: 24px;
    height: 24px;
    margin-top: 5px;
    margin-right: 10px;
`

export const Content = styled.View`
    display: flex;
    justify-content: space-between;
`

export const NearToYou = styled.View`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const ContentHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export const ContentBody = styled.ScrollView`
    display: flex;
    height: 310px;
`

export const Recommended = styled.View`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const ContentTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
`

export const ContentHeaderIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
`

export const ChromaLine = styled.Image`
    width: 100%;
    height: 6px;
    margin-bottom: 5px;
    margin-left: 10px;
`