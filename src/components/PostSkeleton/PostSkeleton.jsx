import React from 'react';
import styles from './PostSkeleton.module.css'
import {Link} from "react-router-dom";
import {AiFillEdit, AiOutlineClose, AiOutlineEye} from "react-icons/ai";
import {PiChatTextLight} from "react-icons/pi";

const PostSkeleton = () => {
    return (
        <div
            className={styles.post}
        >
            <div className={styles.imgContainer} />
            <div className={styles.content}>
                <div className={styles.author}>
                    <div className={styles.avatar} />
                    <div className={styles.info}>
                        <div className={styles.name} />
                        <div className={styles.date} />
                    </div>
                </div>
                <div className={styles.headerContainer} />
                <div className={styles.tagsContainer}>
                    <div />
                    <div />
                    <div />
                </div>
                <div className={styles.reactions}>
                    <div className={styles.views} />
                    <div className={styles.comments} />
                </div>
            </div>
        </div>
    );
};

export default PostSkeleton;
