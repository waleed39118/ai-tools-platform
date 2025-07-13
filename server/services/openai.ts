import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateResume(data: {
  name: string;
  position: string;
  contact: string;
  experience: string;
  skills: string;
  education: string;
}): Promise<string> {
  const prompt = `
    Create a professional resume in Arabic for the following person. Format it as clean HTML with proper RTL styling.
    
    Name: ${data.name}
    Desired Position: ${data.position}
    Contact Info: ${data.contact}
    Experience: ${data.experience}
    Skills: ${data.skills}
    Education: ${data.education}
    
    Please create a well-structured, professional resume in Arabic with appropriate sections and formatting.
    Return only the HTML content without any wrapper elements.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
  });

  return response.choices[0].message.content || "";
}

export async function correctArabicText(text: string): Promise<{
  correctedText: string;
  errorsFound: number;
  wordsImproved: number;
  readabilityScore: number;
}> {
  const prompt = `
    Please correct and improve the following Arabic text. Fix grammar, spelling, and style issues while maintaining the original meaning.
    
    Original text: ${text}
    
    Please respond with JSON in this format:
    {
      "correctedText": "the corrected Arabic text",
      "errorsFound": number of errors found,
      "wordsImproved": number of words improved,
      "readabilityScore": readability score from 0-100
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert Arabic language corrector. Provide corrections and improvements in JSON format."
      },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    max_tokens: 1500,
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  return {
    correctedText: result.correctedText || text,
    errorsFound: result.errorsFound || 0,
    wordsImproved: result.wordsImproved || 0,
    readabilityScore: result.readabilityScore || 0,
  };
}

export async function generateEmail(data: {
  emailType: string;
  subject: string;
  recipientName: string;
  keyPoints: string;
  tone: string;
}): Promise<string> {
  const prompt = `
    Create a professional email in Arabic with the following details:
    
    Email Type: ${data.emailType}
    Subject: ${data.subject}
    Recipient Name: ${data.recipientName}
    Key Points: ${data.keyPoints}
    Tone: ${data.tone}
    
    Please write a well-structured, professional email in Arabic that includes:
    - Proper greeting
    - Clear subject line
    - Well-organized content based on the key points
    - Appropriate closing
    - Professional tone matching the requested style
    
    Format the response as HTML with proper RTL styling.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert in writing professional Arabic emails. Create formal, well-structured emails."
      },
      { role: "user", content: prompt }
    ],
    max_tokens: 1500,
  });

  return response.choices[0].message.content || "";
}

export async function summarizePDF(data: {
  fileName: string;
  content: string;
  summaryType: string;
  summaryLength: string;
  focusAreas?: string;
}): Promise<{
  summary: string;
  originalPages: number;
  summaryWords: number;
  compressionRatio: number;
}> {
  const lengthInstructions = {
    short: "200-300 words",
    medium: "500-700 words",
    long: "1000+ words"
  };

  const prompt = `
    Please create a ${data.summaryType} summary of the following PDF content in Arabic.
    
    Summary length: ${lengthInstructions[data.summaryLength as keyof typeof lengthInstructions]}
    ${data.focusAreas ? `Focus areas: ${data.focusAreas}` : ''}
    
    Content: ${data.content}
    
    Please respond with JSON in this format:
    {
      "summary": "the summary in Arabic",
      "keyPoints": ["key point 1", "key point 2", ...],
      "originalPages": estimated number of pages,
      "summaryWords": number of words in summary,
      "compressionRatio": percentage of compression
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert in creating summaries of academic and professional documents in Arabic."
      },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    max_tokens: 2000,
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  return {
    summary: result.summary || "",
    originalPages: result.originalPages || 0,
    summaryWords: result.summaryWords || 0,
    compressionRatio: result.compressionRatio || 0,
  };
}

export async function generateCode(data: {
  projectTitle: string;
  projectDescription: string;
  language: string;
  framework?: string;
  features: string;
  codeStyle: string;
}): Promise<{
  code: string;
  fileStructure: string;
  linesOfCode: number;
  estimatedTime: number;
}> {
  const prompt = `
    Create a professional and complete code solution for the following project:
    
    Project Title: ${data.projectTitle}
    Project Description: ${data.projectDescription}
    Programming Language: ${data.language}
    Framework: ${data.framework || 'None specified'}
    Required Features: ${data.features}
    Code Style: ${data.codeStyle}
    
    Please provide a complete, production-ready code solution with:
    1. Clean, well-structured code following best practices
    2. Proper error handling and validation
    3. Comments in Arabic for key functions
    4. Secure and efficient implementation
    5. Responsive design (if applicable)
    
    Respond with JSON in this format:
    {
      "code": "the complete code solution",
      "fileStructure": "recommended file/folder structure",
      "linesOfCode": estimated number of lines,
      "estimatedTime": estimated development time in hours,
      "technicalNotes": "important technical considerations"
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert senior software developer with years of experience in creating professional, secure, and scalable applications. Provide complete, production-ready code solutions with proper architecture and best practices."
      },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    max_tokens: 4000,
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  return {
    code: result.code || "",
    fileStructure: result.fileStructure || "",
    linesOfCode: result.linesOfCode || 0,
    estimatedTime: result.estimatedTime || 0,
  };
}
