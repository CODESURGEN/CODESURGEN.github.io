import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import resumeStyles, { colorSchemes } from './ResumeStyles';

// Register fonts (you can add custom fonts if needed)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' },
  ]
});

// Extract sections from resume content
const extractSections = (content) => {
  if (!content) return { summary: '', experience: '', education: '', skills: '', other: '' };
  
  // Use regex patterns to find common section headers
  const sections = {
    summary: '',
    experience: '',
    education: '',
    skills: '',
    other: '' // Catch-all for other content
  };
  
  // Try to extract sections based on common markdown headers
  const lines = content.split('\n');
  let currentSection = 'other';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();
    
    // Check if this is a header line
    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
      // Determine which section this is
      if (/summary|profile|about/i.test(lowerLine)) {
        currentSection = 'summary';
        continue;
      } else if (/experience|work|employment|career/i.test(lowerLine)) {
        currentSection = 'experience';
        continue;
      } else if (/education|degree|academic|university|college/i.test(lowerLine)) {
        currentSection = 'education';
        continue;
      } else if (/skills|abilities|proficiencies|competencies/i.test(lowerLine)) {
        currentSection = 'skills';
        continue;
      }
    }
    
    // Add content to current section
    sections[currentSection] += line + '\n';
  }
  
  // Trim whitespace from all sections
  Object.keys(sections).forEach(key => {
    sections[key] = sections[key].trim();
  });
  
  return sections;
};

