import React, { useMemo } from 'react';
import { format, parseISO, } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';

import Rating from '../Rating';

import UserProfileImg from '../../assets/img/luffy.jpg';

import { 
  CommentView,
  CommentRow,
  CommentName,
  CommentProfile,
  CommentContent,
  CommentContentText,
  CommentDate 
} from './styles';

const Comment = ({ name, content, date, rating, avatar_url }) => {
  const commentDate = useMemo(() => {
    const parsedDate = parseISO(date);

    const formattedDate = format(parsedDate, "EEEE',' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,            
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }, [date]);

  return (
    <CommentView>
      <CommentRow>
        <CommentProfile source={avatar_url ? { uri: avatar_url } : UserProfileImg} />
        <CommentName>{name}</CommentName>
        <Rating
          rating={rating}
          disabled={true}
        />
      </CommentRow>
        <CommentContent>
          <CommentContentText>
            {content}
          </CommentContentText>
          <CommentDate>{commentDate}</CommentDate>
        </CommentContent>
    </CommentView>
  );
};

export default Comment;
