import React from 'react';
import styles from './CommentSkeleton.module.css'

const CommentSkeleton = () => {
    return (
        <div className={styles.commentRow}>
            <div className={styles.avatar}/>
            <div className={styles.content}>
                <div className={styles.info}>
                    <span className={styles.name} />
                    <span className={styles.date} />
                </div>
                <span className={styles.text} />
            </div>
        </div>
    );
};

export default CommentSkeleton;
