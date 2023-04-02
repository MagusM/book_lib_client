import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { BookInterface } from '../types';
import {BooksTopNavbar, BooksList} from '../components/';

const BooksPage: React.FC = () => {
    const { t } = useTranslation();
    // const books = useSelector((state: RootState) => state.books);
    // const [searchTerm, setSearchTerm] = useState('');

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    // };

    // const filteredBooks = books.filter((book: BookInterface) =>
    //     book.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <div 
            className='flex flex-col w-full h-full'
        >
            <BooksTopNavbar />
            <BooksList />
        </div>
    );
};

export default BooksPage;