// Create dynamic styles based on template and color
const createStyles = (templateName, colorName) => {
  const template = resumeStyles[templateName] || resumeStyles.classic;
  const colorScheme = colorSchemes[colorName] || colorSchemes.blue;
  const { fonts } = template;
  
  return StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: template.layout === 'compact' ? 20 : 30,
      fontFamily: 'Roboto',
    },
    
    // Standard header (centered)
    standardHeader: {
      marginBottom: 20,
      alignItems: template.headerAlignment === 'center' ? 'center' : 'flex-start',
    },
    
    // Two-column layout containers
    container: {
      flexDirection: 'row',
    },
    mainColumn: {
      flex: 3,
      paddingRight: template.layout === 'split' ? 15 : 0,
    },
    sideColumn: {
      flex: 1,
      backgroundColor: template.layout === 'split' ? '#F9FAFB' : 'transparent',
      padding: template.layout === 'split' ? 10 : 0,
      borderLeft: template.layout === 'split' ? 1 : 0,
      borderColor: '#E5E7EB',
    },
    
    // Asymmetric layout (creative template)
    asymmetricHeader: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    asymmetricNameContainer: {
      flex: 2,
    },
    asymmetricContactContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    
    // Dynamic name styles based on template
    name: {
      fontSize: template.headerStyle === 'large' ? fonts.nameSize + 4 : fonts.nameSize,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: template.headerAlignment === 'center' ? 'center' : 'left',
      color: colorScheme.primary,
      ...(template.headerStyle === 'creative' && {
        paddingBottom: 5,
        borderBottom: 2,
        borderColor: colorScheme.primary,
      }),
    },
    
    jobTitle: {
      fontSize: template.headerStyle === 'large' ? fonts.headingSize + 2 : fonts.headingSize,
      marginBottom: template.headerStyle === 'minimal' ? 5 : 10,
      textAlign: template.headerAlignment === 'center' ? 'center' : 'left',
      color: colorScheme.secondary,
    },
    
    // Contact information styles
    contactInfo: {
      flexDirection: template.headerAlignment === 'center' ? 'row' : 'column',
      justifyContent: 'center',
      marginBottom: 15,
      flexWrap: 'wrap',
      ...(template.layout === 'compact' && {
        marginBottom: 10,
      }),
    },
    
    contactText: {
      fontSize: fonts.textSize,
      marginHorizontal: template.headerAlignment === 'center' ? 10 : 0,
      marginBottom: template.headerAlignment === 'center' ? 0 : 3,
      color: colorScheme.secondary,
    },
    
    // Section styles
    section: {
      marginBottom: template.layout === 'compact' ? 8 : 15,
    },
    
    sectionTitle: {
      fontSize: fonts.headingSize - 2,
      fontWeight: 'bold',
      marginBottom: template.layout === 'compact' ? 3 : 6,
      color: colorScheme.heading,
      ...(template.sectionStyle === 'underline' && {
        borderBottomWidth: 1,
        borderBottomColor: colorScheme.accent,
        paddingBottom: 2,
      }),
      ...(template.sectionStyle === 'box' && {
        backgroundColor: colorScheme.accent,
        padding: 4,
        borderRadius: 2,
      }),
      ...(template.sectionStyle === 'elegant' && {
        borderLeftWidth: 3,
        borderLeftColor: colorScheme.primary,
        paddingLeft: 5,
      }),
      ...(template.sectionStyle === 'modern' && {
        color: colorScheme.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }),
    },
    
    sectionContent: {
      fontSize: fonts.textSize,
      lineHeight: 1.5,
      color: colorScheme.text,
      ...(template.layout === 'compact' && {
        lineHeight: 1.4,
      }),
    },
    
    // Bullet and list styles
    bullet: {
      width: 3,
      height: 3,
      backgroundColor: colorScheme.secondary,
      borderRadius: 2,
      marginRight: 6,
      marginTop: 6,
    },
    
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 3,
      paddingLeft: 6,
    },
    
    bulletText: {
      flex: 1,
      fontSize: fonts.textSize,
      lineHeight: 1.5,
    },
    
    // Text formats for parsed content
    h1: {
      fontSize: fonts.headingSize + 2,
      fontWeight: 'bold',
      marginVertical: template.layout === 'compact' ? 6 : 10,
      color: colorScheme.heading,
    },
    
    h2: {
      fontSize: fonts.headingSize,
      fontWeight: 'bold',
      marginVertical: template.layout === 'compact' ? 4 : 8,
      color: colorScheme.heading,
    },
    
    h3: {
      fontSize: fonts.headingSize - 2,
      fontWeight: 'bold',
      marginVertical: template.layout === 'compact' ? 3 : 6,
      color: colorScheme.heading,
    },
    
    paragraph: {
      fontSize: fonts.textSize,
      marginBottom: template.layout === 'compact' ? 2 : 4,
      lineHeight: template.layout === 'compact' ? 1.3 : 1.5,
      color: colorScheme.text,
    },
    
    listItem: {
      fontSize: fonts.textSize,
      lineHeight: 1.5,
      marginLeft: 10,
      marginBottom: template.layout === 'compact' ? 1 : 2,
      color: colorScheme.text,
    },
    
    bold: {
      fontWeight: 'bold',
    },
    
    italic: {
      fontStyle: 'italic',
    },
    
    content: {
      paddingHorizontal: 0,
      marginBottom: 20,
    },
    
    // Creative template accent bar
    accentBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 15,
      height: '100%',
      backgroundColor: colorScheme.primary,
    },
    
    // For exec template divider
    divider: {
      height: 1,
      backgroundColor: colorScheme.accent,
      marginVertical: 10,
    },
  });
};

