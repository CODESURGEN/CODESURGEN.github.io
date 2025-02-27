# ResumeGenius AI 📄✨

An AI-powered resume builder that generates professional resumes using OpenAI's GPT-4. Create, customize, and download your resume in PDF format.

## Features

- Generate professional resumes with AI
- Multiple resume types (Professional, Creative, Academic, Executive)
- Custom PDF generation
- Responsive design with Tailwind CSS
- Copy resume content with one click
- Download as PDF

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- An OpenAI API Key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resumegenius-ai.git
   cd resumegenius-ai
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create an environment file:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to the `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

1. Enter your personal information, work experience, education, and skills
2. Select your preferred resume type
3. Click "Generate Resume"
4. The AI will create a professional resume based on your information
5. Download the resume as a PDF or copy the text

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- OpenAI API
- React-PDF
- Axios

## License

MIT

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Acknowledgements

- OpenAI for providing the API
- React-PDF for PDF generation
- Tailwind CSS for styling
