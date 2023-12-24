import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';

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
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