// Simplified markdown parser and renderer for PDF
const PDFContent = ({ content, styles }) => {
  if (!content) return null;

  // Split content into lines for processing
  const lines = content.split('\n');
  const elements = [];
  
  let inList = false;
  
  lines.forEach((line, index) => {
    // Empty line
    if (line.trim() === '') {
      return;
    }
    
    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={`h1-${index}`} style={styles.h1}>
          {line.substring(2)}
        </Text>
      );
      return;
    }
    
    if (line.startsWith('## ')) {
      elements.push(
        <Text key={`h2-${index}`} style={styles.h2}>
          {line.substring(3)}
        </Text>
      );
      return;
    }
    
    if (line.startsWith('### ')) {
      elements.push(
        <Text key={`h3-${index}`} style={styles.h3}>
          {line.substring(4)}
        </Text>
      );
      return;
    }
    
    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <View key={`list-${index}`} style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 5, color: styles.listItem.color }}>•</Text>
          <Text style={styles.listItem}>{line.trim().substring(2)}</Text>
        </View>
      );
      inList = true;
      return;
    }
    
    // Handle numbered lists
    const numberedListMatch = line.trim().match(/^\d+\.\s+(.*)/);
    if (numberedListMatch) {
      elements.push(
        <View key={`numlist-${index}`} style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 5, color: styles.listItem.color }}>{line.trim().split('.')[0]}.</Text>
          <Text style={styles.listItem}>{numberedListMatch[1]}</Text>
        </View>
      );
      inList = true;
      return;
    }
    
    // Regular paragraphs
    if (inList && !line.trim().startsWith('-') && !line.trim().startsWith('*') && !numberedListMatch) {
      inList = false;
    }
    
    // Basic Markdown processing for bold and italic
    let processedLine = line;
    
    // Handle bold (using both ** and __ syntax)
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<b>${p1}</b>`);
    processedLine = processedLine.replace(/__(.*?)__/g, (match, p1) => `<b>${p1}</b>`);
    
    // Handle italic (using both * and _ syntax)
    processedLine = processedLine.replace(/\*(.*?)\*/g, (match, p1) => `<i>${p1}</i>`);
    processedLine = processedLine.replace(/_(.*?)_/g, (match, p1) => `<i>${p1}</i>`);
    
    // Split the processed line into segments based on markdown formatting
    const segments = [];
    let currentText = '';
    let currentIndex = 0;
    
    while (currentIndex < processedLine.length) {
      const boldStart = processedLine.indexOf('<b>', currentIndex);
      const italicStart = processedLine.indexOf('<i>', currentIndex);
      
      let nextMarkdownIndex = -1;
      let markdownType = null;
      
      if (boldStart !== -1 && (italicStart === -1 || boldStart < italicStart)) {
        nextMarkdownIndex = boldStart;
        markdownType = 'bold';
      } else if (italicStart !== -1) {
        nextMarkdownIndex = italicStart;
        markdownType = 'italic';
      }
      
      if (nextMarkdownIndex === -1) {
        // No more markdown, add remaining text
        currentText += processedLine.substring(currentIndex);
        currentIndex = processedLine.length;
      } else {
        // Add text before markdown
        if (nextMarkdownIndex > currentIndex) {
          currentText += processedLine.substring(currentIndex, nextMarkdownIndex);
        }
        
        if (markdownType === 'bold') {
          const boldEnd = processedLine.indexOf('</b>', nextMarkdownIndex);
          if (boldEnd !== -1) {
            if (currentText) {
              segments.push({ text: currentText, style: null });
              currentText = '';
            }
            segments.push({
              text: processedLine.substring(nextMarkdownIndex + 3, boldEnd),
              style: 'bold'
            });
            currentIndex = boldEnd + 4;
          } else {
            currentText += processedLine.substring(nextMarkdownIndex);
            currentIndex = processedLine.length;
          }
        } else if (markdownType === 'italic') {
          const italicEnd = processedLine.indexOf('</i>', nextMarkdownIndex);
          if (italicEnd !== -1) {
            if (currentText) {
              segments.push({ text: currentText, style: null });
              currentText = '';
            }
            segments.push({
              text: processedLine.substring(nextMarkdownIndex + 3, italicEnd),
              style: 'italic'
            });
            currentIndex = italicEnd + 4;
          } else {
            currentText += processedLine.substring(nextMarkdownIndex);
            currentIndex = processedLine.length;
          }
        }
      }
    }
    
    if (currentText) {
      segments.push({ text: currentText, style: null });
    }
    
    // Create a paragraph with properly styled text segments
    elements.push(
      <Text key={`p-${index}`} style={styles.paragraph}>
        {segments.map((segment, segIndex) => {
          if (segment.style === 'bold') {
            return <Text key={`seg-${segIndex}`} style={styles.bold}>{segment.text}</Text>;
          } else if (segment.style === 'italic') {
            return <Text key={`seg-${segIndex}`} style={styles.italic}>{segment.text}</Text>;
          } else {
            return <Text key={`seg-${segIndex}`}>{segment.text}</Text>;
          }
        })}
      </Text>
    );
  });
  
  return <View style={styles.content}>{elements}</View>;
};

// Render section with title
const Section = ({ title, content, styles }) => {
  if (!content || content.trim() === '') return null;
  
  return (
    <View style={styles.section}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <PDFContent content={content} styles={styles} />
    </View>
  );
};

// Classic Template Layout
const ClassicTemplate = ({ resumeData, resumeContent, styles, sections }) => (
  <Page size="A4" style={styles.page}>
    {/* Header with contact information */}
    <View style={styles.standardHeader}>
      <Text style={styles.name}>{resumeData.name}</Text>
      {resumeData.jobTitle && <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>}
      
      <View style={styles.contactInfo}>
        {resumeData.email && <Text style={styles.contactText}>{resumeData.email}</Text>}
        {resumeData.phone && <Text style={styles.contactText}>{resumeData.phone}</Text>}
        {resumeData.location && <Text style={styles.contactText}>{resumeData.location}</Text>}
      </View>
    </View>
    
    {/* Resume content by sections */}
    <Section title="Professional Summary" content={sections.summary} styles={styles} />
    <Section title="Experience" content={sections.experience} styles={styles} />
    <Section title="Education" content={sections.education} styles={styles} />
    <Section title="Skills" content={sections.skills} styles={styles} />
    {sections.other && <PDFContent content={sections.other} styles={styles} />}
  </Page>
);

// Modern Template with Two Columns
const ModernTemplate = ({ resumeData, resumeContent, styles, sections }) => (
  <Page size="A4" style={styles.page}>
    {/* Header with contact information */}
    <View style={styles.standardHeader}>
      <Text style={styles.name}>{resumeData.name}</Text>
      {resumeData.jobTitle && <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>}
    </View>
    
    {/* Two column layout */}
    <View style={styles.container}>
      {/* Main content column */}
      <View style={styles.mainColumn}>
        <Section title="Professional Summary" content={sections.summary} styles={styles} />
        <Section title="Experience" content={sections.experience} styles={styles} />
        <Section title="Education" content={sections.education} styles={styles} />
      </View>
      
      {/* Sidebar column */}
      <View style={styles.sideColumn}>
        {/* Contact information in sidebar */}
        <Section title="Contact" content={
          `Email: ${resumeData.email}\nPhone: ${resumeData.phone}\nLocation: ${resumeData.location}`
        } styles={styles} />
        
        <Section title="Skills" content={sections.skills} styles={styles} />
        {sections.other && <PDFContent content={sections.other} styles={styles} />}
      </View>
    </View>
  </Page>
);

// Compact Template
const CompactTemplate = ({ resumeData, resumeContent, styles, sections }) => (
  <Page size="A4" style={styles.page}>
    {/* Compact header */}
    <View style={{ ...styles.standardHeader, marginBottom: 10 }}>
      <Text style={styles.name}>{resumeData.name}</Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {resumeData.jobTitle && <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>}
        
        <View style={{ flexDirection: 'row' }}>
          {resumeData.email && <Text style={{ ...styles.contactText, marginRight: 10 }}>{resumeData.email}</Text>}
          {resumeData.phone && <Text style={{ ...styles.contactText, marginRight: 10 }}>{resumeData.phone}</Text>}
          {resumeData.location && <Text style={styles.contactText}>{resumeData.location}</Text>}
        </View>
      </View>
    </View>
    
    {/* Compact sections with less spacing */}
    <Section title="Summary" content={sections.summary} styles={styles} />
    <Section title="Experience" content={sections.experience} styles={styles} />
    <Section title="Education" content={sections.education} styles={styles} />
    <Section title="Skills" content={sections.skills} styles={styles} />
    {sections.other && <PDFContent content={sections.other} styles={styles} />}
  </Page>
);

// Executive Template
const ExecutiveTemplate = ({ resumeData, resumeContent, styles, sections }) => (
  <Page size="A4" style={styles.page}>
    {/* Prominent header */}
    <View style={styles.standardHeader}>
      <Text style={styles.name}>{resumeData.name}</Text>
      {resumeData.jobTitle && <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>}
      
      <View style={styles.contactInfo}>
        {resumeData.email && <Text style={styles.contactText}>{resumeData.email}</Text>}
        {resumeData.phone && <Text style={styles.contactText}>{resumeData.phone}</Text>}
        {resumeData.location && <Text style={styles.contactText}>{resumeData.location}</Text>}
      </View>
      
      <View style={styles.divider} />
    </View>
    
    {/* Elegant section formatting */}
    <Section title="Executive Profile" content={sections.summary} styles={styles} />
    <Section title="Professional Experience" content={sections.experience} styles={styles} />
    <Section title="Education & Credentials" content={sections.education} styles={styles} />
    <Section title="Areas of Expertise" content={sections.skills} styles={styles} />
    {sections.other && <PDFContent content={sections.other} styles={styles} />}
  </Page>
);

// Creative Template
const CreativeTemplate = ({ resumeData, resumeContent, styles, sections }) => (
  <Page size="A4" style={styles.page}>
    {/* Accent bar on the left side */}
    <View style={styles.accentBar} />
    
    {/* Asymmetric header layout */}
    <View style={{ ...styles.asymmetricHeader, paddingLeft: 20 }}>
      <View style={styles.asymmetricNameContainer}>
        <Text style={styles.name}>{resumeData.name}</Text>
        {resumeData.jobTitle && <Text style={styles.jobTitle}>{resumeData.jobTitle}</Text>}
      </View>
      
      <View style={styles.asymmetricContactContainer}>
        {resumeData.email && <Text style={styles.contactText}>{resumeData.email}</Text>}
        {resumeData.phone && <Text style={styles.contactText}>{resumeData.phone}</Text>}
        {resumeData.location && <Text style={styles.contactText}>{resumeData.location}</Text>}
      </View>
    </View>
    
    {/* Content with left padding to account for accent bar */}
    <View style={{ paddingLeft: 20 }}>
      <Section title="About Me" content={sections.summary} styles={styles} />
      <Section title="Experience" content={sections.experience} styles={styles} />
      <Section title="Education" content={sections.education} styles={styles} />
      <Section title="Skills & Expertise" content={sections.skills} styles={styles} />
      {sections.other && <PDFContent content={sections.other} styles={styles} />}
    </View>
  </Page>
);

// Main component to choose the right template
const ResumePDF = ({ resumeData, resumeContent, template = 'classic', colorScheme = 'blue' }) => {
  // Extract sections from the content
  const sections = extractSections(resumeContent);
  
  // Create styles based on the template and color scheme
  const styles = createStyles(template, colorScheme);
  
  // Render the appropriate template
  return (
    <Document>
      {template === 'modern' ? (
        <ModernTemplate 
          resumeData={resumeData} 
          resumeContent={resumeContent} 
          styles={styles} 
          sections={sections} 
        />
      ) : template === 'compact' ? (
        <CompactTemplate 
          resumeData={resumeData} 
          resumeContent={resumeContent} 
          styles={styles} 
          sections={sections} 
        />
      ) : template === 'executive' ? (
        <ExecutiveTemplate 
          resumeData={resumeData} 
          resumeContent={resumeContent} 
          styles={styles} 
          sections={sections} 
        />
      ) : template === 'creative' ? (
        <CreativeTemplate 
          resumeData={resumeData} 
          resumeContent={resumeContent} 
          styles={styles} 
          sections={sections} 
        />
      ) : (
        <ClassicTemplate 
          resumeData={resumeData} 
          resumeContent={resumeContent} 
          styles={styles} 
          sections={sections} 
        />
      )}
    </Document>
  );
};

export default ResumePDF;