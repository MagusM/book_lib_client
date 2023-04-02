import React from 'react';
import { BookInterface } from '../types';
import heartIcon from '../assets/svg/heart.svg';

type Props = {
    book: BookInterface;
};

const BookListItem: React.FC<Props> = ({ book }) => {
    return (
        <div className="w-[180px] sm:w-[280px] flex flex-col justify-between border border-gray-100 rounded-xl overflow-hidden p-2 bg-white">
            <div className='relative h-3/4 w-full p-2 sm:min-h-[85%]'>
                <div 
                    className='
                        flex h-14 w-14 absolute rounded-lg top-3 right-3 justify-center items-center 
                        backdrop-blur backdrop-opacity-90 border-gray-100
                        sm:h-16 sm:w-16
                    '
                >
                    <img className="z-100 h-5 w-5 iconColorNone" src={heartIcon} alt="Add to favorites" />
                </div>
                <img className="object-fill h-full w-full rounded-xl" src={book.imageUrl} alt={`Cover for ${book.title}`} />
            </div>
            <div className="h-1/4 p-2 w-full flex flex-col justify-between">
                <h3 className="text-sm sm:text-[15px] font-bold text-secondary w-full line-clamp-2 sm:line-clamp-5">{book.title}</h3>
                <p className="text-tertiary text-[12px] font-bold w-full truncate line-clamp-2 sm:line-clamp-5 mt-2 sm:mb-0 sm:mt-auto">by {book.author}</p>
            </div>
        </div>
    );
};

export default BookListItem;
