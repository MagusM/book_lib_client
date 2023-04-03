import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BookListItem from './BookListItem';
import { BookInterface } from '../types';
import { fetchWishlistedBooks, getAllBooks } from '../services/api';
import Book from '../types/book';
import { useDispatch, useSelector } from 'react-redux';
import { syncWishlist } from '../store/actions';
import { RootState } from '../store/types';

const BooksList: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const search = useSelector((state: RootState) => state.search);
    const showWishlist = useSelector((state: RootState) => state.showWishlist);
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const [books, setBooks] = useState<Book[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await getAllBooks({
                q: 'fantasy+subject:fiction',
                userId: String(user?.id),
            });
            if (!response) return;
            const { data } = response;
            const bookList = data.map((book: Book) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                imageUrl: book.imageUrl,
                description: book.description,
            }));
            setBooks(bookList);
        } catch (error) {
            console.error('error', error);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchWlistedBooks = useCallback(async () => {
        if (!user) {
            window.location.href = '/';
            return;
        }
        const data = await fetchWishlistedBooks({ userId: String(user.id) });
        if (data.wishlist.books) {
            dispatch(syncWishlist(data.wishlist.books));
        }
    }, [user, dispatch]);

    useEffect(() => {
        fetchWlistedBooks();
    }, [fetchWlistedBooks]);

    const filteredBooks = useMemo(() => {
        if (search === '') {
            return books;
        }
        return books.filter(
            (book: BookInterface) =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, books]);

    const displayedBooks = useMemo(() => {
        if (!showWishlist) {
            return filteredBooks;
        }
        return filteredBooks.filter((book: BookInterface) =>
            wishlist.some((wishlistBook: BookInterface) => wishlistBook.id === book.id)
        );
    }, [showWishlist, filteredBooks, wishlist]);

    return (
        <div className="flex flex-col min-h-full justify-start items-start p-3 bg-[#F2F4F9]">
            {search && displayedBooks.length > 0 && (
                <div className="text-secondary font-bold my-4 text-[14px] sm:px-[300px]">
                    {displayedBooks.length} results for &quot;{search}&quot;
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full sm:py-10 sm:px-[300px] sm:gap-6 mx-auto">
                {displayedBooks.map((book: BookInterface) => (
                    <BookListItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BooksList;
