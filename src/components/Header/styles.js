import styled from 'styled-components/native';

export const SearchBar = styled.View`
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