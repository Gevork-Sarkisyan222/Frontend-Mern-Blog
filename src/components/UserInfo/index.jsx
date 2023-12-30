import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import { format } from 'timeago.js';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        sx={{ bgcolor: 'grey' }}
        alt={fullName}
        src={avatarUrl === '' ? '/broken-image.jpg' : avatarUrl}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{format(additionalText)}</span>
      </div>
    </div>
  );
};
