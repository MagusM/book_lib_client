import React from 'react';
import {BooksTopNavbar, BooksList} from '../components/';

const BooksPage: React.FC = () => { 

    return (
        <div className='flex flex-col w-full h-full'>
            <BooksTopNavbar />
            <BooksList />
        </div>
    );
};

export default BooksPage;
