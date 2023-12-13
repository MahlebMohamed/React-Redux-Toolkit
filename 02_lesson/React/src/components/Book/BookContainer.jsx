import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './book.css';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { getBooks } from '../../store/BookSlice';


const PostContainer = () => {
  const { isLoading, books } = useSelector(state => state.books);
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  const getBookId = (id) => {
    setSelectedBook(books.find((item) => item.id === id));
  }

  console.log('render Container');

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} isLoggedIn={isLoggedIn} getBookId={getBookId} />
        </div>
        <div className='col side-line'>
          <BookInfo selectedBook={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
