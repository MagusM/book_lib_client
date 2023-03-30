import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/types';
import logo from '../assets/svg/logo.svg';
import { ReactComponent as WishlistIcon } from '../assets/svg/heart.svg';
import avatar from '../assets/svg/avatar.svg';
import { SearchElement, Dropdown } from './';
import { useTranslation } from 'react-i18next';
import { MenuItem } from './Dropdown';
import { UserIcon, LogoutIcon } from '@heroicons/react/outline';

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
                
                <Dropdown user={user} />
            </div>
        </nav>
    );
};

export default BooksTopNavbar;
