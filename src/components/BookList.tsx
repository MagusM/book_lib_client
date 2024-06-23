import React, { useCallback, useEffect, useMemo, useState } from "react";
import BookListItem from "./BookListItem";
import { BookInterface } from "../types";
import { fetchWishlistedBooks, getAllBooks } from "../services/api";
import Book from "../types/book";
import { useDispatch, useSelector } from "react-redux";
import { syncWishlist } from "../store/actions";
import { RootState } from "../store/types";

const BooksList: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const search = useSelector((state: RootState) => state.search);
  const showWishlist = useSelector((state: RootState) => state.showWishlist);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAllBooks({
        q: "fantasy+subject:fiction",
        userId: String(user?.id),
        page: currentPage,
      });
      if (!response) return;
      const { data } = response;

      const bookList = data.map((book: Book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        description: book.description,
      }));
      setBooks(bookList);
    } catch (error) {
      console.error("error", error);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, currentPage]);

  const fetchWlistedBooks = useCallback(async () => {
    if (!user) {
      window.location.href = "/";
      return;
    }
    const data = await fetchWishlistedBooks({ userId: String(user.id) });
    if (data && data.wishlist.books) {
      dispatch(syncWishlist(data.wishlist.books));
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchWlistedBooks();
  }, [fetchWlistedBooks]);

  const filteredBooks = useMemo(() => {
    if (search === "") {
      return books;
    }
    return books.filter(
      (book: BookInterface) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, books]);

  const displayedBooks = useMemo(() => {
    if (!showWishlist) {
      return filteredBooks;
    }
    return filteredBooks.filter((book: BookInterface) =>
      wishlist.some(
        (wishlistBook: BookInterface) => wishlistBook.id === book.id
      )
    );
  }, [showWishlist, filteredBooks, wishlist]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-full h-screen justify-start items-start p-3 bg-[#F2F4F9]">
      {search && (
        <div className="text-secondary font-bold my-4 text-[14px] sm:px-[100px] lg:px-[200px]">
          {displayedBooks.length} results for &quot;{search}&quot;
        </div>
      )}
      {showWishlist && wishlist && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full sm:py-10 sm:px-[100px] lg:px-[200px] sm:gap-6 mx-auto">
          {Array.from(new Set(wishlist)).map((book: BookInterface) => (
            <BookListItem key={book.id + Math.random()} book={book} />
          ))}
        </div>
      )}
      {!showWishlist && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full sm:py-10 sm:px-[100px] lg:px-[200px] sm:gap-6 mx-auto">
            {displayedBooks.map((book: BookInterface) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </div>
          <div className="flex justify-center mt-8 w-full py-4">
            <div
              className="bg-white text-gray-700 font-bold py-2 px-4 border rounded-l-full mr-2 cursor-pointer"
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </div>
            <div className="bg-primary text-white current-page font-bold py-2 px-4 border rounded-full">
              {currentPage}
            </div>
            <div
              className="bg-white text-gray-700 font-bold py-2 px-4 border rounded-r-full ml-2 cursor-pointer"
              onClick={() => {
                paginate(currentPage + 1);
              }}
            >
              Next
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksList;
