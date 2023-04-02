import { RootState } from "./types";
import { Action } from "./actions";

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
            return {
                ...state,
                whishlist: [...state.wishlist, action.payload]
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                whishlist: state.wishlist.filter((id: number) => id !== action.payload)
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