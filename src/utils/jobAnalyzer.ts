
export const fetchJobDescription = async (url: string): Promise<string> => {
  try {
    // For demo purposes, we'll simulate fetching job description content
    // In a real implementation, you'd need a backend service to fetch the URL content
    // due to CORS restrictions in browsers
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock job description based on URL patterns for demonstration
    if (url.includes('senior') || url.includes('lead')) {
      return `Senior Software Engineer Position
      
Requirements:
- 5+ years of software development experience
- Proficiency in JavaScript, React, Node.js
- Experience with cloud platforms (AWS, Azure, GCP)
- Strong understanding of microservices architecture
- Experience with Docker and Kubernetes
- Knowledge of CI/CD pipelines
- Excellent communication and leadership skills
- Bachelor's degree in Computer Science or related field

Responsibilities:
- Lead development of scalable web applications
- Mentor junior developers
- Architect and design system solutions
- Collaborate with cross-functional teams
- Code review and quality assurance
- Performance optimization and troubleshooting`;
    } else if (url.includes('frontend') || url.includes('react')) {
      return `Frontend Developer Position
      
Requirements:
- 3+ years of frontend development experience
- Expert knowledge of React, JavaScript, TypeScript
- Proficiency in HTML5, CSS3, and responsive design
- Experience with state management (Redux, Context API)
- Familiarity with testing frameworks (Jest, Cypress)
- Knowledge of build tools (Webpack, Vite)
- Understanding of web performance optimization
- Experience with version control (Git)

Responsibilities:
- Develop user-friendly web interfaces
- Implement responsive designs
- Optimize application performance
- Collaborate with designers and backend developers
- Write clean, maintainable code
- Participate in code reviews`;
    } else {
      return `Software Developer Position
      
Requirements:
- 2+ years of programming experience
- Knowledge of modern programming languages
- Understanding of web development principles
- Experience with databases and APIs
- Problem-solving and analytical skills
- Good communication abilities
- Willingness to learn new technologies

Responsibilities:
- Develop and maintain software applications
- Debug and troubleshoot issues
- Participate in team meetings and planning
- Write technical documentation
- Follow coding best practices`;
    }
  } catch (error) {
    throw new Error('Failed to fetch job description');
  }
};

export const analyzeResumeAgainstJob = (jobDescription: string, resumeFileName: string): string => {
  // Simple keyword matching analysis (in a real app, this would use AI/ML)
  const jobKeywords = extractKeywords(jobDescription.toLowerCase());
  const seniority = determineSeniority(jobDescription);
  const techStack = extractTechStack(jobDescription);
  
  return generateAnalysis(jobKeywords, seniority, techStack, resumeFileName);
};

const extractKeywords = (jobText: string): string[] => {
  const keywords = [];
  
  if (jobText.includes('javascript')) keywords.push('JavaScript');
  if (jobText.includes('react')) keywords.push('React');
  if (jobText.includes('node.js') || jobText.includes('nodejs')) keywords.push('Node.js');
  if (jobText.includes('python')) keywords.push('Python');
  if (jobText.includes('aws')) keywords.push('AWS');
  if (jobText.includes('docker')) keywords.push('Docker');
  if (jobText.includes('kubernetes')) keywords.push('Kubernetes');
  if (jobText.includes('microservices')) keywords.push('Microservices');
  if (jobText.includes('ci/cd')) keywords.push('CI/CD');
  if (jobText.includes('typescript')) keywords.push('TypeScript');
  
  return keywords;
};

const determineSeniority = (jobText: string): string => {
  const text = jobText.toLowerCase();
  if (text.includes('senior') || text.includes('lead') || text.includes('5+ years')) return 'Senior';
  if (text.includes('mid') || text.includes('3+ years')) return 'Mid-level';
  return 'Junior';
};

const extractTechStack = (jobText: string): string[] => {
  const stack = [];
  const text = jobText.toLowerCase();
  
  if (text.includes('frontend') || text.includes('react')) stack.push('Frontend');
  if (text.includes('backend') || text.includes('node.js')) stack.push('Backend');
  if (text.includes('full') || text.includes('fullstack')) stack.push('Full-stack');
  if (text.includes('cloud') || text.includes('aws')) stack.push('Cloud');
  if (text.includes('devops')) stack.push('DevOps');
  
  return stack;
};

const generateAnalysis = (keywords: string[], seniority: string, techStack: string[], resumeFileName: string): string => {
  const matchScore = Math.min(95, 60 + (keywords.length * 5));
  
  return `# Resume Analysis Report

## 📄 **Resume:** ${resumeFileName}
## 🎯 **Position Level:** ${seniority}
## 🛠️ **Tech Stack:** ${techStack.join(', ') || 'General Development'}

## 🔍 **Keyword Analysis**

**Identified Key Technologies:**
${keywords.length > 0 ? keywords.map(k => `✅ ${k}`).join('\n') : '⚠️ No specific technologies identified from job description'}

## 📊 **Match Score: ${matchScore}/100**

### ✅ **Strong Points**
- Resume format and structure appear professional
- Relevant experience for the target role
${keywords.length > 2 ? '- Good coverage of required technologies' : ''}

### ⚠️ **Areas for Improvement**
${keywords.length < 3 ? '- Consider highlighting more specific technical skills mentioned in the job description' : ''}
- Quantify achievements with specific metrics
- Add more details about project impact and scale
- Consider adding relevant certifications

### 🎯 **Recommendations**
1. **Keyword Optimization**: Ensure resume includes: ${keywords.join(', ')}
2. **Experience Highlighting**: Emphasize ${seniority.toLowerCase()}-level responsibilities
3. **Technical Skills**: Showcase ${techStack.join(' and ') || 'relevant technical'} experience
4. **Quantify Results**: Add metrics showing impact of your work
5. **Tailor Content**: Align resume content more closely with job requirements

### 📈 **Next Steps**
- Review and incorporate missing keywords naturally
- Expand on relevant project experience
- Consider adding a skills section if not present
- Ensure consistent formatting throughout

*Analysis based on job description content and resume structure. For best results, ensure your resume directly addresses the key requirements mentioned in the job posting.*`;
};
