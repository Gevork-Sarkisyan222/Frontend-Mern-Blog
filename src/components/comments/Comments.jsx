import React, { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import './styles.scss';
import { fetchRemoveComments } from '../../redux/slices/post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComments } from '../../redux/slices/post';
import { setTextToChange } from '../../redux/slices/getCommentChangeSlice';

function Comments({ obj, isLoading, isEditable }) {
  const dispatch = useDispatch();
  // edit & change comment state
  const textToChangeState = useSelector((state) => state.changeCommentState.textToChange);

  const removeComment = () => {
    const deleteMessage = window.confirm('Вы действительно хотите удалить ваш комментарий?');

    if (deleteMessage) {
      dispatch(fetchRemoveComments(obj._id))
        .then(() => {
          dispatch(fetchGetComments());
        })
        .catch((error) => {
          console.error('Ошибка при удалении комментария:', error);
        });
    } else {
      console.log('Удаление комментария отменено');
    }
  };

  const changeUpdateComment = () => {
    const messageToChange = window.confirm('Вы действительно хотите изменить комментарии');

    if (messageToChange) {
      dispatch(fetchRemoveComments(obj._id));

      dispatch(setTextToChange(obj.text));
      console.log('change comment', textToChangeState);
    } else {
      console.log('Не удалось изменить комментарии !!!');
    }
  };

  return (
    <div className="comments-item">
      <React.Fragment>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt={obj.user.name}
                src={obj.user.avatarUrl === '' ? '/broken-image.jpg' : obj.user.avatarUrl}
                sx={{ bgcolor: 'grey' }}
              />
            )}
          </ListItemAvatar>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Skeleton variant="text" height={25} width={120} />
              <Skeleton variant="text" height={18} width={230} />
            </div>
          ) : (
            <ListItemText primary={obj.user.name + ' ' + obj.user.surname} secondary={obj.text} />
          )}
          {isEditable && (
            <div className="comments-delete-icon">
              <IconButton onClick={changeUpdateComment} color="secondary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={removeComment} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    </div>
  );
}

export default Comments;
