export interface User {
    id: number;
    name: string;    
}

export interface RootState {
    user: {
        user: User | null;
        wishlist: number[];
    }
}