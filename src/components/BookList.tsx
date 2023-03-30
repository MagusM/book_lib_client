import React from 'react';
import BookListItem from './BookListItem';
import { BookInterface } from '../types';

type Props = {
    books: BookInterface[];
};

const BooksList: React.FC<Props> = ({ books }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#F2F4F9]">
            {books.map((book: BookInterface) => (
                <BookListItem key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BooksList;
