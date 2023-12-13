import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const BookInfo = ({ selectedBook }) => {

  // const book = useSelector(state => state.books.bookInfo);

  return (
    <Fragment>
      <h2>Book Details</h2>
      {
        selectedBook ? (
          <div>
            <p className='fw-bold'>Title: {selectedBook.title} </p>
            <p className='fw-light'>Description: {selectedBook.description} </p>
            <p className='fst-italic'>Price: {selectedBook.price} </p>
          </div>
        ) : (
          <div className='alert alert-secondary' role='alert'>
            There is no post selected yet. Please select!
          </div>
        )
      }

    </Fragment>
  );
};

export default BookInfo;
