import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedAuth, logout } from '../../redux/slices/auth';
import Avatar from '@mui/material/Avatar';


export const Header = () => {
  const isAuth = useSelector(selectedAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти с аккаунта?')) {
      dispatch(logout());
      localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>НАЗАД BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
                <Avatar sx={{right: '-20px', cursor: 'pointer'}} alt={userData.name} src={userData.avatarUrl} />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
