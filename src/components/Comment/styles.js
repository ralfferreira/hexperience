import styled from 'styled-components/native';

export const CommentView = styled.View`
    display: flex;
    flex-direction: column;
    border: 1px;
    border-color: #E7E7E7;
    padding: 15px;
`
export const CommentRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const CommentProfile = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 30px;
`
export const CommentName = styled.Text`
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
`
export const CommentDate = styled.Text`
    color: #555555;
`
export const CommentContent = styled.View``

export const CommentContentText = styled.Text``