import React, {useEffect, useRef} from 'react';
import styles from './HomePage.module.css'
import styleBtns from '../../shared/Button.module.css'
import Post from "../../components/Post/Post.jsx";
import Tags from "../../components/Tags/Tags.jsx";
import Comments from "../../components/Commentaries/Comments/Comments.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags, setSort} from "../../redux/slices/postsSlice.js";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton.jsx";
import classNames from "classnames";
import {Link, useParams} from "react-router-dom";
import {PiHashBold} from "react-icons/pi";

const HomePage = () => {
    const dispatch = useDispatch()
    const {tag} = useParams()
    const {posts, tags} = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)

    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    const tagRef = useRef(tag)

    useEffect(() => {
        dispatch(fetchTags())
    }, [])

    useEffect(() => {
        if (tag && tag !== tagRef.current) {
            dispatch(setSort(tag))
            tagRef.current = tag
        } else if (!tag) {
            dispatch(setSort('new'))
            tagRef.current = 'new'
        }
    }, [tag])

    useEffect(() => {
        if (tag) {
            dispatch(fetchPosts(tag))
        } else {
            dispatch(fetchPosts(posts.sort))
        }
    }, [posts.sort])

    const onNewBtnClick = () => {
        dispatch(setSort('new'))
    }

    const onPopBtnClick = () => {
        dispatch(setSort('pop'))
    }

    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.posts}>
                    {!tag
                        ?
                        <div className={styles.btns}>
                            <button
                                className={posts.sort === 'new' ? classNames(styles.newBtn, styles.active) : classNames(styles.newBtn)}
                                onClick={onNewBtnClick}
                            >
                                Новые
                            </button>
                            <button
                                className={posts.sort === 'pop' ? classNames(styles.popBtn, styles.active) : classNames(styles.popBtn)}
                                onClick={onPopBtnClick}
                            >
                                Популярные
                            </button>
                        </div>
                        :
                        <div className={styles.tagBlock}>
                            <Link to='/'>
                                <button className={classNames(styleBtns.btn, styleBtns.secondary, styles.toMainBtn)}>
                                    На главную
                                </button>
                            </Link>
                            <div className={styles.hashtag}>
                                <PiHashBold className={styles.hash}/>
                                <span className={styles.tag}>{tag}</span>
                            </div>
                        </div>
                    }
                    {isPostsLoading
                        ?
                        [...Array(5)].map(() => (
                            <PostSkeleton key={Math.random()}/>
                        ))
                        :
                        posts.items.map(post => (
                            <Post key={post._id} post={post} isOwner={userData?._id === post.user._id}/>
                        ))
                    }
                </section>
                <section className={styles.side}>
                    <Tags tags={tags.items} isTagsLoading={isTagsLoading}/>
                    <Comments inPost={false}/>
                </section>
            </div>
        </main>
    );
};

export default HomePage;
