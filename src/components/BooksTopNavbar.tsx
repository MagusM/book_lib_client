import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/types';
import logo from '../assets/svg/logo.svg';
// import wishlistIcon from '../assets/svg/heart.svg';
import { ReactComponent as WishlistIcon } from '../assets/svg/heart.svg';
import avatar from '../assets/svg/avatar.svg';
import { SearchElement, Dropdown } from './';
import { useTranslation } from 'react-i18next';

const BooksTopNavbar: React.FC = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <nav className="flex items-center justify-between bg-white shadow-lg px-8 py-2 h-20">
            <div className="flex items-center">
                <img src={logo} alt="Company logo" className="w-32 object-contain" />
            </div>
            <SearchElement placeholder={`${t("BookPage.searchText")}`} />
            <div className="flex items-center">
                <Link to="/wishlist" className="flex items-center mr-4">
                    <div className='mr-2'>
                        <WishlistIcon className="iconColorSecondary" width={24} height={24} />
                    </div>
                    <div className="text-gray-700 font-medium">{t("BookPage.myWishList")}</div>
                </Link>
                {/* <div className="relative">
                    <button className="flex items-center text-gray-700 font-medium">
                        <img src={avatar} alt="User avatar" className="h-6 w-6 mr-2" />
                        {user?.name}
                        <svg
                            className="fill-current h-4 w-4 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fillRule="evenodd"
                                d="M10 0a10 10 0 100 20 10 10 0 000-20zM9 14a1 1 0 011-1h8a1 1 0 010 2h-8a1 1 0 01-1-1zm-1-4a1 1 0 011-1h10a1 1 0 010 2H9a1 1 0 01-1-1zm1-4a1 1 0 100 2h8a1 1 0 100-2h-8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg">
                        <div className="py-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Account settings
                            </a>
                            <div className="h-0 my-2 border border-solid border-gray-200" />
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Sign out
                            </a>
                        </div>
                    </div>
                </div> */}
                <Dropdown />
            </div>
        </nav>
    );
};

export default BooksTopNavbar;
