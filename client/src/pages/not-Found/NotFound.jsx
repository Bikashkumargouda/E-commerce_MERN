
import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      {/* 404 Content */}
      <div className="text-center mt-16">
        <h2 className="text-6xl font-extrabold text-gray-700">Oops!</h2>
        <h1 className="text-7xl font-bold text-blue-800 animate-pulse">404</h1>
        <p className="text-xl mt-4 font-semibold">
          We sincerely apologize
        </p>
        <p className="text-lg mt-2">
          This page might not exist or has been moved.
        </p>

        {/* Robot SVG / Image */}
        <div className="mt-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3772/3772096.png"
            alt="404 Robot"
            className="w-60 mx-auto opacity-90"
          />
        </div>

        {/* Return to Home Button */}

        <Link to="/" className="mt-6 mb-5 inline-block bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-800 transition-all">
          Return to Home
        </Link>


      </div>
    </div>
  );
};


export default NotFound