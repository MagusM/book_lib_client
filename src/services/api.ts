import { AxiosResponse } from 'axios';
import { axiosInstance as axios } from '../hooks/useAxios';
import Book from '../types/book';


//server
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/users/login`;
const GET_BOOKS_URL = `${process.env.REACT_APP_SERVER_URL}/books/`;


export const login = async (name: string): Promise<string> => {
    try {
        const response: AxiosResponse<any, any> = await axios.post(LOGIN_URL, { name });
        const { data } = response.data;
        if (!data.token || !data.user) {
            throw new Error('Login failed: data or user are empty');
        }

        return {...data};
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllBooks = async ({...params}: {
    q?: string,
    page?: number,
    pageSize?: number,
    userId: string
}): Promise<{data:Book[]} | undefined> => {
    try {
        const response = await axios.get(GET_BOOKS_URL, {
            params: {
                q: params.q ? params.q : 'all',
                page: params.page ? params.page : 1,
                pageSize: params.pageSize ? params.pageSize : 20,
                userId: params.userId
            },
            headers: {
                Authorization: `Bearer: ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    } catch (error: any) {
        console.error(error.message);
        if (error.message === 'Request failed with status code 403' || 'Request failed with status code 401') {
            throw new Error('reset');
        }
    }
}

export const addBookToWishlist = async ({ books, userId}: {books: Book[], userId: string}) => {
    try {
        const response = await axios.post(`${SERVER_BASE_URL}/wishlist/${userId}`, { books }, {
            headers: {
                Authorization: `Bearer: ${localStorage.getItem('token')}`
            }});

        console.log(response);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteFromWishlist = async ({bookId, userId}: {bookId: string, userId: string}) => {
    try {
        const response = await axios.delete(`${SERVER_BASE_URL}/wishlist/${userId}/${bookId}`, {
            headers: {
                Authorization: `Bearer: ${localStorage.getItem('token')}`
            }});

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchWishlistedBooks = async ({userId}: {userId: string}) => {
    try {
        const response = await axios.get(`${SERVER_BASE_URL}/wishlist/${userId}`, {
            headers: {
                Authorization: `Bearer: ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}