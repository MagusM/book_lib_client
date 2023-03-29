import React from 'react';
import logo from '../assets/svg/logo.svg';
import avatar from '../assets/svg/avatar.svg';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white">
                <div className="max-w-3xl mx-auto px-4 py-16">
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Company logo" className="h-12 w-12 mr-2" />
                        <h1 className="text-2xl font-medium text-gray-900">Company Name</h1>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's sign you in.</h2>
                    <p className="text-gray-500 mb-8">Welcome back, you've been missed!</p>
                    <form>
                        <div className="flex items-center border rounded-full py-2 px-4 mb-4">
                            <img src={avatar} alt="User icon" className="h-6 w-6 mr-2" />
                            <input type="text" placeholder="Username" className="bg-transparent outline-none flex-1" />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex-1 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url("/src/assets/images/login-bg.png")' }} />
        </div>
    );
};

export default WelcomeScreen;
