import React, {useRef} from 'react';
import styles from './AddPost.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";

const AddPost = () => {
    const filePicker = useRef(null)

    return (
        <div className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <div className={styles.addPost}>
                    <div className={styles.picture}>
                        <input className={classNames(styles.input, styles.hidden)} ref={filePicker} type="file" accept=".jpg, .jpeg, .png" />
                        <div className={styles.picker} onClick={() => filePicker.current.click()}>
                            Выберите изображение
                        </div>
                    </div>
                    <div className={styles.header}>
                        <label htmlFor="header">Заголовок</label>
                        <input type="text" id='header'/>
                    </div>
                    <div className={styles.tags}>
                        <label htmlFor="header">Тэги</label>
                        <input type="text" id='header'/>
                    </div>
                    <div className={styles.text}>
                        <span>Текст статьи</span>
                        <div className={styles.editor}>
                            <Editor
                                apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                                init={{
                                    menubar: false,
                                }}
                            />
                        </div>
                    </div>
                    <button className={classNames(btnStyles.btn, btnStyles.primary, styles.createBtn)}>Сохранить</button>
                    <button className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.cancelBtn)}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
