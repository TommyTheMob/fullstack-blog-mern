import React from 'react';
import styles from './Tags.module.css'
import {PiHashBold} from "react-icons/pi";
import Loader from "../../shared/Loader/Loader.jsx";

const Tags = ({tags, isTagsLoading}) => {

    return (
        <div className={styles.tags}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Тэги</h3>
            </div>
            {isTagsLoading
                ?
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Loader/>
                </div>
                :
                <div className={styles.tagRows}>
                    {tags?.map(tag => (
                        <div key={tag} className={styles.tagRow}>
                            <PiHashBold className={styles.hash}/>
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Tags;
