import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {  fetchRegister, selectISAuth } from "../../redux/slices/auth";
import { useForm } from 'react-hook-form'

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectISAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit,  formState: { errors, isValid } } = useForm({
    defaultValues: {
      name: 'Nubra',
      surname: 'Bolatov',
      date:'22-12-2003',
      email: 'test_second@mail.ru',
      password: '12345000',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload){
      return alert('Не удалось авторизоваться!');
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if(isAuth){
    return <Navigate to='/' />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Аккаунт құру
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {... register('name', {required: 'Есіміңізді еңгізіңіз'})}
            fullWidthclassName={styles.field} label="Есім" fullWidth />
        <TextField 
            error={Boolean(errors.surname?.message)}
            helperText={errors.surname?.message}
            {... register('surname', {required: 'Тегінізді еңгізіңіз'})}
            fullWidthclassName={styles.field} label="Тегі" fullWidth />
        <TextField type='date'
            error={Boolean(errors.date?.message)}
            helperText={errors.date?.message}
            {... register('date', {required: 'Туған күніңізді еңгізіңіз'})}
            fullWidthclassName={styles.field} label="" fullWidth />
        <TextField type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {... register('email', {required: 'Почтаңызды еңгізіңіз'})}
            fullWidthclassName={styles.field} label="E-Mail" fullWidth />
        <TextField type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {... register('password', {required: 'Парольді еңгізіңіз'})}
            fullWidthclassName={styles.field} label="Пароль" fullWidth />
        <Button disabled={ !isValid} size="large" variant="contained" fullWidth type='submit'>
          Тіркелу
        </Button>
      </form>
    </Paper>
  );
};
