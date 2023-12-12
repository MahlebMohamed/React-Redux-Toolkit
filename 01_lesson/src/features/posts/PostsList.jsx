import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid';

import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';


function PostsList() {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);


    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'success') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={uniqid()} post={post} />);
    } else if (postStatus === 'failed') {
        content = <p> {error} </p>;
    }


    return (
        <section>
            <h2>Posts </h2>
            {content}
        </section>
    )
}

export default PostsList;