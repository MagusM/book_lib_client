import { RootState } from "./types";
import { Action } from "./actions";
import Book from "../types/book";

const initialState: RootState = {
    user: {
        user: null,
        wishlist: [],
    },
};


const userReducer = (state=initialState.user, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
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
        case 'SYNC_WISHLIST':
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
        case 'RESET_STORE': 
            return {
                user: null,
                wishlist: []
            }
        default:
            return state;
    }
};

const rootReducer = (state = initialState, action: Action) => {
    return {
        user: userReducer(state.user, action),
    };
};

export default rootReducer;