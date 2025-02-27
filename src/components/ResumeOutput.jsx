import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import ResumePreview from './ResumePreview';

const ResumeOutput = ({ resumeContent, formData }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  if (!resumeContent) return null;

  return (
    <>
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Your Generated Resume</h2>
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(resumeContent);
                  alert('Resume content copied to clipboard!');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                Copy Text
              </button>
              
              <button
                onClick={() => setShowPreview(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
                Preview & Download
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{resumeContent}</div>
          </div>
          
          <div className="mt-6 border-t pt-4 text-gray-600 text-sm">
            <p>
              <span className="font-medium">💡 Tip:</span> Click "Preview & Download" to see a formatted PDF version of your resume and choose from multiple styles.
            </p>
          </div>
        </div>
      </div>
      
      {showPreview && (
        <ResumePreview 
          resumeContent={resumeContent} 
          formData={formData} 
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default ResumeOutput;