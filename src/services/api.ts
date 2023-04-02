import axios, { AxiosResponse } from 'axios';

const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/users/login`;

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
