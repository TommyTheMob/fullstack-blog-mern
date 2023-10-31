import React from 'react';
import styles from './HomePage.module.css'
import Post from "../../components/Post/Post.jsx";
import Tags from "../../components/Tags/Tags.jsx";
import Comments from "../../components/Comments/Comments.jsx";

const HomePage = () => {
    return (
        <main className={styles.pageContent}>
            <div className={styles.pageContentWrapper}>
                <section className={styles.posts}>
                    <Post />
                    <Post />
                    <Post />
                </section>
                <section className={styles.side}>
                    <Tags />
                    <Comments />
                </section>
            </div>
        </main>
    );
};

export default HomePage;
