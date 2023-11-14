import React, {useEffect, useState} from 'react';
import styles from './Tags.module.css'
import {PiHashBold} from "react-icons/pi";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";

const Tags = ({tags, isTagsLoading}) => {
    const navigate = useNavigate()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    const onTagClick = (tag) => {
        navigate(`/tags/${tag}`)
    }

    let whatToRender
    let renderedTags
    if (isTagsLoading) {
        whatToRender =
            <div
                className={styles.tagSkeletonContainer}
            >
                {[...Array(2)].map(() => (
                    <div key={Math.random()}
                         className={classNames(styles.tagRow, styles.tagRowSkeleton)}
                    />
                ))}
            </div>
    } else if (tags.length > 0) {
        renderedTags = tags.map(tag => (
            <div key={tag} className={styles.tagRow} onClick={() => onTagClick(tag)}>
                <PiHashBold className={styles.hash}/>
                <span title={tag}>{window.innerWidth < 960 && tag.length > 10 ? `${tag.slice(0,10)}...` : tag}</span>
            </div>
        ))

        if (windowWidth <= 960) {
            const slides = windowWidth > 730
                ? 3.3
                : windowWidth > 500
                    ? 2.3
                    : 1.3

            whatToRender =
                <Swiper
                    spaceBetween={5}
                    slidesPerView={slides}
                >
                    {renderedTags.map(tag => <SwiperSlide key={Math.random()}>{ tag }</SwiperSlide>)}
                </Swiper>
        } else {
            whatToRender = [...renderedTags]
        }
    }

    return (
        <div className={styles.tags}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Тэги</h3>
            </div>
            <div className={styles.tagRows}>
                { whatToRender }
            </div>
        </div>
    );
};

export default Tags;
