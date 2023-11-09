import React, {useEffect, useState} from 'react';
import styles from './PostPage.module.css'
import Post from "../../components/Post/Post.jsx";
import AddComment from "../../components/AddComment/AddComment.jsx";
import Comments from "../../components/Commentaries/Comments/Comments.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "../../axios.js";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton.jsx";
import {useSelector} from "react-redux";
import classNames from "classnames";
import styleBtns from "../../shared/Button.module.css";

const PostPage = () => {
    const [post, setPost] = useState()
    const [commentsAmount, setCommentsAmount] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const {id, commentId} = useParams()
    const userData = useSelector(state => state.auth.data)

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(data => {
                setPost(data.data)
                setCommentsAmount(data.data.commentsAmount)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (commentId) {
            const commentElem = document.getElementById(`${commentId}`)

            if (commentElem) {
                commentElem.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [])

    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.post}>
                    <Link to='/'>
                        <button className={classNames(styleBtns.btn, styleBtns.secondary, styles.toMainBtn)}>
                            На главную
                        </button>
                    </Link>
                    {isLoading
                        ? <PostSkeleton inPost={Boolean(id)} />
                        : <Post single={true} post={post} commentsAmount={commentsAmount}
                                isOwner={userData?._id === post.user._id}/>
                    }
                </section>
                <section className={styles.comments}>
                    <AddComment setCommentsAmount={setCommentsAmount}/>
                    <Comments inPost={true} postId={id} setCommentsAmount={setCommentsAmount}/>
                </section>
            </div>
        </main>
    );
};

export default PostPage;
