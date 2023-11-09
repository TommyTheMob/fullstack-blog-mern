import React, {useRef, useState} from 'react';
import styles from './LoginRegForm.module.css'
import btnStyles from '../Button.module.css'
import classNames from "classnames";
import {BsTrash} from "react-icons/bs";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase.js";

const LoginRegForm = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [avatarTip, setAvatarTip] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const filePicker = useRef(null)

    let classes = title === 'Войти' ? classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.btn) : classNames(btnStyles.btn, btnStyles.primary, styles.btn)
    let header = title === 'Войти' ? 'Войдите' : 'Зарегистрируйтесь'

    const onInputFileChange = async (e) => {
        // try {
        //     const formData = new FormData()
        //     const file = e.target.files[0]
        //     formData.append('image', file)
        //     const {data} = await axios.post('/upload', formData)
        //     setAvatarUrl(data.url)
        //     setAvatarTip(false)
        // } catch (err) {
        //     console.warn(err)
        //     alert('Ошибка загрузки аватара')
        // }
        setIsUploading(true)

        const file = e.target.files[0]
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            snapshot => {
            },
            error => {
                console.log(error)
                setIsUploading(false)
                alert('Ошибка загрузки аватара')
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                setAvatarUrl(downloadURL)
                setIsUploading(false)
                setAvatarTip(false)
            }
        )
    }

    return (
        <div className={styles.form}>
            <h1>{header}</h1>
            {title === 'Зарегистрироваться' &&
                <>
                    {avatarUrl
                        ?
                        <>
                            <div
                                className={styles.avatar}
                                onMouseEnter={() => setAvatarTip(true)}
                                onMouseLeave={() => setAvatarTip(false)}
                                onClick={() => {
                                    setAvatarUrl('')
                                    setAvatarTip(false)
                                }}
                            >
                                <img
                                    src={avatarUrl}
                                    alt="avatar"
                                />
                                <BsTrash
                                    className={avatarTip ? classNames(styles.avatarDelete, styles.visible) : styles.avatarTip}
                                />
                            </div>
                        </>
                        :
                        isUploading
                            ?
                            <div className={styles.avatar}>
                                <div className={styles.avatarSkeleton} />
                            </div>
                            :
                            <>
                                <input
                                    className={classNames(styles.hidden)}
                                    ref={filePicker}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => onInputFileChange(e)}
                                />
                                <div
                                    className={styles.avatar}
                                    onMouseEnter={() => setAvatarTip(prev => !prev)}
                                    onMouseLeave={() => setAvatarTip(prev => !prev)}
                                    onClick={() => filePicker.current.click()}
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                        alt="avatar"
                                    />
                                    <span
                                        className={classNames(styles.avatarTip, styles.visible)}>+</span>
                                </div>
                            </>
                    }
                        <div className={styles.name}>
                            <label htmlFor="name">Имя</label>
                            <input type="text" id='name' value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                </>
            }
            <div className={styles.email}>
                <label htmlFor="email">Почта</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.password}>
                <label htmlFor="password">Пароль</label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className={classes}
                    onClick={() => handleClick(email, password, fullName, avatarUrl)}>{title}</button>
        </div>
    );
};

export default LoginRegForm;
