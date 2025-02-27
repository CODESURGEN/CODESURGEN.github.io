// Color schemes available to users
export const colorSchemes = {
  blue: {
    name: "Blue",
    primary: '#2563EB',      // blue-600
    secondary: '#4B5563',    // gray-600
    heading: '#1F2937',      // gray-800
    text: '#374151',         // gray-700
    accent: '#E5E7EB',       // gray-200
  },
  purple: {
    name: "Purple",
    primary: '#8B5CF6',      // purple-500
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#E5E7EB',       // gray-200
  },
  pink: {
    name: "Pink",
    primary: '#EC4899',      // pink-500
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#F9FAFB',       // gray-50
  },
  teal: {
    name: "Teal",
    primary: '#0D9488',      // teal-600
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#F9FAFB',       // gray-50
  },
  green: {
    name: "Green",
    primary: '#059669',      // green-600
    secondary: '#6B7280',    // gray-500 
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#F9FAFB',       // gray-50
  },
  amber: {
    name: "Amber",
    primary: '#D97706',      // amber-600
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#F9FAFB',       // gray-50
  },
  gray: {
    name: "Gray",
    primary: '#4B5563',      // gray-600
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#374151',         // gray-700
    accent: '#F3F4F6',       // gray-100
  },
  black: {
    name: "Black",
    primary: '#111827',      // gray-900
    secondary: '#6B7280',    // gray-500
    heading: '#111827',      // gray-900
    text: '#4B5563',         // gray-600
    accent: '#F3F4F6',       // gray-100
  }
};

// Resume style templates with different layouts and designs
const resumeStyles = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional centered header with clean sections",
    layout: "standard",
    headerAlignment: "center",
    headerStyle: "simple",
    sectionStyle: "underline",
    fonts: {
      nameSize: 24,
      headingSize: 16,
      textSize: 10,
    }
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Two-column layout with sidebar for contact information",
    layout: "split",
    headerAlignment: "left",
    headerStyle: "bold",
    sectionStyle: "box",
    fonts: {
      nameSize: 26,
      headingSize: 16,
      textSize: 10,
    }
  },
  compact: {
    id: "compact",
    name: "Compact",
    description: "Maximizes space to fit more content with minimal spacing",
    layout: "compact",
    headerAlignment: "left",
    headerStyle: "minimal",
    sectionStyle: "tight",
    fonts: {
      nameSize: 22,
      headingSize: 14,
      textSize: 9,
    }
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Prominent header with elegant spacing for leadership roles",
    layout: "standard",
    headerAlignment: "center",
    headerStyle: "large",
    sectionStyle: "elegant",
    fonts: {
      nameSize: 28,
      headingSize: 18,
      textSize: 10,
    }
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Modern asymmetric layout with visual accents",
    layout: "asymmetric",
    headerAlignment: "left",
    headerStyle: "creative",
    sectionStyle: "modern",
    fonts: {
      nameSize: 26,
      headingSize: 18,
      textSize: 10,
    }
  }
};

export default resumeStyles;