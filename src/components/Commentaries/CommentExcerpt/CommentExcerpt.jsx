import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {fetchDeleteComment, fetchUpdateComment} from "../../../redux/slices/commentsSlice.js";
import styles from "./CommentExcerpt.module.css";
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";
import btnStyles from "../../../shared/Button.module.css";
import ActionMenu from "../../../shared/ActionMenu/ActionMenu.jsx";
import {formatDistanceToNow, parseISO} from "date-fns";
import {useNavigate} from "react-router-dom";

const CommentExcerpt = ({comment, isOwner, inPost, setCommentsAmount, windowWidth}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menuVisible, setMenuVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState('')

    const commentText = inPost
        ? {__html: comment.text}
        :
        windowWidth > 960
            ? comment.text.length > 35 ? {__html: `${comment.text.slice(0, 35)}...`} : {__html: comment.text}
            :
            windowWidth < 480
                ? comment.text.length > 10 ? {__html: `${comment.text.slice(0, 10)}...`} : {__html: comment.text}
                : comment.text.length > 15 ? {__html: `${comment.text.slice(0, 15)}...`} : {__html: comment.text}

    const onDeleteBtnClick = () => {
        if (window.confirm('Удалить комментарий?')) {
            dispatch(fetchDeleteComment(comment._id))
        }
        setCommentsAmount(prev => prev - 1)
    }

    const onSubmitBtnClick = () => {
        dispatch(fetchUpdateComment({id: comment._id, text}))
        setIsEditing(false)
    }

    const onCommentClick = () => {
        if (!inPost) {
            navigate(`/posts/${comment.post}/comment/${comment._id}`)
        }
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
                        className={classNames(btnStyles.btn, btnStyles.danger)}
                    >
                        Отмена
                    </button>
                </div>
                :
                <div
                    className={inPost ? classNames(styles.commentRow) : classNames(styles.commentRow, styles.hover)}
                    style={inPost ? { height: "auto" } : {}}
                    id={comment._id}
                    onMouseEnter={() => setMenuVisible(true)}
                    onMouseLeave={() => setMenuVisible(false)}
                    onClick={onCommentClick}
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
                        src={comment.user.avatarUrl ? comment.user.avatarUrl : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
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
                            style={inPost ? {position: 'static'} : {}}
                            dangerouslySetInnerHTML={commentText}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default CommentExcerpt;