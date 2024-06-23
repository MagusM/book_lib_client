import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../assets/svg/search-filled.svg";
import { searchBooks } from "../store/actions";
import debounce from "../utils/debounce";

interface Props {
  placeholder: string;
}

const SearchElement: React.FC<Props> = ({ placeholder }) => {
  const searchInputRef = useRef<string>("");
  const dispatch = useDispatch();

  const handleSearchChangedDebounced = useRef(
    debounce((value: string) => {
      searchInputRef.current = value;
      dispatch(searchBooks(searchInputRef.current));
    }, 500)
  ).current;

  useEffect(() => {
    handleSearchChangedDebounced(searchInputRef.current);
  }, [handleSearchChangedDebounced]);

  return (
    <div className="relative text-tertiary">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full text-secondary focus:border-[blue]"
        type="search"
        name="search"
        placeholder={placeholder}
        onInput={(e) =>
          handleSearchChangedDebounced((e.target as HTMLInputElement).value)
        }
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <img src={SearchIcon} className="h-5 w-5" alt="" />
      </button>
    </div>
  );
};

export default SearchElement;
