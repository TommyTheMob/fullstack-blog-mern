import React from 'react';
import styles from './Navbar.module.css'
import btnStyles from '../../shared/Button.module.css'
import classNames from "classnames";
import {Link, Outlet} from "react-router-dom";

import logo from '../../assets/blog-logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/authSlice.js";

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector(state => state.auth.data)

    return (
        <>
            <header className={styles.navbar}>
                <div className={styles.content}>
                    <Link to='/'>
                        <img
                            className={styles.logo}
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                    {isAuth &&
                        <div className={styles.userInfo}>
                            <img
                                className={styles.avatar}
                                src={userData?.avatarUrl ? `${import.meta.env.VITE_API_URL}${userData.avatarUrl}` : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                                alt="user avatar"
                            />
                            <span className={styles.name}>{userData?.fullName}</span>
                        </div>
                    }
                    <div className={styles.btns}>
                        {isAuth
                            ?
                            <>
                                <Link to='/add-post'>
                                    <button
                                        className={classNames(btnStyles.btn, btnStyles.primary, styles.loginBtn)}
                                    >
                                        Написать статью
                                    </button>
                                </Link>
                                <button
                                    className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.createAccBtn)}
                                    onClick={() => dispatch(logout())}
                                >
                                    Выйти
                                </button>

                            </>
                            :
                            <>
                                <Link to='/login'>
                                    <button
                                        className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.loginBtn)}
                                    >
                                        Войти
                                    </button>
                                </Link>
                                <Link to='/register'>
                                    <button
                                        className={classNames(btnStyles.btn, btnStyles.primary, styles.createAccBtn)}
                                    >
                                        Создать аккаунт
                                    </button>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </header>
            <Outlet/>
        </>

    );
};

export default Navbar;
