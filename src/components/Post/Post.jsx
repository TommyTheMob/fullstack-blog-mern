import React, {useState} from 'react';
import styles from './Post.module.css'
import {AiFillEdit, AiOutlineClose, AiOutlineEye} from "react-icons/ai";
import {PiChatTextLight} from "react-icons/pi";
import {Link} from "react-router-dom";

const Post = ({ single }) => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <div
            className={single ? styles.postSingle : styles.postMulti}
            onMouseEnter={() => {
                setMenuVisible(prevState => !prevState)
            }}
            onMouseLeave={() => {
                setMenuVisible(prevState => !prevState)
            }}
        >
            {menuVisible &&
                <div className={styles.actionMenu}>
                    <AiFillEdit className={styles.edit} />
                    <AiOutlineClose className={styles.delete} />
                </div>}
            <div className={styles.imgContainer}>
                <img
                    className={styles.img}
                    src="https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms"
                    alt="post img"
                />
            </div>
            <div className={single ? `${styles.content}  ${styles.contentSingle}` : styles.content}>
                <div className={styles.author}>
                    <img
                        className={styles.avatar}
                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        alt="avatar"
                    />
                    <div className={styles.info}>
                        <span className={styles.name}>Name</span>
                        <span className={styles.date}>12 июня 2022 г.</span>
                    </div>
                </div>
                <div className={styles.headerContainer}>
                    <Link to='/posts/1'>
                        <h1 className={styles.header}>Post #1 | Tupa title of this shit</h1>
                    </Link>
                </div>
                {single &&
                    <div className={styles.textContainer}>
                        <span className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores consequatur cumque dignissimos, doloremque dolores esse expedita illo iste iure laborum necessitatibus odit sit. A ab ad adipisci asperiores autem consequatur, deleniti dicta, eos expedita illo ipsum laboriosam libero optio perspiciatis placeat sed sequi sint tenetur ut velit voluptatibus voluptatum?</span>
                    </div>
                }
                <div className={styles.tagsContainer}>
                    <span>#tag1</span>
                    <span>#tag2</span>
                    <span>#tag3</span>
                </div>
                <div className={styles.reactions}>
                    <div className={styles.views}>
                        <AiOutlineEye/>
                        <span>123</span>
                    </div>
                    <div className={styles.comments}>
                        <PiChatTextLight/>
                        <span>11</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
