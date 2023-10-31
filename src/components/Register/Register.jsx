import React from 'react';
import LoginRegForm from "../../shared/LoginRegForm/LoginRegForm.jsx";
import {Link} from "react-router-dom";
import styles from "../Register/Register.module.css";

const Register = () => {
    return (
        <div className={styles.register}>
            <LoginRegForm title='Зарегистрироваться' />
            <span className={styles.tip}>Уже есть аккаунт? <Link className={styles.link} to='/login'>Войдите</Link> прямо сейчас!</span>
        </div>
    );
};

export default Register;
