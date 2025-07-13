import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  name: text("name").notNull(),
  position: text("position").notNull(),
  contact: text("contact").notNull(),
  experience: text("experience").notNull(),
  skills: text("skills").notNull(),
  education: text("education").notNull(),
  generatedContent: text("generated_content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const textCorrections = pgTable("text_corrections", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  correctedText: text("corrected_text").notNull(),
  errorsFound: integer("errors_found").default(0),
  wordsImproved: integer("words_improved").default(0),
  readabilityScore: integer("readability_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),
  emailType: text("email_type").notNull(),
  subject: text("subject").notNull(),
  recipientName: text("recipient_name").notNull(),
  keyPoints: text("key_points").notNull(),
  tone: text("tone").notNull(),
  generatedContent: text("generated_content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pdfSummaries = pgTable("pdf_summaries", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  summaryType: text("summary_type").notNull(),
  summaryLength: text("summary_length").notNull(),
  focusAreas: text("focus_areas"),
  originalContent: text("original_content").notNull(),
  summaryContent: text("summary_content").notNull(),
  originalPages: integer("original_pages").default(0),
  summaryWords: integer("summary_words").default(0),
  compressionRatio: integer("compression_ratio").default(0),
  processingTime: integer("processing_time").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const codeGenerations = pgTable("code_generations", {
  id: serial("id").primaryKey(),
  projectTitle: text("project_title").notNull(),
  projectDescription: text("project_description").notNull(),
  language: text("language").notNull(),
  framework: text("framework"),
  features: text("features").notNull(),
  codeStyle: text("code_style").notNull(),
  generatedCode: text("generated_code").notNull(),
  fileStructure: text("file_structure"),
  linesOfCode: integer("lines_of_code").default(0),
  estimatedTime: integer("estimated_time").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
});

export const insertTextCorrectionSchema = createInsertSchema(textCorrections).omit({
  id: true,
  createdAt: true,
});

export const insertEmailSchema = createInsertSchema(emails).omit({
  id: true,
  createdAt: true,
});

export const insertPdfSummarySchema = createInsertSchema(pdfSummaries).omit({
  id: true,
  createdAt: true,
});

export const insertCodeGenerationSchema = createInsertSchema(codeGenerations).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

export type InsertTextCorrection = z.infer<typeof insertTextCorrectionSchema>;
export type TextCorrection = typeof textCorrections.$inferSelect;

export type InsertEmail = z.infer<typeof insertEmailSchema>;
export type Email = typeof emails.$inferSelect;

export type InsertPdfSummary = z.infer<typeof insertPdfSummarySchema>;
export type PdfSummary = typeof pdfSummaries.$inferSelect;

export type InsertCodeGeneration = z.infer<typeof insertCodeGenerationSchema>;
export type CodeGeneration = typeof codeGenerations.$inferSelect;
