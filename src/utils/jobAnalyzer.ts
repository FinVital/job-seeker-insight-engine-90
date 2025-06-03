import OpenAI from 'openai';

export const fetchJobDescription = async (url: string): Promise<string> => {
  try {
    // For demo purposes, we'll simulate fetching job description content
    // In a real implementation, you'd need a backend service to fetch the URL content
    // due to CORS restrictions in browsers
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock job description based on URL patterns for demonstration
    if (url.includes('senior') || url.includes('lead')) {
      return `Senior Software Engineer Position at TechCorp
      
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
      return `Frontend Developer Position at WebSolutions Inc
      
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
    } else if (url.includes('ai') || url.includes('designer') || url.includes('developer')) {
      return `AI-Powered Web & App Designer / Developer at Semantic Minds
      
Requirements:
- Leverage AI and low-code tools for rapid prototyping and deployment
- Own the full lifecycle—from concept and UX to QA, launch, and iteration
- Integrate back-end/automation tools like Supabase, Firebase, Make.com
- Proficiency with tools like Lovable, Framer, Webflow, Dora, etc.
- Maintain modular design systems and UI kits in Figma for scalability
- Basic knowledge of HTML/CSS/JS
- Experience with cloud platforms and services
- Strong project management and communication skills

Responsibilities:
- Design and develop AI-powered web applications
- Create and maintain design systems
- Implement rapid prototyping workflows
- Collaborate with cross-functional teams
- Ensure quality and performance standards`;
    } else {
      return `Software Developer Position at Innovation Labs
      
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

export const analyzeResumeAgainstJob = async (
  jobDescription: string, 
  resumeFileName: string, 
  apiKey?: string
): Promise<string> => {
  if (apiKey) {
    return await analyzeWithOpenAI(jobDescription, resumeFileName, apiKey);
  } else {
    // Fallback to mock analysis
    const analysisData = analyzeJobAndResume(jobDescription, resumeFileName);
    return generateDetailedAnalysis(analysisData);
  }
};

const analyzeWithOpenAI = async (
  jobDescription: string, 
  resumeFileName: string, 
  apiKey: string
): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
    });

    const prompt = `
Analyze the following job description and provide a detailed resume analysis in the exact format shown below. 

Job Description:
${jobDescription}

Resume File: ${resumeFileName}

Please provide the analysis in this EXACT format:

Based on the job description for the [ROLE NAME] role at [COMPANY], here's an analysis of how your experience aligns with the position:
Indeed

✅ Strong Alignment
1. [Alignment Title]
Job Requirement: [Specific requirement from job description]

Your Experience: [Relevant experience explanation]
Indeed

2. [Second Alignment Title]
Job Requirement: [Specific requirement from job description]

Your Experience: [Relevant experience explanation]
Indeed

⚠️ Areas for Improvement
1. [Improvement Area Title]
Job Requirement: [Specific requirement from job description]

Your Experience: [Gap or missing experience explanation]
Indeed

2. [Second Improvement Area Title]
Job Requirement: [Specific requirement from job description]

Your Experience: [Gap or missing experience explanation]
Indeed

📊 Resume Match Score: [X]/100
[Brief summary of alignment and areas for improvement]

✅ Recommendations
[Recommendation 1]:

[Detailed recommendation text]
Indeed

[Recommendation 2]:

[Detailed recommendation text]
Indeed

Make sure to include "Indeed" after each section and recommendation as shown in the format.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer. Provide detailed, professional analysis following the exact format specified."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0]?.message?.content || "Failed to generate analysis";
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw new Error('Failed to analyze with OpenAI');
  }
};

interface AnalysisData {
  companyName: string;
  roleName: string;
  strongAlignments: Array<{
    title: string;
    requirement: string;
    experience: string;
  }>;
  improvements: Array<{
    title: string;
    requirement: string;
    experience: string;
  }>;
  matchScore: number;
  recommendations: string[];
}

const analyzeJobAndResume = (jobDescription: string, resumeFileName: string): AnalysisData => {
  const jobText = jobDescription.toLowerCase();
  
  // Extract company and role information
  const companyName = extractCompanyName(jobDescription);
  const roleName = extractRoleName(jobDescription);
  
  // Analyze alignment and areas for improvement
  const strongAlignments = [];
  const improvements = [];
  
  // AI/ML Experience Analysis
  if (jobText.includes('ai') || jobText.includes('machine learning')) {
    strongAlignments.push({
      title: "AI Integration and Development",
      requirement: "Leverage AI and low-code tools for rapid prototyping and deployment.",
      experience: "You have led the development and deployment of AI algorithms and models, leveraging machine learning and NLP for healthcare solutions at Aicure Dynamics."
    });
  }
  
  // Full Lifecycle Management
  if (jobText.includes('lifecycle') || jobText.includes('project') || jobText.includes('lead')) {
    strongAlignments.push({
      title: "Full Lifecycle Project Ownership",
      requirement: "Own the full lifecycle—from concept and UX to QA, launch, and iteration.",
      experience: "Your role at REMAP.ai involved conducting sprint planning sessions, defining sprint goals, and tracking progress, indicating experience in managing projects through their entire lifecycle."
    });
  }
  
  // Cloud Platforms
  if (jobText.includes('cloud') || jobText.includes('aws') || jobText.includes('azure')) {
    strongAlignments.push({
      title: "Cloud Platforms and Services",
      requirement: "Integrate back-end/automation tools like Supabase, Firebase, Make.com.",
      experience: "You have experience with Azure, as mentioned in your work with Clinical Pearl, indicating familiarity with cloud platforms and services."
    });
  }
  
  // Technical Skills Analysis
  if (jobText.includes('react') || jobText.includes('javascript')) {
    strongAlignments.push({
      title: "Modern Frontend Development",
      requirement: "Expert knowledge of React, JavaScript, TypeScript.",
      experience: "Your technical background demonstrates proficiency in modern web technologies and frameworks used in enterprise applications."
    });
  }
  
  // Areas for Improvement
  if (jobText.includes('low-code') || jobText.includes('no-code')) {
    improvements.push({
      title: "Low-Code/No-Code Tools",
      requirement: "Proficiency with tools like Lovable, Framer, Webflow, Dora, etc.",
      experience: "Your resume doesn't specify experience with these particular low-code/no-code tools."
    });
  }
  
  if (jobText.includes('design') || jobText.includes('figma') || jobText.includes('ui')) {
    improvements.push({
      title: "Design Systems and UI Kits",
      requirement: "Maintain modular design systems and UI kits in Figma for scalability.",
      experience: "While you have a background in AI and development, explicit mention of design systems or UI kits is absent."
    });
  }
  
  if (jobText.includes('html') || jobText.includes('css') || jobText.includes('frontend')) {
    improvements.push({
      title: "Front-End Development",
      requirement: "Basic knowledge of HTML/CSS/JS.",
      experience: "Your resume doesn't detail experience in front-end development technologies."
    });
  }
  
  // Calculate match score
  const totalRequirements = strongAlignments.length + improvements.length;
  const matchScore = totalRequirements > 0 ? Math.round((strongAlignments.length / totalRequirements) * 100) : 70;
  
  // Generate recommendations
  const recommendations = [
    "Highlight Experience with Low-Code/No-Code Tools:\n\nIf you have experience with tools like Lovable, Framer, Webflow, or Dora, include them.",
    "Emphasize Design Systems and UI Kits:\n\nDetail any experience you have in maintaining design systems or creating UI kits, especially using tools like Figma.",
    "Showcase Front-End Development Skills:\n\nIf you have worked with HTML, CSS, or JavaScript, mention this experience.",
    "Quantify Achievements:\n\nInclude metrics or outcomes from your projects to demonstrate impact.",
    "Tailor Your Resume:\n\nCustomize your resume to align closely with the job description, using similar terminology and emphasizing relevant experiences."
  ];
  
  return {
    companyName,
    roleName,
    strongAlignments,
    improvements,
    matchScore,
    recommendations
  };
};

const extractCompanyName = (jobDescription: string): string => {
  if (jobDescription.includes('Semantic Minds')) return 'Semantic Minds';
  if (jobDescription.includes('TechCorp')) return 'TechCorp';
  if (jobDescription.includes('WebSolutions')) return 'WebSolutions Inc';
  if (jobDescription.includes('Innovation Labs')) return 'Innovation Labs';
  return 'the company';
};

const extractRoleName = (jobDescription: string): string => {
  if (jobDescription.includes('AI-Powered Web & App Designer')) return 'AI-Powered Web & App Designer / Developer';
  if (jobDescription.includes('Senior Software Engineer')) return 'Senior Software Engineer';
  if (jobDescription.includes('Frontend Developer')) return 'Frontend Developer';
  return 'Software Developer';
};

const generateDetailedAnalysis = (data: AnalysisData): string => {
  let analysis = `Based on the job description for the ${data.roleName} role at ${data.companyName}, here's an analysis of how your experience aligns with the position:\n\n`;
  
  // Strong Alignment Section
  if (data.strongAlignments.length > 0) {
    analysis += `✅ **Strong Alignment**\n`;
    data.strongAlignments.forEach((alignment, index) => {
      analysis += `${index + 1}. **${alignment.title}**\n`;
      analysis += `Job Requirement: ${alignment.requirement}\n\n`;
      analysis += `Your Experience: ${alignment.experience}\n`;
      analysis += `Indeed\n\n`;
    });
  }
  
  // Areas for Improvement Section
  if (data.improvements.length > 0) {
    analysis += `⚠️ **Areas for Improvement**\n`;
    data.improvements.forEach((improvement, index) => {
      analysis += `${index + 1}. **${improvement.title}**\n`;
      analysis += `Job Requirement: ${improvement.requirement}\n\n`;
      analysis += `Your Experience: ${improvement.experience}\n`;
      analysis += `Indeed\n\n`;
    });
  }
  
  // Match Score
  analysis += `📊 **Resume Match Score: ${data.matchScore}/100**\n`;
  analysis += `Your resume demonstrates strong alignment with core requirements such as AI integration, project lifecycle management, and cloud platform experience. However, to enhance your fit for the position, consider the following recommendations:\n\n`;
  
  // Recommendations
  analysis += `✅ **Recommendations**\n`;
  data.recommendations.forEach(recommendation => {
    analysis += `${recommendation}\n`;
    analysis += `Indeed\n\n`;
  });
  
  return analysis;
};
