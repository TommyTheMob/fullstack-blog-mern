import React, {useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import btnStyles from '../../shared/Button.module.css'
import classNames from "classnames";
import {Link, Outlet} from "react-router-dom";

import logo from '../../assets/blog-logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/authSlice.js";
import {GiHamburgerMenu} from "react-icons/gi";


const ContentInner = ({ isAuth, userData, windowWidth }) => {
    const dispatch = useDispatch()

    return (
        <>
            {isAuth &&
                <div className={styles.userInfo}>
                    <img
                        className={styles.avatar}
                        src={userData?.avatarUrl ? userData.avatarUrl : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                        alt="user avatar"
                    />
                    <span className={styles.name}>{userData?.fullName}</span>
                </div>
            }
            <div className={styles.btns}>
                {isAuth
                    ?
                    <>
                        <Link to='/add-post' style={windowWidth < 960 ? {display: 'none'} :{}}>
                            <button
                                className={classNames(btnStyles.btn, btnStyles.primary, styles.loginBtn)}
                            >
                                Написать статью
                            </button>
                        </Link>
                        <button
                            className={classNames(btnStyles.btn, btnStyles.danger, styles.createAccBtn)}

                            onClick={() => dispatch(logout())}
                        >
                            Выйти
                        </button>

                    </>
                    :
                    <>
                        <Link to='/login'>
                            <button
                                className={classNames(btnStyles.btn, btnStyles.primary, styles.loginBtn)}
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
        </>

    )
}

const Navbar = () => {
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector(state => state.auth.data)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [burgerActive, setBurgerActive] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

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
                    {windowWidth > 960
                        ? <ContentInner isAuth={isAuth} userData={userData} windowWidth={windowWidth} />
                        :
                        <>
                            {isAuth &&
                                <Link to='/add-post'>
                                    <button
                                        className={classNames(btnStyles.btn, btnStyles.primary, styles.loginBtn)}
                                    >
                                        Написать статью
                                    </button>
                                </Link>
                            }
                            <GiHamburgerMenu
                                className={styles.burgerButton}
                                onClick={() => setBurgerActive(prev => !prev)}
                            />
                            <div
                                className={burgerActive ? classNames(styles.burgerMenu, styles.active) : styles.burgerMenu}
                                onClick={() => setBurgerActive(false)}
                            >
                                <div className={burgerActive ? classNames(styles.burgerContent, styles.active) : styles.burgerContent}>
                                    <ContentInner isAuth={isAuth} userData={userData} windowWidth={windowWidth} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </header>
            <Outlet />
        </>

    );
};

export default Navbar;
