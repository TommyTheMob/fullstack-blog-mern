import React, {useEffect, useRef, useState} from 'react';
import styles from './AddPost.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios.js";

const AddPost = () => {
    const isAuth = useSelector(selectIsAuth)

    const navigate = useNavigate()
    const { id } = useParams()

    const filePicker = useRef(null)

    const [isPostUploading, setIsPostUploading] = useState(false);

    const isEditing = Boolean(id)

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) {
            navigate('/')
        }
    }, [isAuth])

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then(({ data }) => {
                    setTitle(data.title)
                    setText(data.text)
                    setTags(data.tags.join(', '))
                    setImageUrl(data.imageUrl)
                })
                .catch(err => {
                    console.warn(err)
                    alert('Ошибка при получении статьи!')
                })
        }
    }, [])

    const onInputFileChange = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('/upload', formData)
            setImageUrl(data.url)
        } catch (err) {
            console.warn(err)
            alert('Ошибка загрузки файла')
        }
    }

    const onDeleteBtnClick = () => {
        setImageUrl('')
    }

    const onSaveBtnClick = async () => {
        try {
            setIsPostUploading(true)

            const fields = {title, text, imageUrl, tags: tags.split(/,\s*/)}
            const { data } = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)

            const _id = isEditing ? id : data._id
            navigate(`/posts/${_id}`)
        } catch (err) {
            console.warn(err)
            alert('Ошибка при создании статьи')
        } finally {
            setIsPostUploading(false)
        }
    }

    return (
        <div className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <div className={styles.addPost}>
                    <div className={styles.picture}>
                        <input
                            className={classNames(styles.input, styles.hidden)}
                            ref={filePicker}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => onInputFileChange(e)}
                        />
                        <div className={styles.picker} onClick={() => filePicker.current.click()}>
                            Выберите изображение
                        </div>
                        {imageUrl &&
                            <>
                                <div className={styles.imgContainer}>
                                    <img src={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:4444'}${imageUrl}`} alt="post image"/>
                                </div>
                                <button
                                    className={classNames(btnStyles.btn, btnStyles.primaryOutlined)}
                                    onClick={onDeleteBtnClick}
                                >
                                    Удалить
                                </button>
                            </>
                        }
                    </div>
                    <div className={styles.header}>
                        <label htmlFor="header">Заголовок</label>
                        <input
                            type="text"
                            id='header'
                            placeholder='Введите заголовок...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.tags}>
                        <label htmlFor="header">Тэги</label>
                        <input
                            type="text"
                            id='header'
                            placeholder='Введите теги через запятую...'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className={styles.text}>
                        <span>Текст статьи</span>
                        <div className={styles.editor}>
                            <Editor
                                apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                                init={{
                                    menubar: false,
                                    placeholder: 'Введите текст...'
                                }}
                                value={text}
                                onEditorChange={(newValue, editor) => {
                                    setText(editor.getContent())
                                }}
                            />
                        </div>
                    </div>
                    <button
                        className={classNames(btnStyles.btn, btnStyles.primary, styles.createBtn)}
                        onClick={onSaveBtnClick}
                    >
                        {isEditing ? 'Сохранить' : 'Опубликовать'}
                    </button>
                    <button className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.cancelBtn)}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
