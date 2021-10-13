import React from 'react'
import { CommentView, CommentRow, CommentName, CommentProfile, CommentContent, CommentContentText, CommentDate } from './styles';
import Rating from '../Rating';
import UserProfileImg from '../../assets/img/luffy.jpg'
const Comment = ({name, content, date}) => {
  return (
    <CommentView>
      <CommentRow>
        <CommentProfile source={UserProfileImg} />
        <CommentName>{name}</CommentName>
        <Rating />
      </CommentRow>
        <CommentContent>
          <CommentContentText>
            {content}
          </CommentContentText>
          <CommentDate>{date}</CommentDate>
        </CommentContent>
    </CommentView>
  );
};

export default Comment;
