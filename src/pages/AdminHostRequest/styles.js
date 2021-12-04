import styled from 'styled-components/native';

export const Container = styled.View`
    background: #fff;
    height: 100%;
`;
export const Content = styled.ScrollView`
    height: 100%;
`
export const RequestList = styled.View`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 15px;
    margin-bottom: 100px;
`
export const RequestItem = styled.View`
    width: 170px;
    height: 200px;
    background: #FCFCFC;
    box-shadow: 0px 1px 20px #B5B5B5;
    elevation: 5;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`
export const RequestListRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const RequestItemHeader = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`
export const RequestItemProfile = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 100px;
`
export const RequestItemName = styled.Text`
    font-size: 16px;
    padding: 5px;
`
export const RequestItemNickname = styled.Text`
    font-size: 13px;
    padding: 5px;
`
export const RequestItemID = styled.Text`
    font-size: 13px;
    padding: 5px;
`
export const RequestItemDate = styled.Text`
    font-size: 10px;
    padding: 5px;
    text-align: right;
    color: #161616;
`
export const Touchable = styled.TouchableOpacity``
export const Align = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
export const ModalView = styled.View`
    display: flex;
    background-color: #fff;
    justify-content: center;
    height: 100%;
    text-align: left;
`
export const AlignCallback = styled.View`
    align-items: center;
    display: flex;
`
export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    padding: 15px;
`
export const Row = styled.View`
    display: flex;
    flex-direction: row;
`
export const OptionTitle = styled.Text`
    font-size: 22px;
    font-weight: 400;
    text-align: left;
    padding: 20px;
`