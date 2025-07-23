# Bug Tracker Application

A full-stack bug tracking application with React frontend and Node.js backend.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Assignment Requirements & Notes](#-assignment-requirements--notes)
- [Application Architecture](#-application-architecture)
- [Application Features](#-application-features)
- [Documentation](#-documentation)
- [License](#-license)

## 🚀 Quick Start

Choose your preferred method to run the application:

### Option 1: Run from Source (Development)

**Prerequisites:**
- Node.js (v16 or higher)
- Docker (for PostgreSQL database)

**Steps:**
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3000
   - Frontend development server on http://localhost:3001

### Option 2: Run with Docker

**Prerequisites:**
- Docker and Docker Compose installed

**Steps:**
1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs







## 🏗️ Application Architecture

### From Source (Development)
- **Frontend**: React with Vite dev server (port 3001)
- **Backend**: Node.js/Express with TypeScript (port 3000)
- **Database**: PostgreSQL (port 5432)

### Docker (Production)
- **Frontend**: React app served by Nginx (port 80)
- **Backend**: Node.js/Express API (port 3000)
- **Database**: PostgreSQL (port 5432)
- **Features**: API proxy, health checks, persistent storage

## 📊 Application Features

- **Project Management**: Create, view, and manage projects
- **Bug Tracking**: Add, edit, and track bugs with severity levels
- **Status Management**: Track bug status (open, in-progress, resolved, closed)
- **Search & Filter**: Find bugs by project, status, or severity
- **Statistics**: View bug statistics and summaries
- **RESTful API**: Complete API with Swagger documentation



## 📚 Documentation

- **API Documentation**: Available at http://localhost:3000/api-docs when running
- **Database Schema**: Check `backend/src/database/migrations/` for schema details

## 📋 Assignment Requirements & Notes

This project was built according to the bug tracking assignment requirements:

### ✅ Functional Requirements Checklist

**Backend Requirements:**
- ✅ **REST API** - Implemented with Express.js and TypeScript
- ✅ **Create project endpoint** - POST /api/projects
- ✅ **Create bug endpoint** - POST /api/projects/:projectId/bugs
- ✅ **List bugs per project** - GET /api/projects/:projectId/bugs
- ✅ **Basic filtering/sorting** - By severity, status, and creation date

**Frontend Requirements:**
- ✅ **Page 1: List projects** - Projects page with project cards
- ✅ **Page 2: Project details with bugs** - Project detail page with bug list
- ✅ **UI library** - Material-UI (MUI) components

**Bonus Requirements:**
- ✅ **Edit bug status/severity** - PUT /api/projects/:projectId/bugs/:bugId
- ✅ **Basic validation and error handling** - Comprehensive validation on both client and server

### Technology Choices & Reasoning

**Backend Technology Choices:**

**API Type**: REST API
- **Reasoning**: This project is simple enough that GraphQL's overhead isn't worth it. REST provides a straightforward, stateless interface that's easy to understand and implement. It follows standard HTTP methods and conventions, making it straightforward for frontend integration and future maintenance.

**Database**: PostgreSQL
- **Reasoning**: PostgreSQL offers robust ACID compliance, excellent performance for relational data, and strong support for complex queries. It's well-suited for bug tracking where data integrity is crucial.

**Frontend Technology Choices:**

**Framework**: React
- **Reasoning**: Honestly, I had very little time and I'm familiar with React when using TypeScript, which made the project more feasible to complete. I had a deadline and managed to hold it. React provides a component-based architecture that's perfect for building reusable UI elements like bug cards and project lists.

**UI Library**: Material-UI (MUI)
- **Reasoning**: Used MUI for consistent, professional UI components. It provides a comprehensive set of pre-built components that follow Material Design principles, ensuring a polished and accessible user interface.

### Database Schema Trade-offs

**Projects Table**:
- Simple structure with id, name, description, and timestamps
- **Trade-off**: Kept minimal to focus on core functionality while allowing for future expansion

**Bugs Table**:
- Includes title, description, severity, status, project_id, and timestamps
- **Trade-off**: Used enum types for severity and status to ensure data consistency while maintaining flexibility

### Validation and Error Handling

**Backend Validation:**
- **express-validator** for comprehensive input validation
- **Custom validation middleware** for consistent error handling
- **Field-level validation** for all API endpoints
- **Database constraint validation** with proper error messages

**Frontend Validation:**
- **Form validation** with immediate feedback
- **Client-side validation** for better user experience
- **Error boundaries** for React components
- **Toast notifications** for API errors

**Error Handling:**
- **Global error middleware** for consistent error responses
- **Custom error classes** (AppError, ValidationError, DatabaseError)
- **PostgreSQL error handling** for database constraint violations
- **Structured error responses** with error codes and details

### Testing Implementation

**Backend Tests:**
- **Unit Tests**: `backend/tests/app.test.ts` - Application health and routing
- **Integration Tests**: `backend/tests/projects.test.ts` - Project API endpoints (234 lines)
- **Integration Tests**: `backend/tests/bugs.test.ts` - Bug API endpoints (404 lines)
- **Test Coverage**: Comprehensive testing of all CRUD operations, validation, and error scenarios

**Frontend Tests:**
- **Component Tests**: `frontend/src/test/ProjectCard.test.tsx` - Project card component rendering
- **Testing Framework**: Vitest with React Testing Library
- **Test Setup**: Proper test environment configuration

### Additional Features Implemented

**Beyond Requirements**:
- Bug editing capabilities
- Advanced filtering and search
- Statistics and analytics
- Comprehensive error handling and validation
- Docker containerization for easy deployment
- Complete test suite with unit and integration tests

## 📄 License

This project is licensed under the MIT License. 