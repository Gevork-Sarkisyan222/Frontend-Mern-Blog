import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectedAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/slices/auth';

import styles from './Login.module.scss';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectedAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    console.log(data);

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token);
    }
  };

  const avatarUrl = watch('avatarUrl');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fileInput" className={styles.avatar}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            alt="Avatar"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : errors.avatarUrl
                ? '/broken-image.jpg'
                : avatarUrl
            }
          />
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <TextField
          className={styles.field}
          label="Имя"
          fullWidth
          type="text"
          {...register('name', { required: 'Укажите имя' })}
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
        />
        <TextField
          className={styles.field}
          label="Фамилия"
          fullWidth
          type="text"
          {...register('surname', { required: 'Укажите фамилию' })}
          error={Boolean(errors.surname?.message)}
          helperText={errors.surname?.message}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        />
        {/* Добавляем поле для URL аватара */}
        <TextField
          className={styles.field}
          label="URL аватара"
          fullWidth
          type="text"
          {...register('avatarUrl')}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
