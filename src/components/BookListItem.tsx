import React, { useEffect } from 'react';
import { BookInterface } from '../types';
import { ReactComponent as HeartIcon } from '../assets/svg/heart.svg';
import { ReactComponent as OutlinedHeart } from '../assets/svg/outlined-heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { addBookToWishlist, deleteFromWishlist } from '../services/api';
import { addToWishlist, removeFromWishlist } from '../store/actions';

type Props = {
    book: BookInterface;
};

const BookListItem: React.FC<Props> = ({ book }) => {
    // console.log(book);
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const user = useSelector((state: RootState) => state.user);

    const toggleWishlisted = async () => {
        try {
            if (wishlist.includes(book)) {
                console.log('removing book');
                console.log(book);
                const response = await deleteFromWishlist({ bookId: book.id, userId: String(user?.id)});

                book.wishlisted = false;
                dispatch(removeFromWishlist(book.id));
            } else {
                console.log('adding book');
                console.log(book);
                const response = await addBookToWishlist({ books: [book], userId: String(user?.id)});
                
                book.wishlisted = true;
                dispatch(addToWishlist(book));
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
      console.log('state user', {user});
    }, [user])
    


    return (
        <div className="w-[180px] sm:w-[280px] flex flex-col justify-between border border-gray-100 rounded-xl overflow-hidden p-2 bg-white">
            <div className='relative h-3/4 w-full p-2 sm:min-h-[85%]'>
                <div 
                    className='
                        flex h-12 w-12 absolute rounded-lg top-3 right-3 justify-center items-center 
                        backdrop-blur backdrop-opacity-90 border-gray-100
                        sm:h-16 sm:w-16
                    '
                    onClick={toggleWishlisted}
                >
                    {
                        book.wishlisted ? <HeartIcon /> : <OutlinedHeart className='iconColorWhite' />
                    }
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
