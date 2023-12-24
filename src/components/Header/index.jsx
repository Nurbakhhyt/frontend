import React from 'react';

import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { logout, selectISAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectISAuth);


  const onClickLogout = () => {
    if (window.confirm('Сіз аккаунттан шыққыңыз келіп тұр ма?')){
      dispatch(logout());
      window.localStorage.removeItem('token');
    };
    
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>NURBLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Пост құру</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Шығу
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Кіру</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Аккаунт құру</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
