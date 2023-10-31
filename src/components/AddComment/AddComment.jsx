import React from 'react';
import styles from './AddComment.module.css'
import btnStyles from '../../shared/Button.module.css'
import {Editor} from "@tinymce/tinymce-react";
import classNames from "classnames";

const AddComment = () => {
    return (
        <div className={styles.container}>
            <h3>Добавить комментарий</h3>
            <div className={styles.editor}>
                <Editor
                    apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                    init={{
                        menubar: false,
                        height: '10rem',
                    }}
                />
            </div>
            <button className={classNames(btnStyles.btn, btnStyles.primaryOutlined, styles.sendBtn)}>Отправить</button>
        </div>
    );
};

export default AddComment;
