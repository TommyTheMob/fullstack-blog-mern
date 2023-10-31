import React from 'react';
import styles from './Comments.module.css'
import {PiHashBold} from "react-icons/pi";
import classNames from "classnames";

const Comments = ({ single }) => {
    return (
        <div className={styles.comments}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Комментарии</h3>
            </div>
            <div className={styles.commentRows}>
                <div className={styles.commentRow}>
                    <img
                        className={styles.avatar}
                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        alt="avatar"
                    />
                    <div className={styles.content}>
                        <span className={styles.name}>Name</span>
                        <span className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quo.</span>
                    </div>
                </div>
                <div className={styles.commentRow}>
                    <img
                        className={styles.avatar}
                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        alt="avatar"
                    />
                    <div className={styles.content}>
                        <span className={styles.name}>Name</span>
                        <span className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quo.</span>
                    </div>
                </div>
                <div className={styles.commentRow}>
                    <img
                        className={styles.avatar}
                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        alt="avatar"
                    />
                    <div className={styles.content}>
                        <span className={styles.name}>Name</span>
                        <span className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quo.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
