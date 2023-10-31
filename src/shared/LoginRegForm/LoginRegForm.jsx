import React from 'react';
import styles from './LoginRegForm.module.css'
import btnStyles from '../Button.module.css'
import classNames from "classnames";

const LoginRegForm = ({ title }) => {
    let classes = title === 'Войти' ? classNames(btnStyles.btn, btnStyles.primaryOutlined) : classNames(btnStyles.btn, btnStyles.primary)

    return (
        <div className={styles.form}>
            <div className={styles.email}>
                <label htmlFor="email">Почта</label>
                <input type="text" id='email'/>
            </div>
            <div className={styles.password}>
                <label htmlFor="password">Пароль</label>
                <input type="password" id='password'/>
            </div>
            <button className={classes}>{ title }</button>
        </div>
    );
};

export default LoginRegForm;
