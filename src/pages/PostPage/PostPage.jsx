import React, {useEffect, useState} from 'react';
import styles from './PostPage.module.css'
import Post from "../../components/Post/Post.jsx";
import AddComment from "../../components/AddComment/AddComment.jsx";
import Comments from "../../components/Comments/Comments.jsx";
import {useParams} from "react-router-dom";
import axios from "../../axios.js";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton.jsx";
import {useSelector} from "react-redux";

const PostPage = () => {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const userData = useSelector(state => state.auth.data)

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(data => {
                setPost(data.data)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.post}>
                    {isLoading
                        ? <PostSkeleton />
                        : <Post single={true} post={post} isOwner={userData?._id === post.user._id} />
                    }
                </section>
                <section className={styles.comments}>
                    <AddComment />
                    <Comments single={true} />
                </section>
            </div>
        </main>
    );
};

export default PostPage;
