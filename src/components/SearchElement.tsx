import React from 'react';
import SearchIcon from '../assets/svg/search-filled.svg';

interface Props {
    placeholder: string;
}

const SearchElement: React.FC<Props> = ({ placeholder }) => {
    return (
        <div className="relative text-gray-600">
            <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder={placeholder}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <img src={SearchIcon} className="h-5 w-5" alt="" />
            </button>
        </div>
    );
};

export default SearchElement;
