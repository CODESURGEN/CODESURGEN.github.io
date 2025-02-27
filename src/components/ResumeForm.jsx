import React from 'react';

const ResumeForm = ({ formData, handleChange, handleSubmit, loading, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
            <span className="text-xs text-gray-500 ml-1">(Describe yourself professionally in a few sentences)</span>
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-24 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Work Experience
            <span className="text-xs text-gray-500 ml-1">(List your work history with companies, roles, dates, and responsibilities)</span>
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-32 focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Example: Marketing Manager at ABC Company (2018-2022): Led digital marketing campaigns, managed a team of 5, increased conversions by 25%..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Education
            <span className="text-xs text-gray-500 ml-1">(List your degrees, schools, and years)</span>
          </label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-24 focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Example: Bachelor of Science in Computer Science, University of California, 2015-2019"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Skills
            <span className="text-xs text-gray-500 ml-1">(List your technical and soft skills)</span>
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="border rounded-md p-2 w-full h-24 focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Example: JavaScript, React, Project Management, Team Leadership, Public Speaking"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resume Type
          </label>
          <select
            name="resumeType"
            value={formData.resumeType}
            onChange={handleChange}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a resume type</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="academic">Academic</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 font-medium"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Resume"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;