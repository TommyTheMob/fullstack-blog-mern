import React, {useState} from 'react';
import styles from './LoginRegForm.module.css'
import btnStyles from '../Button.module.css'
import classNames from "classnames";

const LoginRegForm = ({ title, handleClick }) => {
    const [email, setEmail] = useState('test@test.ru')
    const [password, setPassword] = useState('11111')
    const [fullName, setFullName] = useState('Patau');

    let classes = title === 'Войти' ? classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.btn) : classNames(btnStyles.btn, btnStyles.primary, styles.btn)
    let header = title === 'Войти' ? 'Войдите' : 'Зарегистрируйтесь'

    return (
        <div className={styles.form}>
            <h1>{header}</h1>
            {title === 'Зарегистрироваться' &&
                <div className={styles.name}>
                    <label htmlFor="name">Имя</label>
                    <input type="text" id='name' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                </div>
            }
            <div className={styles.email}>
                <label htmlFor="email">Почта</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.password}>
                <label htmlFor="password">Пароль</label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className={classes} onClick={() => handleClick(email, password, fullName)}>{ title }</button>
        </div>
    );
};

export default LoginRegForm;
