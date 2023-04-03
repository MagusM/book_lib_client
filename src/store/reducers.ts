import { RootState } from "./types";
import { Action } from "./actions";
import Book from "../types/book";

const initialState: RootState = {
    user: null,
    wishlist: [],
    search: '',
    showWishlist: false
};


const userReducer = (state=initialState, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
            case 'SYNC_WISHLIST':
            case 'ADD_TO_WISHLIST':
            {
                if (!action.payload) {
                    return state;
                }
                return {
                    ...state,
                    wishlist: [...state.wishlist, ...action.payload].filter(Boolean)
                }
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter((book: Book) => book.id !== action.payload)
            }
        case 'SEARCH_BOOKS':
            return {
                ...state,
                search: action.payload
            }
        case 'SET_SHOW_WISHLIST':
            return {
                ...state,
                showWishlist: action.payload
            }
        case 'RESET_STORE': 
            return {
                user: null,
                wishlist: [],
                search: '',
                showWishlist: false
            }
        default:
            return state;
    }
};

const rootReducer = (state = initialState, action: Action) => {
    return userReducer(state, action);
};

export default rootReducer;