import React, {useEffect} from 'react';
import styles from './Login.module.css'
import {Link, useNavigate} from "react-router-dom";
import LoginRegForm from "../../shared/LoginRegForm/LoginRegForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/authSlice.js";

const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const onLogin = async (email, password) => {
        const data = await dispatch(fetchAuth({
            email: email.replace(/(&nbsp;|\s)+/g, ' ').trim(),
            password: password.replace(/(&nbsp;|\s)+/g, ' ').trim()
        }))

        if (!data.payload) {
            return alert('Не удалось авторизоваться')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    return (
        <div className={styles.login}>
            <LoginRegForm title='Войти' handleClick={onLogin}/>
            <span className={styles.tip}>Еще нет аккаунта? <Link className={styles.link}
                                                                 to='/register'>Зарегистрируйтесь</Link> прямо сейчас!</span>
        </div>
    );
};

export default Login;
