import React from 'react';
import styles from './Tags.module.css'
import {PiHashBold} from "react-icons/pi";

const Tags = () => {
    return (
        <div className={styles.tags}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Тэги</h3>
            </div>
            <div className={styles.tagRows}>
                <div className={styles.tagRow}>
                    <PiHashBold className={styles.hash} />
                    <span>tag 1</span>
                </div>
                <div className={styles.tagRow}>
                    <PiHashBold className={styles.hash} />
                    <span>tag 2</span>
                </div>
                <div className={styles.tagRow}>
                    <PiHashBold className={styles.hash} />
                    <span>tag 3</span>
                </div>
            </div>
        </div>
    );
};

export default Tags;
