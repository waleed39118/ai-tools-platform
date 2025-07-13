import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertResumeSchema, insertTextCorrectionSchema, insertEmailSchema, insertPdfSummarySchema, insertCodeGenerationSchema } from "@shared/schema";
import { generateResume, correctArabicText, generateEmail, summarizePDF, generateCode } from "./services/openai";
import { z } from "zod";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Resume generation endpoint
  app.post("/api/generate-resume", async (req, res) => {
    try {
      const resumeData = insertResumeSchema.parse(req.body);
      
      const startTime = Date.now();
      const generatedContent = await generateResume(resumeData);
      const processingTime = Date.now() - startTime;
      
      const resume = await storage.createResume({
        ...resumeData,
        generatedContent,
      });
      
      res.json({ 
        success: true, 
        resume,
        processingTime 
      });
    } catch (error) {
      console.error("Resume generation error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate resume. Please check your input and try again." 
      });
    }
  });

  // Arabic text correction endpoint
  app.post("/api/correct-arabic", async (req, res) => {
    try {
      const { originalText } = req.body;
      
      if (!originalText || typeof originalText !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: "Please provide valid Arabic text to correct." 
        });
      }
      
      const startTime = Date.now();
      const correctionResult = await correctArabicText(originalText);
      const processingTime = Date.now() - startTime;
      
      const correction = await storage.createTextCorrection({
        originalText,
        correctedText: correctionResult.correctedText,
        errorsFound: correctionResult.errorsFound,
        wordsImproved: correctionResult.wordsImproved,
        readabilityScore: correctionResult.readabilityScore,
      });
      
      res.json({ 
        success: true, 
        correction,
        processingTime 
      });
    } catch (error) {
      console.error("Arabic correction error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to correct Arabic text. Please try again." 
      });
    }
  });

  // Email generation endpoint
  app.post("/api/generate-email", async (req, res) => {
    try {
      const emailData = insertEmailSchema.parse(req.body);
      
      const startTime = Date.now();
      const generatedContent = await generateEmail(emailData);
      const processingTime = Date.now() - startTime;
      
      const email = await storage.createEmail({
        ...emailData,
        generatedContent,
      });
      
      res.json({ 
        success: true, 
        email,
        processingTime 
      });
    } catch (error) {
      console.error("Email generation error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate email. Please check your input and try again." 
      });
    }
  });

  // PDF summary endpoint
  app.post("/api/summarize-pdf", upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          error: "Please upload a PDF file." 
        });
      }

      const { summaryType, summaryLength, focusAreas } = req.body;
      
      if (!summaryType || !summaryLength) {
        return res.status(400).json({ 
          success: false, 
          error: "Please specify summary type and length." 
        });
      }

      // For demo purposes, we'll use the filename as content
      // In production, you would use a PDF parsing library like pdf-parse
      const fileContent = `PDF content from ${req.file.originalname}`;
      
      const startTime = Date.now();
      const summaryResult = await summarizePDF({
        fileName: req.file.originalname,
        content: fileContent,
        summaryType,
        summaryLength,
        focusAreas,
      });
      const processingTime = Date.now() - startTime;
      
      const summary = await storage.createPdfSummary({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        summaryType,
        summaryLength,
        focusAreas,
        originalContent: fileContent,
        summaryContent: summaryResult.summary,
        originalPages: summaryResult.originalPages,
        summaryWords: summaryResult.summaryWords,
        compressionRatio: summaryResult.compressionRatio,
        processingTime,
      });
      
      res.json({ 
        success: true, 
        summary,
        processingTime 
      });
    } catch (error) {
      console.error("PDF summary error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to summarize PDF. Please try again with a valid PDF file." 
      });
    }
  });

  // Code generation endpoint
  app.post("/api/generate-code", async (req, res) => {
    try {
      const codeData = insertCodeGenerationSchema.parse(req.body);
      
      const startTime = Date.now();
      const codeResult = await generateCode(codeData);
      const processingTime = Date.now() - startTime;
      
      const codeGeneration = await storage.createCodeGeneration({
        ...codeData,
        generatedCode: codeResult.code,
        fileStructure: codeResult.fileStructure,
        linesOfCode: codeResult.linesOfCode,
        estimatedTime: codeResult.estimatedTime,
      });
      
      res.json({ 
        success: true, 
        codeGeneration,
        processingTime 
      });
    } catch (error) {
      console.error("Code generation error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate code. Please check your input and try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
