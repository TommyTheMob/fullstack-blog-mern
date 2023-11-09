import React, {useState} from 'react';
import styles from './Post.module.css'
import {AiOutlineEye} from "react-icons/ai";
import {PiChatTextLight} from "react-icons/pi";
import {useNavigate} from "react-router-dom";
import {parseISO, formatDistanceToNow} from 'date-fns';
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {fetchDeletePost, fetchTags, setSort} from "../../redux/slices/postsSlice.js";
import {fetchLastComments} from "../../redux/slices/commentsSlice.js";
import ActionMenu from "../../shared/ActionMenu/ActionMenu.jsx";

const Post = ({single, post, isOwner, commentsAmount}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuVisible, setMenuVisible] = useState(false)

    const postClasses = single
        ? styles.postSingle
        : menuVisible ? classNames(styles.postMulti, styles.postHover) : styles.postMulti

    let timeAgo = ``
    if (post) {
        const date = parseISO(post.createdAt)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    const onDeletePostClick = (event) => {
        event.stopPropagation()
        if (window.confirm('Удалить статью?')) {
            dispatch(fetchDeletePost(post._id)).then(() => {
                dispatch(fetchLastComments())
                dispatch(fetchTags())
            })
            navigate('/')
        }
    }

    const onEditPostClick = (event) => {
        event.stopPropagation()
        navigate(`/posts/${post._id}/edit`)
    }

    const onTagInPostClick = (event, tag) => {
        event.stopPropagation()
        dispatch(setSort(tag))
        navigate(`/tags/${tag}`)
    }

    const onFullPostClick = () => {
        navigate(`/posts/${post._id}`)
    }


    return (
        <>
            <div
                className={postClasses}
                style={!post.imageUrl ? {height: 'auto'} : {}}
                onMouseEnter={() => setMenuVisible(true)}
                onMouseLeave={() => setMenuVisible(false)}
                onClick={onFullPostClick}
            >
                <ActionMenu
                    visible={menuVisible}
                    isOwner={isOwner}
                    edit={onEditPostClick}
                    remove={onDeletePostClick}
                />
                {post.imageUrl &&
                    <div
                        className={single ? styles.imgContainer : classNames(styles.imgContainer, styles.imgContainerMulti)}>
                        <img
                            className={single ? styles.img : styles.imgMulti}
                            src={post.imageUrl}
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
                            src={post.user.avatarUrl ? post.user.avatarUrl: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                            alt="avatar"
                        />
                        <div className={styles.info}>
                            <span className={styles.name}>{post.user.fullName}</span>
                            <span className={styles.date}>{timeAgo}</span>
                        </div>
                    </div>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.header}>{post.title}</h1>
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
                                    className={styles.tag}
                                    onClick={(event) => onTagInPostClick(event, tag)}
                                    title={tag}
                                >
                                    #{tag.length > 10 ? tag.slice(0,10) + '...' : tag}
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
