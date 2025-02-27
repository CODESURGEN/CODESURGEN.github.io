import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">ResumeGenius AI</h3>
            <p className="text-sm text-gray-300 mt-1">
              Create professional resumes in seconds with AI
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ResumeGenius AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;