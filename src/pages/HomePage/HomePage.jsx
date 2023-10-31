import React, {useEffect} from 'react';
import styles from './HomePage.module.css'
import Post from "../../components/Post/Post.jsx";
import Tags from "../../components/Tags/Tags.jsx";
import Comments from "../../components/Comments/Comments.jsx";
import axios from '../../axios.js'
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../../redux/slices/postsSlice.js";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton.jsx";

const HomePage = () => {
    const dispatch = useDispatch()
    const { posts, tags } = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)

    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])


    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.posts}>
                    {isPostsLoading
                        ?
                        [...Array(5)].map(() => (
                            <PostSkeleton key={Math.random()} />
                        ))
                        :
                        posts.items.map(post => (
                            <Post key={post._id} post={post} isOwner={userData?._id === post.user._id} />
                        ))
                    }
                </section>
                <section className={styles.side}>
                    <Tags tags={tags.items} isTagsLoading={isTagsLoading} />
                    <Comments />
                </section>
            </div>
        </main>
    );
};

export default HomePage;
