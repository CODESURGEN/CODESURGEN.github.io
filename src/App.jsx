import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResumeForm from "./components/ResumeForm";
import ResumeOutput from "./components/ResumeOutput";
import Instructions from "./components/Instructions";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    resumeType: "professional",
  });
  const [resumeContent, setResumeContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Define the prompt based on resume type
      let systemPrompt = "You are an AI that generates professional resumes. ";
      
      switch(formData.resumeType) {
        case "creative":
          systemPrompt += "Create a creative and visually distinctive resume that stands out without being unprofessional. Use some personality in the language.";
          break;
        case "academic":
          systemPrompt += "Create an academic CV focusing on education, research experience, publications, and teaching experience. Be formal and detailed.";
          break;
        case "executive":
          systemPrompt += "Create an executive-level resume focusing on leadership, strategic initiatives, and major achievements. Use powerful, impactful language.";
          break;
        default: // professional
          systemPrompt += "Create a clean, professional resume that's suitable for business environments. Focus on achievements and impact.";
      }
      
      systemPrompt += " Format the resume with clear sections and professional language. Use markdown formatting for better readability.";

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Generate a ${formData.resumeType} resume with the following information:
              
              # Personal Information
              Name: ${formData.name}
              Job Title: ${formData.jobTitle}
              Email: ${formData.email}
              Phone: ${formData.phone}
              Location: ${formData.location}
              
              # Professional Summary
              ${formData.summary}
              
              # Work Experience
              ${formData.experience}
              
              # Education
              ${formData.education}
              
              # Skills
              ${formData.skills}
              
              Please make it professional, well-formatted, and highlight the key strengths and achievements. Use markdown formatting. Don't include the "Personal Information" header, just organize that at the top. Focus on achievements and measurable results in the experience section.`,
            },
          ],
          temperature: 0.7, // Add some creativity
          max_tokens: 2000, // Allow for a longer response
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      setResumeContent(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error generating resume:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid API key. Please check your OpenAI API key.");
      } else {
        setError("Error generating resume. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Resume</h2>
                <p className="text-gray-600">
                  Fill in your information below and our AI will generate a professional resume for you.
                </p>
              </div>
              <button
                onClick={() => setShowInstructions(true)}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                How It Works
              </button>
            </div>
            
            {showInstructions && (
              <Instructions onClose={() => setShowInstructions(false)} />
            )}
            
            <ResumeForm 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              loading={loading} 
              error={error} 
            />
            
            <ResumeOutput 
              resumeContent={resumeContent} 
              formData={formData} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;