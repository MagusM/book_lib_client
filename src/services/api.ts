import { AxiosResponse, AxiosError } from "axios";
import { axiosInstance as axios } from "../hooks/useAxios";
import Book from "../types/book";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
const LOGIN_URL = `${SERVER_BASE_URL}/users/login`;
const GET_BOOKS_URL = `${SERVER_BASE_URL}/books`;

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const login = async (name: string): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await axios.post(LOGIN_URL, {
      name,
    });
    const { data } = response.data;
    if (!data.token || !data.user) {
      throw new Error("Login failed: data or user are empty");
    }
    return { ...data };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Login Error:", error);
    }
    throw error;
  }
};

export const getAllBooks = async ({
  ...params
}: {
  q?: string;
  page?: number;
  pageSize?: number;
  userId: string;
}): Promise<{ data: Book[] } | undefined> => {
  try {
    const response = await axios.get(GET_BOOKS_URL, {
      params: {
        q: params.q ? params.q : "all",
        page: params.page ? params.page : 1,
        pageSize: params.pageSize ? params.pageSize : 20,
        userId: params.userId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Get Books Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Get Books Error:", error);
    }
  }
};

export const addBookToWishlist = async ({
  books,
  userId,
}: {
  books: Book[];
  userId: string;
}) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/wishlist/${userId}`,
      { books },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Add to Wishlist Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Add to Wishlist Error:", error);
    }
  }
};

export const deleteFromWishlist = async ({
  bookId,
  userId,
}: {
  bookId: string;
  userId: string;
}) => {
  try {
    const response = await axios.delete(
      `${SERVER_BASE_URL}/wishlist/${userId}/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Delete from Wishlist Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Delete from Wishlist Error:", error);
    }
  }
};

export const fetchWishlistedBooks = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/wishlist/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Fetch Wishlisted Books Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Fetch Wishlisted Books Error:", error);
    }
  }
};
