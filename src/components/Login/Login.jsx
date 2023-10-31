import React from 'react';
import LoginRegForm from "../../shared/LoginRegForm/LoginRegForm.jsx";
import styles from './Login.module.css'
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className={styles.login}>
            <LoginRegForm title='Войти' />
            <span className={styles.tip}>Еще нет аккаунта? <Link className={styles.link} to='/register'>Зарегистрируйтесь</Link> прямо сейчас!</span>
        </div>
    );
};

export default Login;
