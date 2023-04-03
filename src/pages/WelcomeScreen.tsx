import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import logo from '../assets/svg/logo.svg';
import avatar from '../assets/svg/avatar.svg';
import loginBg from '../assets/images/login-bg.png';
import { axiosInstance as axios } from '../hooks/useAxios';
import { setUser } from '../store/actions';
import debounce from '../utils/debounce';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const usernameRef = useRef<string>('');
    const [error, setError] = useState<string>('');

    const setUsernameDebounced = useRef(debounce((value: string) => {
        usernameRef.current = value;
    }, 500)).current;

    useEffect(() => {
        setUsernameDebounced(usernameRef.current);
    }, [setUsernameDebounced]);

    

    function validateInput() {
        let errMessage = '';
        if (usernameRef.current.length === 0) {
            errMessage = 'Username is required';
        } else if (usernameRef.current.length < 2 || usernameRef.current.length > 20) {
            errMessage = 'Username must be between 2 and 20 characters';
        }
        setError(errMessage);

        return !errMessage;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                const data = await login(usernameRef.current)
                const { user, token } = data as any;
                // Save the token to local storage
                localStorage.setItem('token', token);
                // Add the token to axios request headers
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                dispatch(setUser(user));
                navigate('/books');
            } catch (error) {
                console.error(error);
                //todo: generate error message to screen
            }
        }
    }

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex-1 bg-white">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-start">
                        <img src={logo} alt="Company logo" className="w-36 object-contain" />
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('WelcomePage.welcome')}</h2>
                    <p className="text-gray-500 mb-8">{t('WelcomePage.secondaryWelcome')}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center border rounded-full py-2 px-4 mb-4">
                            <img src={avatar} alt="User icon" className="h-6 w-6 mr-2" />
                            <input
                                type="text"
                                placeholder="Username"
                                className="bg-transparent outline-none flex-1"
                                onChange={(e) => setUsernameDebounced(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className={`bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full`}
                        >
                            Sign in
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-500 text-sm mt-1">
                            <svg className="inline-block mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 10a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {error}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex-1 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})`, width: '100%', height: '100vh' }} />
        </div>
    );
};

export default WelcomeScreen;
