import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { fetchCreateComments, fetchGetComments } from '../../redux/slices/post';
import { setTextToChange } from '../../redux/slices/getCommentChangeSlice';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import styles from './AddComment.module.scss';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

export const Index = () => {
  const isAuth = useSelector(selectedAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: '',
    },
  });
  const userData = useSelector((state) => state.auth.data);

  const textToChangeState = useSelector((state) => state.changeCommentState.textToChange);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText(textToChangeState);
  }, [textToChangeState]);

  const onSubmit = (values) => {
    dispatch(fetchCreateComments(values))
      .then(() => {
        dispatch(fetchGetComments());
        reset();
        dispatch(setTextToChange(''));
        setInputText('');
      })
      .catch((error) => {
        console.error('Ошибка при создании комментария:', error);
      });
  };

  return (
    <>
      {isAuth && (
        <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            sx={{ bgcolor: 'grey' }}
            alt={userData.name}
            src={userData.avatarUrl === '' ? '/broken-image.jpg' : userData.avatarUrl}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form}>
              <TextField
                label="Написать комментарий"
                {...register('text', { required: 'Не удалось создать комментарий' })}
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button type="submit" variant="contained">
                Отправить
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
