import React, { useEffect } from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComments } from '../redux/slices/post';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import Comments from './comments/Comments';

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchGetComments());
  }, []);

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : comments.text).map((obj, index) => (
          <Comments
            key={index}
            isLoading={isLoading}
            obj={obj}
            isEditable={userData?._id === obj.user._id}
          />
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
