import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    height: 100%;
    background: #fff;
`;
export const Touchable = styled.TouchableOpacity``
export const BugsList = styled.View`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    align-items: center;
`
export const Bug = styled.View`
    margin-bottom: 20px;
    margin-top: 20px;
    width: 375px;
    height: 280px;
    padding: 10px;
    background: #FCFCFC;
    box-shadow: 0px 1px 20px #B5B5B5;
    elevation: 5;
    display: flex;
    flex-direction: column;
`
export const BugHeader = styled.View`
    display: flex;
    flex-direction: column;
    padding: 5px;
    text-align: left;
`
export const BugTitle = styled.Text`
    color: #162D42;
    font-weight: bold;
    font-size: 20px;
`
export const BugId = styled.Text`
    color: #A4AAB1;
    font-size: 15px;
`
export const BugDescription = styled.Text`
    padding: 5px;
    color: #60656b;
    font-size: 14px;
`
export const BugFooter = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`
export const BugProfileView = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 190px;
`
export const BugProfile = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
`
export const BugName = styled.Text`
    font-size: 16px;
    margin-left: 10px;
`
export const BugDate = styled.Text`
    color: #60656b;
    font-size: 14px;
`