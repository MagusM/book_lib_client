import React, { useEffect, useState } from 'react';
import BookListItem from './BookListItem';
import { BookInterface } from '../types';
import { getAllBooks } from '../services/api';
import Book from '../types/book';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, syncWishlist } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/types';

const BooksList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const [books, setBooks] = useState<Book[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAllBooks({ q: 'fantasy+subject:fiction', userId: String(user?.id)});
            if (!response) return;
            const { data } = response;
            const bookList = data.map((book: Book) => {
                return {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    imageUrl: book.imageUrl,
                    description: book.description,
                    publishDate: book.publishDate ? new Date(book.publishDate) : undefined,
                    wishlisted: book.wishlisted
                };
            });
            setBooks(bookList);
        } catch (error: any) {
            console.error('error', error);
            if (error.message === 'reset') {
                localStorage.clear();

                // Remove Authorization header from Axios
                delete axios.defaults.headers.common['Authorization'];

                // Reset the app store
                dispatch(resetStore());

                // Redirect to "/"
                navigate('/');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(books);
        const wishlistedBooks = books.filter((book: BookInterface) => book.wishlisted);
        dispatch(syncWishlist(wishlistedBooks));
    }, [books, dispatch]);
    

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
