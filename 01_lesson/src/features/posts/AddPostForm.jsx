import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

function AddPostForm() {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setuserId] = useState('');

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setuserId(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )

            setContent('');
            setTitle('');
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2 style={{ marginBottom: '10px' }}>Add a New Post</h2>

            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <select id='postAuthor' value={userId} onClick={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;