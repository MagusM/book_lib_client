import React, { useCallback, useEffect, useState } from 'react';
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

    const fetchData = useCallback(
      async () => {
            try {
                const response = await getAllBooks({ q: 'fantasy+subject:fiction', userId: String(user?.id) });
                if (!response) return;
                const { data } = response;
                const bookList = data.map((book: Book) => {
                    return {
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        imageUrl: book.imageUrl,
                        description: book.description
                    };
                });
                setBooks(bookList);
            } catch (error) {
                console.error('error', error);
            }
      },
      [user],
    )

    useEffect(() => {
        fetchData();
    }, []);

    const fetchWlistedBooks = useCallback(
      async () => {
            if (user) {
                const data = await fetchWishlistedBooks({ userId: user.id });
                if (data.wishlist.books) {
                    console.log('data.wishlist.books', data.wishlist.books);
                    console.log('wishlist', wishlist);
                    dispatch(syncWishlist(data.wishlist.books));
                    console.log('wishlist after sync', wishlist);
                }
            }
      },
        [user, dispatch],
    )
    
    useEffect(() => {
        fetchWlistedBooks();
    }, [books, fetchWlistedBooks]);

    useEffect(() => {
        console.log('showWishlist: ' + showWishlist);
        if (showWishlist && wishlist) {
            console.log(wishlist);
            // setBooks(wishlist);
        }
    }, [showWishlist, wishlist])

    useEffect(() => {
        console.log(books);
        console.log('going to filter');
        console.log('search is: ' + search);
        if (search !== '' && books.length) {
            const filteredBooks = books.filter((book: Book) => (
                book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
                book.author.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ));

            console.log('filteredBooks', filteredBooks);
            setBooks(filteredBooks);
        } else {
            fetchData();
        }
    }, [search])
    

    return (
        <div className='flex flex-col min-h-full justify-start items-start p-3 bg-[#F2F4F9]'>
            {search && books && (
                <div className='text-secondary font-bold my-4 text-[14px] sm:px-[300px]'>
                    {books.length} results for "{search}"
                </div>
            ) }
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full sm:py-10 sm:px-[300px] sm:gap-6 mx-auto">
                {books.map((book: BookInterface) => (
                    <BookListItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BooksList;
