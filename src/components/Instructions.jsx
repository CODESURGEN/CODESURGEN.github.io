import React from 'react';

const Instructions = ({ onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">How to Use ResumeGenius AI</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-bold text-lg mb-1">1. Fill in Your Information</h3>
          <p>Enter your personal details, work experience, education, and skills in the form provided.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">2. Choose a Resume Type</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Professional:</strong> Standard business resume, ideal for most corporate positions</li>
            <li><strong>Creative:</strong> More vibrant and unique, good for design, marketing, or creative roles</li>
            <li><strong>Academic:</strong> Detailed and formal, focused on education and research</li>
            <li><strong>Executive:</strong> Leadership-focused with emphasis on strategic achievements</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">3. Format Your Work Experience</h3>
          <p>For best results, include for each position:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Company name and your title</li>
            <li>Dates of employment</li>
            <li>Key responsibilities</li>
            <li>Notable achievements with metrics when possible</li>
          </ul>
          <p className="mt-2 italic text-sm">Example: "Marketing Manager at ABC Company (2018-2022): Led digital marketing team of 5, increased conversion rates by 25%, managed $500K annual budget"</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">4. API Key Setup</h3>
          <p>ResumeGenius AI uses OpenAI's GPT-4 to generate resumes. You'll need to:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Create an account at <a href="https://openai.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI.com</a></li>
            <li>Generate an API key in your OpenAI account dashboard</li>
            <li>Create a <code className="bg-gray-100 px-1 py-0.5 rounded">.env</code> file based on the provided <code className="bg-gray-100 px-1 py-0.5 rounded">.env.example</code></li>
            <li>Add your API key to the <code className="bg-gray-100 px-1 py-0.5 rounded">.env</code> file</li>
          </ol>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 text-sm"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Instructions;