import React from 'react';
import { BookInterface } from '../types';
import heartIcon from '../assets/svg/heart.svg';

type Props = {
    book: BookInterface;
};

const BookListItem: React.FC<Props> = ({ book }) => {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            <img className="h-56 w-full object-cover" src={book.image} alt={`Cover for ${book.title}`} />
            <div className="p-4">
                <h3 className="text-xl font-medium text-gray-900">{book.title}</h3>
                <p className="text-gray-500">{book.author}</p>
                <button className="flex items-center text-gray-400 hover:text-gray-500">
                    <img className="h-5 w-5 mr-1" src={heartIcon} alt="Add to favorites" />
                    Add to Favorites
                </button>
            </div>
        </div>
    );
};

export default BookListItem;
