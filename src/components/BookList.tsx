import React, { useEffect, useState } from 'react';
import BookListItem from './BookListItem';
import { BookInterface } from '../types';
import { getAllBooks } from '../services/api';
import Book from '../types/book';

const BooksList: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAllBooks({});
            if (!response) return; // Check if response is undefined
            const { data } = response;
            console.log('data',data);
            const bookList = data.map((book: Book) => {
                return {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    imageUrl: book.imageUrl,
                    description: book.description,
                    publishDate: book.publishDate ? new Date(book.publishDate) : undefined,
                };
            });
            setBooks(bookList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(books);

    if (books.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#F2F4F9]">
            {books.map((book: BookInterface) => (
                <BookListItem key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BooksList;
