import React, {useEffect, useState} from 'react';
import styles from './Comments.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCommentsByPost,
    fetchDeleteComment,
    fetchLastComments,
    fetchUpdateComment
} from "../../redux/slices/commentsSlice.js";
import {formatDistanceToNow, parseISO} from "date-fns";
import classNames from "classnames";
import {AiFillEdit, AiOutlineClose} from "react-icons/ai";
import {Editor} from "@tinymce/tinymce-react";
import btnStyles from "../../shared/Button.module.css";
import {Link} from "react-router-dom";
import CommentSkeleton from "../CommentSkeleton/CommentSkeleton.jsx";
import ActionMenu from "../../shared/ActionMenu/ActionMenu.jsx";

const CommentExcerpt = ({ comment, isOwner, inPost, setCommentsAmount }) => {
    const dispatch = useDispatch()
    const [menuVisible, setMenuVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState('')

    const onDeleteBtnClick = () => {
        dispatch(fetchDeleteComment(comment._id))
        setCommentsAmount(prev => prev - 1)
    }

    const onSubmitBtnClick = () => {
        dispatch(fetchUpdateComment({id: comment._id, text}))
        setIsEditing(false)
    }

    return (
        <>
            {isEditing
                ?
                <div>
                    <div className={styles.editor}>
                        <Editor
                            apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                            initialValue={comment.text}
                            value={text}
                            onEditorChange={(newValue, editor) => {
                                setText(editor.getContent())
                            }}
                            init={{
                                menubar: false,
                                height: '10rem',
                            }}
                        />
                    </div>
                    <button
                        onClick={onSubmitBtnClick}
                        className={classNames(btnStyles.btn, btnStyles.primary, styles.sendBtn)}
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className={classNames(btnStyles.btn, btnStyles.primaryOutlined)}
                    >
                        Отмена
                    </button>
                </div>
                :
                <div
                    className={inPost ? classNames(styles.commentRow) : classNames(styles.commentRow, styles.hover)}
                    id={comment._id}
                    onMouseEnter={() => setMenuVisible(true)}
                    onMouseLeave={() => setMenuVisible(false)}
                >
                    {inPost &&
                        <ActionMenu
                            visible={menuVisible}
                            isOwner={isOwner}
                            edit={setIsEditing}
                            remove={onDeleteBtnClick}
                            comment
                        />
                    }
                    <img
                        className={styles.avatar}
                        src={comment.user.avatarUrl ? `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:4444'}${comment.user.avatarUrl}` : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                        alt="avatar"
                    />
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <span className={styles.name}>{comment.user.fullName}</span>
                            <span
                                className={styles.date}>{`${formatDistanceToNow(parseISO(comment.createdAt))} ago`}</span>
                        </div>
                        <span
                            className={styles.text}
                            dangerouslySetInnerHTML={
                                inPost
                                    ? {__html: comment.text}
                                    : comment.text.length  > 35 ? {__html: `${comment.text.slice(0, 35)}...`} : {__html: comment.text}
                            }
                        />
                    </div>
                </div>
            }
        </>
    )
}

const Comments = ({inPost, postId, setCommentsAmount}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector(state => state.comments)
    const userData = useSelector(state => state.auth.data)

    const isCommentsLoading = comments.status === 'loading'

    useEffect(() => {
        if (inPost) {
            dispatch(fetchCommentsByPost(postId))
        } else {
            dispatch(fetchLastComments())
        }
    }, [])

    return (
        <div className={styles.comments}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Комментарии</h3>
            </div>
            <div key={Date.now()} className={styles.commentRows}>
                {isCommentsLoading
                    ?
                    [...Array(5)].map(() => <CommentSkeleton key={Math.random()} />)
                    :
                    comments.items.map(comment =>
                        inPost
                            ?
                            <CommentExcerpt
                                key={comment._id}
                                comment={comment}
                                isOwner={userData?._id === comment.user._id}
                                inPost={inPost}
                                setCommentsAmount={setCommentsAmount}
                            />
                            :
                            <Link
                                key={comment._id}
                                to={`/posts/${comment.post}/comment/${comment._id}`}
                            >
                                <CommentExcerpt
                                    comment={comment}
                                    isOwner={userData?._id === comment.user._id}
                                    inPost={inPost}
                                />
                            </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Comments;