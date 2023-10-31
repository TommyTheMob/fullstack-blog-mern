import React from 'react';
import styles from './LoginPage.module.css'
import Login from "../../components/Login/Login.jsx";

const LoginPage = () => {
    return (
        <div className={styles.pageContent}>
            <Login />
        </div>
    );
};

export default LoginPage;
