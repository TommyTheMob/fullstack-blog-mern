import React from 'react';
import styles from './Navbar.module.css'
import btnStyles from '../../shared/Button.module.css'
import classNames from "classnames";
import {Link, Outlet} from "react-router-dom";

import logo from '../../assets/blog-logo.svg'

const Navbar = () => {

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
                    <div className={styles.btns}>
                        <Link to='/login'>
                            <button className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.loginBtn)}>Войти</button>
                        </Link>
                        <Link to='/register'>
                            <button className={classNames(btnStyles.btn, btnStyles.primary, styles.createAccBtn)}>Создать аккаунт</button>
                        </Link>
                    </div>
                </div>
            </header>
            <Outlet />
        </>

    );
};

export default Navbar;
