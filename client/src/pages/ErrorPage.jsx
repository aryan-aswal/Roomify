import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../assets/Error.jpg';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 bg-white">
            {/* Image Section */}
            <div className="w-full md:w-1/2 max-w-lg mb-8 md:mb-0">
                <img 
                    src={ErrorImage} 
                    alt="404 Error" 
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 max-w-lg md:pl-8 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    Oops!
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-8 text-base md:text-lg">
                    We're currently enhancing this section of our website to bring you an even better experience. Please check back soon!
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-[#1657FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 text-sm md:text-base"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage; 