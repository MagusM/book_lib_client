import { BookInterface } from "../types";
import { User } from "./types";

export type Action = {
    type: string;
    payload: any
}

export const setUser = (user: User | null): Action => ({
    type: 'SET_USER',
    payload: user
});

export const addToWishlist = (book: BookInterface): Action => ({
    type: 'ADD_TO_WISHLIST',
    payload: [book]
});

export const syncWishlist = (books: BookInterface[]): Action => ({
    type: 'SYNC_WISHLIST',
    payload: books
});

export const removeFromWishlist = (bookId: string): Action => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: bookId
});

export const resetStore = (): Action => ({
    type: 'RESET_STORE',
    payload: {}
});

export const searchBooks = (search: string): Action => ({
    type: 'SEARCH_BOOKS',
    payload: search
})

export const setShowWishlist = (showWishlist: boolean): Action => ({
    type: 'SET_SHOW_WISHLIST',
    payload: showWishlist
});

