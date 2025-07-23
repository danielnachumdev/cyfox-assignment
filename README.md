# Bug Tracker Application

A full-stack bug tracking application with React frontend and Node.js backend.

## Database Setup with Docker

This application uses PostgreSQL running in Docker for the database.

### Prerequisites

- Docker and Docker Compose installed
- Node.js (v16 or higher)

### Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install
   ```

2. **Start the PostgreSQL database:**
   ```bash
   npm run db:up
   ```
   This will start PostgreSQL on port 5432 with the following default credentials:
   - Database: `bug_tracker`
   - Username: `postgres`
   - Password: `postgres`

3. **Setup the database:**
   ```bash
   npm run db:setup
   ```

4. **Start both frontend and backend development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3001
   - Frontend development server on http://localhost:5173

### Available Commands

**Development:**
- `npm run dev` - Start both frontend and backend development servers
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode

**Database:**
- `npm run db:up` - Start PostgreSQL container
- `npm run db:down` - Stop PostgreSQL container
- `npm run db:setup` - Run migrations and seed data
- `npm run db:restart` - Restart PostgreSQL container
- `npm run db:logs` - View PostgreSQL logs

**Installation:**
- `npm run install` - Install dependencies for root, backend, and frontend (runs in parallel)
- `npm run install:backend` - Install backend dependencies only
- `npm run install:frontend` - Install frontend dependencies only

### Environment Variables

The application uses the following default database configuration:
- `DB_HOST`: localhost
- `DB_PORT`: 5432
- `DB_NAME`: bug_tracker
- `DB_USER`: postgres
- `DB_PASSWORD`: postgres

You can override these by setting environment variables in a `.env` file in the backend directory.

### Testing

For testing, the application uses a separate test database:
- `TEST_DB_NAME`: bug_tracker_test

Run tests with:
```bash
cd backend
npm test
```

### Production

For production deployment, ensure PostgreSQL is running and update the environment variables accordingly. 