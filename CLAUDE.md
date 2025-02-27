# Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

# Code Style Guidelines
- **React**: Use functional components with hooks
- **Imports**: Group imports by type (React, third-party, local)
- **Component Structure**: Define styles first, then component functions
- **State Management**: Use useState for component state
- **Error Handling**: Use try/catch with appropriate error messages
- **Forms**: Handle form validation with onChange handlers
- **API Requests**: Use axios for API requests
- **CSS**: Use Tailwind utility classes for styling
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Environment Variables**: Access via import.meta.env.VARIABLE_NAME
- **Export Style**: Use default exports for components

# Project Structure
- `/src` - Application source code
- `/public` - Static assets
- `index.html` - Entry HTML file
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration (modern flat config)