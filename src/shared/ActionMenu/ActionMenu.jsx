import React from 'react';
import styles from './ActionMenu.module.css'
import {AiFillEdit, AiOutlineClose} from "react-icons/ai";
import classNames from "classnames";

const ActionMenu = ({ visible, isOwner, edit, remove }, props) => {

    return (
        <div className={visible && isOwner ? styles.actionMenu : classNames(styles.actionMenu, styles.hidden)}>
            <AiFillEdit onClick={(event) => props.comment ? edit(true) : edit(event)} className={styles.edit}/>
            <AiOutlineClose onClick={(event) => remove(event)} className={styles.delete}/>
        </div>
    );
};

export default ActionMenu;
