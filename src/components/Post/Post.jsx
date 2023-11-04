import React, {useState} from 'react';
import styles from './Post.module.css'
import {AiFillEdit, AiOutlineClose, AiOutlineEye} from "react-icons/ai";
import {PiChatTextLight} from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom";
import {parseISO, formatDistanceToNow} from 'date-fns';
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {fetchDeletePost, fetchTags, setSort} from "../../redux/slices/postsSlice.js";
import {fetchLastComments} from "../../redux/slices/commentsSlice.js";

const Post = ({single, post, isOwner, commentsAmount}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuVisible, setMenuVisible] = useState(false)

    let timeAgo = ``
    if (post) {
        const date = parseISO(post.createdAt)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    const onDeletePostClick = () => {
        if (window.confirm('Удалить статью?')) {
            dispatch(fetchDeletePost(post._id)).then(() => {
                dispatch(fetchLastComments())
                dispatch(fetchTags())
            })
            navigate('/')
        }
    }

    const onTagInPostClick = (tag) => {
        dispatch(setSort(tag))
        navigate(`/tags/${tag}`)
    }


    return (
        <>
            <div
                className={single ? styles.postSingle : styles.postMulti}
                style={!post.imageUrl ? {height: 'auto'} : {}}
                onMouseEnter={() => setMenuVisible(true)}
                onMouseLeave={() => setMenuVisible(false)}
            >
                <div
                    className={menuVisible && isOwner ? styles.actionMenu : classNames(styles.actionMenu, styles.hidden)}>
                    <Link to={`/posts/${post._id}/edit`}>
                        <AiFillEdit className={styles.edit}/>
                    </Link>
                    <AiOutlineClose onClick={onDeletePostClick} className={styles.delete}/>
                </div>
                {post.imageUrl &&
                    <div
                        className={single ? styles.imgContainer : classNames(styles.imgContainer, styles.imgContainerMulti)}>
                        <img
                            className={single ? styles.img : classNames(styles.img, styles.imgMulti)}
                            src={`http://localhost:4444${post.imageUrl}`}
                            alt="post img"
                        />
                    </div>
                }
                <div
                    className={single ? `${styles.content}  ${styles.contentSingle}` : styles.content}
                >
                    <div className={styles.author}>
                        <img
                            className={styles.avatar}
                            src={post.user.avatarUrl ? `http://localhost:4444${post.user.avatarUrl}` : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                            alt="avatar"
                        />
                        <div className={styles.info}>
                            <span className={styles.name}>{post.user.fullName}</span>
                            <span className={styles.date}>{timeAgo}</span>
                        </div>
                    </div>
                    <div className={styles.headerContainer}>
                        <Link to={`/posts/${post._id}`}>
                            <h1 className={styles.header}>{post.title}</h1>
                        </Link>
                    </div>
                    {single &&
                        <div className={styles.textContainer}>
                            <span className={styles.text} dangerouslySetInnerHTML={{__html: post.text}}/>
                        </div>
                    }
                    <div className={styles.tagsContainer}>
                        {post.tags.length > 0
                            ? post.tags.map(tag => (
                                <span
                                    key={tag}
                                    onClick={() => onTagInPostClick(tag)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    #{tag}
                                </span>
                            ))
                            : <span>no tags</span>
                        }
                    </div>
                    <div className={styles.reactions}>
                        <div className={styles.views}>
                            <AiOutlineEye/>
                            <span>{post.viewsCount}</span>
                        </div>
                        <div className={styles.comments}>
                            <PiChatTextLight/>
                            <span>{single ? commentsAmount : post.commentsAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
