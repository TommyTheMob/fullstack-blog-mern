import React, {useEffect, useRef, useState} from 'react';
import styles from './AddPost.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios.js";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../firebase.js";
import Loader from "../../shared/Loader/Loader.jsx";
import styleBtns from "../../shared/Button.module.css";
import {useInput} from "../../hooks/useInput.js";

const AddPost = () => {
    const isAuth = useSelector(selectIsAuth)

    const navigate = useNavigate()
    const {id} = useParams()

    const filePicker = useRef(null)

    const [isPostUploading, setIsPostUploading] = useState(false)
    const [isImgUploading, setIsImgUploading] = useState(false)

    const isEditing = Boolean(id)

    const [imageUrl, setImageUrl] = useState('')
    const text = useInput('', {isEmpty: true, minLength: 10, maxLength: 2000})
    const title = useInput('', {isEmpty: true, minLength: 3, maxLength: 80})
    const tags = useInput('', {isEmpty: true, minLength: 3, maxLength: 100})

    useEffect(() => {
        if (!window.localStorage.getItem('token') && !isAuth) {
            navigate('/')
        }
    }, [isAuth])

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then(({data}) => {
                    title.insertValue(data.title)
                    text.insertValue(data.text)
                    tags.insertValue(data.tags.join(', '))
                    setImageUrl(data.imageUrl)
                })
                .catch(err => {
                    console.warn(err)
                    alert('Ошибка при получении статьи!')
                })
        }
    }, [])

    const onInputFileChange = async (e) => {
        // try {
        //     const formData = new FormData()
        //     const file = e.target.files[0]
        //     formData.append('image', file)
        //     const { data } = await axios.post('/upload', formData)
        //     setImageUrl(data.url)
        // } catch (err) {
        //     console.warn(err)
        //     alert('Ошибка загрузки файла')
        // }
        setIsImgUploading(true)

        const file = e.target.files[0]
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            snapshot => {
            },
            error => {
                console.log(error)
                alert('Ошибка загрузки файла')
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImageUrl(downloadURL)
                setIsImgUploading(false)
            }
        )
    }

    const onDeleteBtnClick = () => {
        filePicker.current.value = ''
        setImageUrl('')
    }

    const onSaveBtnClick = async () => {
        try {
            setIsPostUploading(true)

            let tagsToUpload = []
            if (tags.value.length > 0) {
                tagsToUpload = tags.value
                    .toLowerCase()
                    .split(',')
                    .map(tag => tag.replace(/\s+/g, ' ').trim())
                    .filter(Boolean)
            }

            const fields = {
                title: title.value.replace(/(&nbsp;|\s)+/g, ' ').trim(),
                text: text.value.replace(/(&nbsp;|\s)+/g, ' ').trim(),
                imageUrl,
                tags: [...new Set(tagsToUpload)]
            }
            const {data} = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)

            const _id = isEditing ? id : data._id
            navigate(`/posts/${_id}`)
        } catch (err) {
            const warns = err.response.data.map(obj => obj.msg).join('\n')
            console.warn(err)
            alert(`Ошибка при создании статьи:\n${warns}`)
        } finally {
            setIsPostUploading(false)
        }
    }

    const onCancelBtnClick = () => {
        navigate(-1)
    }

    return (
        <div className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <div>
                    <Link to='/'>
                        <button className={classNames(styleBtns.btn, styleBtns.secondary, styles.toMainBtn)}>
                            На главную
                        </button>
                    </Link>
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
                            {isImgUploading &&
                                <div style={{textAlign: 'center'}}>
                                    <Loader/>
                                </div>
                            }
                            {imageUrl &&
                                <>
                                    <div className={styles.imgContainer}>
                                        <img src={imageUrl} alt="post image"/>
                                    </div>
                                    <button
                                        className={classNames(btnStyles.btn, btnStyles.danger)}
                                        onClick={onDeleteBtnClick}
                                    >
                                        Удалить
                                    </button>
                                </>
                            }
                        </div>
                        <div className={styles.header}>
                            <label htmlFor="header">Заголовок</label>
                            {title.isDirty && title.isEmpty &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Поле не может быть пустым</div>}
                            {title.isDirty && title.minLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Минимум три символа</div>}
                            {title.isDirty && title.maxLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Не более 80 символов</div>}
                            <input
                                type="text"
                                id='header'
                                placeholder='Введите заголовок...'
                                value={title.value}
                                onChange={(e) => title.onChange(e)}
                                onBlur={(e) => title.onBlur(e)}
                            />
                        </div>
                        <div className={styles.tags}>
                            <label htmlFor="tags">Тэги</label>
                            {tags.isDirty && tags.isEmpty &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Поле не может быть пустым</div>}
                            {tags.isDirty && tags.minLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Минимум три символа</div>}
                            {tags.isDirty && tags.maxLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Не более 100 символов</div>}
                            <input
                                type="text"
                                id='tags'
                                placeholder='Введите теги через запятую...'
                                value={tags.value}
                                onChange={(e) => tags.onChange(e)}
                                onBlur={(e) => tags.onBlur(e)}
                            />
                        </div>
                        <div className={styles.text}>
                            <span>Текст статьи</span>
                            {text.isDirty && text.isEmpty &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Поле не может быть пустым</div>}
                            {text.isDirty && text.minLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Минимум 10 символов</div>}
                            {text.isDirty && text.maxLengthError &&
                                <div style={{color: "red", fontSize: ".8rem"}}>Не более 2000 символов</div>}
                            <div className={styles.editor}>
                                <Editor
                                    apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                                    init={{
                                        menubar: false,
                                        placeholder: 'Введите текст...'
                                    }}
                                    value={text.value}
                                    onBlur={(e) => text.onBlur(e)}
                                    onEditorChange={(newValue, editor) => {
                                        text.insertValue(editor.getContent())
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            className={classNames(btnStyles.btn, btnStyles.primary, styles.createBtn)}
                            onClick={onSaveBtnClick}
                            disabled={!title.inputValid || !text.inputValid || !tags.inputValid}
                        >
                            {isEditing ? 'Сохранить' : 'Опубликовать'}
                        </button>
                        <button
                            className={classNames(btnStyles.btn, btnStyles.danger, styles.cancelBtn)}
                            onClick={onCancelBtnClick}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
