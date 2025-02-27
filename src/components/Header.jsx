import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center">ResumeGenius AI</h1>
        <p className="text-blue-100 text-center mt-2">Create professional resumes powered by AI</p>
      </div>
    </header>
  );
};

export default Header;