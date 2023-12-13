import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook, getBookInfo } from '../../store/BookSlice';

const BooksList = ({ isLoading, books, isLoggedIn, getBookId }) => {
  const dispatch = useDispatch();

  const bookList = books.length > 0 ? books.map((book) => (
    <li className='list-group-item d-flex  justify-content-between align-items-center' key={book.id}>
      <div>{book.title} </div>
      <div className='btn-group' role='group'>
        <button type='button' className='btn btn-primary' onClick={() => {
          // dispatch(getBookInfo(book))
          getBookId(book.id)
        }}>
          Read
        </button>
        <button type='button' className='btn btn-danger' disabled={!isLoggedIn} onClick={() => {
          dispatch(deleteBook(book))
          // .unwrap()
          // .then((data) => {
          //   console.log(data);
          // })
          // .catch((error) => {
          //   console.log(error);
          // })
        }}>
          Delete
        </button>
      </div>
    </li>
  )) : 'There is not books available';

  return (
    <div>
      <h2>Books List</h2>

      {
        isLoading ? (
          'Loading...'
        ) : (
          bookList
        )
      }

    </div>
  );
};

export default BooksList;
