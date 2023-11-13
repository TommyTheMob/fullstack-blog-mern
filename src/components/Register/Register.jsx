import React, {useEffect} from 'react';
import LoginRegForm from "../../shared/LoginRegForm/LoginRegForm.jsx";
import {Link, useNavigate} from "react-router-dom";
import styles from "../Register/Register.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/authSlice.js";

const Register = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const onRegister = async (email, password, fullName, avatarUrl) => {
        const data = await dispatch(fetchRegister({
            email: email.replace(/(&nbsp;|\s)+/g, ' ').trim(),
            password: password.replace(/(&nbsp;|\s)+/g, ' ').trim(),
            fullName: fullName.replace(/(&nbsp;|\s)+/g, ' ').trim(),
            avatarUrl
        }))

        if (!data.payload) {
            return alert('Не удалось зарегистрироваться')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    return (
        <div className={styles.register}>
            <LoginRegForm title='Зарегистрироваться' handleClick={onRegister}/>
            <span className={styles.tip}>Уже есть аккаунт? <Link className={styles.link} to='/login'>Войдите</Link> прямо сейчас!</span>
        </div>
    );
};

export default Register;
