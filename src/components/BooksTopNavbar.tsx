import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/types';
import logo from '../assets/svg/logo.svg';
import { ReactComponent as WishlistIcon } from '../assets/svg/heart.svg';
import { SearchElement, Dropdown } from './';
import { useTranslation } from 'react-i18next';
import { setShowWishlist } from '../store/actions';


const BooksTopNavbar: React.FC = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const showWishlist = useSelector((state: RootState) => state.showWishlist);
    const dispatch = useDispatch();

    const toggleShowWishlist = () => {
        dispatch(setShowWishlist(!showWishlist));
    }

    return (
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-lg px-8 py-2 h-36 sm:h-20">
            <div className="flex flex-row items-center justify-between sm:justify-center order-1 mt-4 mb-2 sm:mt-0 sm:mb-0">
                <img src={logo} alt="Company logo" className="w-32 object-contain" />
                <div className="inline-flex sm:hidden -mr-6">
                    <div className="flex items-center sm:mr-4">
                        <div className='mr-2' onClick={toggleShowWishlist}>
                            <WishlistIcon className="iconColorSecondary" width={24} height={24} />
                        </div>
                        <div className="text-gray-700 hidden sm:block font-medium">{t("BookPage.myWishList")}</div>
                    </div>

                    <Dropdown />
                </div>
            </div>
            <div className='order-3 w-full sm:w-[600px] sm:order-2'>
                <SearchElement placeholder={`${t("BookPage.searchText")}`} />
            </div>
            <div className="hidden sm:flex items-center order-2 sm:order-3 self-end sm:self-center">
                <div className="flex items-center sm:mr-4 cursor-pointer" onClick={toggleShowWishlist}>
                    <div className='mr-2'>
                    <WishlistIcon className="iconColorSecondary" width={24} height={24} />
                </div>
                <div className="text-gray-700 hidden sm:block font-medium">{t("BookPage.myWishList")}</div>
                </div>
                <Dropdown />
            </div>
        </nav>
    );
};

export default BooksTopNavbar;
