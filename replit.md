# AI Tools Platform

## Overview

This is a full-stack web application that provides AI-powered tools for Arabic users. The platform offers five main services: resume generation, Arabic text correction, email drafting, PDF summarization, and professional code generation. The application uses OpenAI's GPT-4o model for AI processing and features a modern, responsive UI with RTL (right-to-left) support for Arabic content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom RTL configuration
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **AI Service**: OpenAI GPT-4o API integration
- **File Processing**: Multer for PDF file uploads
- **Session Management**: Express sessions with PostgreSQL store

### Development Setup
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for client, esbuild for server
- **Type Safety**: Shared TypeScript types between client and server
- **Development Tools**: Replit integration with runtime error overlay

## Key Components

### AI Services (`server/services/openai.ts`)
- Resume generation in Arabic with HTML formatting
- Arabic text correction with grammar, spelling, and style improvements
- Email drafting with customizable tone and purpose
- PDF summarization with configurable length and focus areas
- Professional code generation with multiple programming languages and frameworks support

### Data Layer (`shared/schema.ts`)
- Drizzle ORM schema definitions for all entities
- Zod validation schemas for API requests
- Type-safe database operations with TypeScript

### Storage Layer (`server/storage.ts`)
- Abstracted storage interface for database operations
- In-memory storage implementation for development
- Support for users, resumes, text corrections, emails, PDF summaries, and code generations

### UI Components (`client/src/components/`)
- Comprehensive Shadcn/ui component library
- RTL-aware layout components (Navbar, Footer)
- Form components with Arabic language support
- Responsive design with mobile-first approach

### Page Components (`client/src/pages/`)
- Home page with tool overview and features
- Resume Generator with form-based input
- Arabic Correction tool with text analysis
- Email Drafting with template selection
- PDF Summary with file upload and processing
- Code Generator with multiple programming languages support

## Data Flow

1. **User Input**: Users interact with React forms on the frontend
2. **Validation**: Client-side validation using Zod schemas
3. **API Request**: Data sent to Express.js backend via TanStack Query
4. **Processing**: Backend processes requests using OpenAI API
5. **Storage**: Results stored in PostgreSQL database via Drizzle ORM
6. **Response**: Processed content returned to frontend
7. **Display**: Results displayed in user-friendly format with copy/download options

## External Dependencies

### Core Dependencies
- **OpenAI API**: GPT-4o model for AI processing
- **Neon Database**: Serverless PostgreSQL hosting
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework

### Development Dependencies
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and developer experience
- **ESLint/Prettier**: Code quality and formatting
- **Drizzle Kit**: Database migration and management

## Deployment Strategy

### Production Build
- Client built with Vite to `dist/public`
- Server bundled with esbuild to `dist/index.js`
- Static assets served from built client directory

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- `OPENAI_API_KEY` for AI service authentication
- Development mode includes Vite middleware and HMR

### Database Management
- Drizzle migrations stored in `./migrations`
- Schema changes applied via `drizzle-kit push`
- Connection pooling handled by Neon serverless

## Changelog

- July 08, 2025. Initial setup
- July 08, 2025. Enhanced color scheme with vibrant, engaging colors to encourage user interaction and tool usage
- July 08, 2025. Added professional code generation tool with comprehensive programming language support
- July 08, 2025. Added bilingual support (Arabic/English) with dynamic language switching and RTL/LTR layout support

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Smart, encouraging colors that motivate user registration and tool usage.