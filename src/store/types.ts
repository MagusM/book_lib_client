import Book from "../types/book";

export interface User {
    id: string;
    name: string;    
}

export interface RootState {
    user: {
        user: User | null;
        wishlist: Book[];
    }
}