import React, {useState} from 'react';
import styles from './AddComment.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {fetchCreateComment} from "../../redux/slices/commentsSlice.js";
import {useInput} from "../../hooks/useInput.js";

const AddComment = ({setCommentsAmount}) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)
    const {id} = useParams()

    const text = useInput('', {isEmpty: true, minLength: 3, maxLength: 500})

    const onSubmitBtnClick = () => {
        dispatch(fetchCreateComment({postId: id, text: text.value.replace(/(&nbsp;|\s)+/g, ' ').trim()}))
        text.insertValue('')
        setCommentsAmount(prev => prev + 1)
    }

    return (
        <div className={styles.container}>
            <h3>Добавить комментарий</h3>
            {userData
                ?
                <>
                    {text.isDirty && text.isEmpty &&
                        <div style={{color: "red", fontSize: ".8rem"}}>Поле не может быть пустым</div>}
                    {text.isDirty && text.minLengthError &&
                        <div style={{color: "red", fontSize: ".8rem"}}>Минимум три символа</div>}
                    {text.isDirty && text.maxLengthError &&
                        <div style={{color: "red", fontSize: ".8rem"}}>Не более 500 символов</div>}
                    <div className={styles.editor}>
                        <Editor
                            apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                            value={text.value}
                            onEditorChange={(newValue, editor) => {
                                text.insertValue(editor.getContent())
                            }}
                            onBlur={(e) => text.onBlur(e)}
                            init={{
                                menubar: false,
                                height: '10rem',
                            }}
                        />
                    </div>
                    <button
                        onClick={onSubmitBtnClick}
                        className={classNames(btnStyles.btn, btnStyles.primary, styles.sendBtn)}
                        disabled={!text.inputValid}
                    >
                        Отправить
                    </button>
                </>
                :
                <p className={styles.tipForLogin}>
                    <Link to='/login'>Войдите</Link> или <Link to='/register'>зарегистрируйтесь</Link>, чтобы оставлять
                    комментарии.
                </p>
            }

        </div>
    );
};

export default AddComment;
