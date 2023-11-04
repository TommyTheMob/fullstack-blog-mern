import React from 'react';
import styles from './Tags.module.css'
import {PiHashBold} from "react-icons/pi";
import Loader from "../../shared/Loader/Loader.jsx";
import classNames from "classnames";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSort} from "../../redux/slices/postsSlice.js";

const Tags = ({tags, isTagsLoading}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onTagClick = (tag) => {
        dispatch(setSort(tag))
        navigate(`/tags/${tag}`)
    }

    return (
        <div className={styles.tags}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Тэги</h3>
            </div>
            {isTagsLoading
                ?
                <div className={styles.tagRows}>
                    {[...Array(5)].map(() => (
                        <div key={Math.random()}
                             className={classNames(styles.tagRow, styles.tagRowSkeleton)}
                        />
                    ))}
                </div>
                :
                <div className={styles.tagRows}>
                    {tags?.map(tag => (
                        <div key={tag} className={styles.tagRow} onClick={() => onTagClick(tag)}>
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
