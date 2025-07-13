import { 
  users, 
  resumes, 
  textCorrections, 
  emails, 
  pdfSummaries,
  codeGenerations,
  type User, 
  type InsertUser,
  type Resume,
  type InsertResume,
  type TextCorrection,
  type InsertTextCorrection,
  type Email,
  type InsertEmail,
  type PdfSummary,
  type InsertPdfSummary,
  type CodeGeneration,
  type InsertCodeGeneration
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: number): Promise<Resume | undefined>;
  
  createTextCorrection(correction: InsertTextCorrection): Promise<TextCorrection>;
  getTextCorrection(id: number): Promise<TextCorrection | undefined>;
  
  createEmail(email: InsertEmail): Promise<Email>;
  getEmail(id: number): Promise<Email | undefined>;
  
  createPdfSummary(summary: InsertPdfSummary): Promise<PdfSummary>;
  getPdfSummary(id: number): Promise<PdfSummary | undefined>;
  
  createCodeGeneration(code: InsertCodeGeneration): Promise<CodeGeneration>;
  getCodeGeneration(id: number): Promise<CodeGeneration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private textCorrections: Map<number, TextCorrection>;
  private emails: Map<number, Email>;
  private pdfSummaries: Map<number, PdfSummary>;
  private codeGenerations: Map<number, CodeGeneration>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.textCorrections = new Map();
    this.emails = new Map();
    this.pdfSummaries = new Map();
    this.codeGenerations = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentId++;
    const resume: Resume = { 
      ...insertResume, 
      id,
      createdAt: new Date()
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createTextCorrection(insertCorrection: InsertTextCorrection): Promise<TextCorrection> {
    const id = this.currentId++;
    const correction: TextCorrection = { 
      ...insertCorrection, 
      id,
      createdAt: new Date()
    };
    this.textCorrections.set(id, correction);
    return correction;
  }

  async getTextCorrection(id: number): Promise<TextCorrection | undefined> {
    return this.textCorrections.get(id);
  }

  async createEmail(insertEmail: InsertEmail): Promise<Email> {
    const id = this.currentId++;
    const email: Email = { 
      ...insertEmail, 
      id,
      createdAt: new Date()
    };
    this.emails.set(id, email);
    return email;
  }

  async getEmail(id: number): Promise<Email | undefined> {
    return this.emails.get(id);
  }

  async createPdfSummary(insertSummary: InsertPdfSummary): Promise<PdfSummary> {
    const id = this.currentId++;
    const summary: PdfSummary = { 
      ...insertSummary, 
      id,
      createdAt: new Date()
    };
    this.pdfSummaries.set(id, summary);
    return summary;
  }

  async getPdfSummary(id: number): Promise<PdfSummary | undefined> {
    return this.pdfSummaries.get(id);
  }

  async createCodeGeneration(insertCode: InsertCodeGeneration): Promise<CodeGeneration> {
    const id = this.currentId++;
    const code: CodeGeneration = { 
      ...insertCode, 
      id,
      createdAt: new Date()
    };
    this.codeGenerations.set(id, code);
    return code;
  }

  async getCodeGeneration(id: number): Promise<CodeGeneration | undefined> {
    return this.codeGenerations.get(id);
  }
}

export const storage = new MemStorage();
