import React, { useEffect, useState } from 'react';
import BookListItem from './BookListItem';
import { BookInterface } from '../types';
import { getAllBooks } from '../services/api';
import Book from '../types/book';

const BooksList: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAllBooks({ q: 'fantasy+subject:fiction'});
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
        <div className="grid grid-cols-2 gap-3 bg-[#F2F4F9] p-3 sm:grid-cols-4 sm:py-10 w-full sm:px-[300px] sm:gap-6 mx-auto">
            {books.map((book: BookInterface) => (
                <BookListItem key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BooksList;
