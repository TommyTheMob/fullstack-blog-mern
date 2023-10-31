import React from 'react';
import styles from './RegisterPage.module.css'
import Register from "../../components/Register/Register.jsx";

const RegisterPage = () => {
    return (
        <div className={styles.pageContent}>
            <Register />
        </div>
    );
};

export default RegisterPage;
