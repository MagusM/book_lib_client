import { User } from "./types";

export type Action = {
    type: string;
    payload: any
}

export const setUser = (user: User | null): Action => ({
    type: 'SET_USER',
    payload: user
});

export const addToWishlist = (bookId: number): Action => ({
    type: 'ADD_TO_WISHLIST',
    payload: bookId
});

export const removeFromWhishlist = (bookId: number): Action => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: bookId
});

export const resetStore = (): Action => ({
    type: 'RESET_STORE',
    payload: {}
});

