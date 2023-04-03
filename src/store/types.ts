import Book from "../types/book";

export interface User {
    id: string;
    name: string;    
}

export interface RootState {
    user: User | null;
    wishlist: Book[];
    search: string;
    showWishlist: boolean;
}