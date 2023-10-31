import React from 'react';
import styles from './PostPage.module.css'
import Post from "../../components/Post/Post.jsx";
import AddComment from "../../components/AddComment/AddComment.jsx";
import Comments from "../../components/Comments/Comments.jsx";

const PostPage = () => {
    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.post}>
                    <Post single={true} />
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
