import React from 'react';
import { useSelector } from 'react-redux';

function PostsList() {

    const posts = useSelector(state => state.posts);

    const rendredPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {rendredPosts}
        </section>
    )
}

export default PostsList;