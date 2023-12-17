import React from 'react';
import styles from './UserInfo.module.scss';

// src={avatarUrl || '/noavatar.png'} its a avatarUrl

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png'}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
