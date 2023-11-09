import React, {useEffect, useState} from 'react';
import styles from './Comments.module.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchCommentsByPost, fetchLastComments} from "../../../redux/slices/commentsSlice.js";
import CommentSkeleton from "../CommentSkeleton/CommentSkeleton.jsx";
import CommentExcerpt from "../CommentExcerpt/CommentExcerpt.jsx";
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

const Comments = ({inPost, postId, setCommentsAmount}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector(state => state.comments)
    const userData = useSelector(state => state.auth.data)

    const isCommentsLoading = comments.status === 'loading'

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        if (inPost) {
            dispatch(fetchCommentsByPost(postId))
        } else {
            dispatch(fetchLastComments())
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    let whatToRender
    let renderComments

    if (isCommentsLoading) {
        whatToRender =
            <div className={styles.skeletonContainer} style={inPost ? {display: "block"} : {}}>
                {[...Array(5)].map(() => <CommentSkeleton key={Math.random()}/>)}
            </div>

    } else if (comments.items.length > 0) {
        renderComments = comments.items.map(comment => (
            <CommentExcerpt
                key={comment._id}
                comment={comment}
                isOwner={userData?._id === comment.user._id}
                inPost={inPost}
                windowWidth={windowWidth}
                setCommentsAmount={setCommentsAmount}
            />
        ))

        if (inPost) {
            whatToRender = [...renderComments]
        } else {
            if (windowWidth > 960) {
                whatToRender = [...renderComments]
            } else {
                // const slides =  windowWidth < 730 ? 1.3 : 2.3
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
                        {renderComments.map(comm => (<SwiperSlide key={Math.random()}>{ comm }</SwiperSlide>))}
                    </Swiper>
            }
        }
    }

    return (
        <div className={styles.comments}>
            <div className={styles.headerRow}>
                <h3 className={styles.header}>Комментарии</h3>
            </div>
            <div className={styles.commentRows}>
                { whatToRender }
            </div>
        </div>
    );
};

export default Comments;