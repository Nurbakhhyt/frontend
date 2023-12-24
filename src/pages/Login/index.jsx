import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';

import styles from "./Login.module.scss";
import { fetchLogin, selectISAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectISAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
    
      email: 'test_second@mail.ru',
      password: '12345000',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload){
      return alert('Не удалось sign up!');
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
        Аккаунтқа кіру
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {... register('email', {required: 'Почтаңызды еңгізіңіз'})}
          fullWidth
        />
        <TextField className={styles.field}
          type="password"
          label="Пароль" 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {... register('password', {required: 'Пароль еңгізіңіз'})}fullWidth />
        <Button disabled={ !isValid}  type="submit" size="large" variant="contained" fullWidth>
          Кіру
        </Button>
      </form>
    </Paper>
  );
};
