import React, {useState} from 'react';
import styles from './AddComment.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchCommentsByPost, fetchCreateComment} from "../../redux/slices/commentsSlice.js";

const AddComment = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [text, setText] = useState('')

    const onSubmitBtnClick = () => {
        dispatch(fetchCreateComment({postId: id, text}))
            .then(() => dispatch(fetchCommentsByPost(id)))
    }

    return (
        <div className={styles.container}>
            <h3>Добавить комментарий</h3>
            <div className={styles.editor}>
                <Editor
                    apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
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
                Отправить
            </button>
        </div>
    );
};

export default AddComment;
