import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import resumeStyles, { colorSchemes } from './ResumeStyles';

const ResumePreview = ({ resumeContent, formData, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [activeTab, setActiveTab] = useState('layout'); // 'layout' or 'color'
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Resume Preview</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left sidebar with style options */}
          <div className="w-full md:w-64 bg-gray-50 p-4 overflow-y-auto flex flex-col">
            {/* Tabs for Layout & Color */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'layout' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setActiveTab('layout')}
              >
                Layout
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'color' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setActiveTab('color')}
              >
                Color
              </button>
            </div>
            
            {/* Layout Options */}
            {activeTab === 'layout' && (
              <div className="space-y-3 flex-grow">
                <h3 className="font-bold text-gray-700 mb-3">Choose a Layout</h3>
                
                <div className="space-y-3">
                  {Object.entries(resumeStyles).map(([key, style]) => (
                    <div 
                      key={key}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${selectedTemplate === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-100'}`}
                      onClick={() => setSelectedTemplate(key)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{style.name}</div>
                        {selectedTemplate === key && (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">{style.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Options */}
            {activeTab === 'color' && (
              <div className="space-y-3 flex-grow">
                <h3 className="font-bold text-gray-700 mb-3">Choose a Color</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(colorSchemes).map(([key, color]) => (
                    <div 
                      key={key}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${selectedColor === key ? 'border-blue-500' : 'border-gray-200 hover:bg-gray-100'}`}
                      onClick={() => setSelectedColor(key)}
                    >
                      <div 
                        className="w-full h-8 mb-2 rounded"
                        style={{ backgroundColor: color.primary }}
                      ></div>
                      <div className="text-sm font-medium text-center">{color.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <PDFDownloadLink
                document={
                  <ResumePDF 
                    resumeData={formData} 
                    resumeContent={resumeContent} 
                    template={selectedTemplate}
                    colorScheme={selectedColor}
                  />
                }
                fileName={`${formData.name.replace(/\s+/g, '_')}_resume.pdf`}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 text-sm flex items-center justify-center"
              >
                {({ loading }) => 
                  loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing PDF...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      Download PDF
                    </>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
          
          {/* Right side PDF preview */}
          <div className="flex-grow p-2 h-[60vh] md:h-auto overflow-hidden">
            <PDFViewer width="100%" height="100%" className="border rounded">
              <ResumePDF 
                resumeData={formData} 
                resumeContent={resumeContent} 
                template={selectedTemplate}
                colorScheme={selectedColor}
              />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;