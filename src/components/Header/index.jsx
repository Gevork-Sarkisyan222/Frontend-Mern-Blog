import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedAuth, logout } from '../../redux/slices/auth';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

  // open menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                <Avatar
                  onClick={handleClick}
                  sx={{ right: '-20px', cursor: 'pointer' }}
                  alt={userData.name}
                  src={userData.avatarUrl}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/profile">
                    <MenuItem onClick={handleClose}>Профиль</MenuItem>
                  </Link>
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/general/chat">
                    <MenuItem onClick={handleClose}>Общий чат</MenuItem>
                  </Link>
                </Menu>
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
