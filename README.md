# Bug Tracker Application

A full-stack bug tracking application with React frontend and Node.js backend.

## 🚀 Quick Start

Choose your preferred method to run the application:

### Option 1: Run from Source (Development)

**Prerequisites:**
- Node.js (v16 or higher)
- Docker (for PostgreSQL database)

**Steps:**
1. **Install all dependencies and setup database:**
   ```bash
   npm run install
   ```
   This will automatically:
   - Install backend and frontend dependencies
   - Start PostgreSQL container
   - Run database migrations
   - Seed the database with sample data

2. **Start both frontend and backend development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3000
   - Frontend development server on http://localhost:3001

**Database Configuration:**
- Database: `bugtracker`
- Username: `bugtracker`
- Password: `bugtracker`
- Port: 5432

### Option 2: Run with Docker (Production Ready)

**Prerequisites:**
- Docker and Docker Compose installed

**Steps:**
1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Seed the database with sample data:**
   ```bash
   docker-compose exec backend npm run seed
   ```

3. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

## 📋 Available Commands

### Development Commands

**From Source:**
- `npm run dev` - Start both frontend and backend development servers
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode
- `npm run seed` - Seed the database with sample data

**Docker:**
- `docker-compose up --build` - Build and start all services
- `docker-compose up -d` - Start services in background
- `docker-compose down` - Stop all services
- `docker-compose logs -f` - View logs
- `docker-compose exec backend npm run seed` - Seed database

### Database Commands

**From Source:**
- `npm run db:up` - Start PostgreSQL container
- `npm run db:down` - Stop PostgreSQL container
- `npm run db:setup` - Complete database setup (start DB, run migrations, seed data)
- `npm run db:wait` - Wait for PostgreSQL to be ready
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database (remove volumes and re-setup)
- `npm run db:logs` - View PostgreSQL logs

**Docker:**
- `docker-compose exec postgres psql -U bugtracker -d bugtracker` - Access PostgreSQL shell
- `docker-compose exec backend npm run seed` - Seed database
- `docker-compose exec backend npm run seed reset` - Reset and reseed database

### Installation Commands

- `npm run install` - Install dependencies for root, backend, and frontend (runs in parallel)
- `npm run install:backend` - Install backend dependencies only
- `npm run install:frontend` - Install frontend dependencies only

## 🔧 Environment Variables

### From Source Configuration

The application uses the following default database configuration:
- `DB_HOST`: localhost
- `DB_PORT`: 5432
- `DB_NAME`: bugtracker
- `DB_USER`: bugtracker
- `DB_PASSWORD`: bugtracker

You can override these by setting environment variables in a `.env` file in the backend directory.

### Docker Configuration

Docker automatically configures the environment:
- `NODE_ENV`: production
- `PORT`: 3000
- `DATABASE_URL`: postgresql://bugtracker:bugtracker@postgres:5432/bugtracker

## 🧪 Testing

For testing, the application uses a separate test database:
- `TEST_DB_NAME`: bugtracker_test

**From Source:**
```bash
cd backend
npm test
```

**Docker:**
```bash
docker-compose exec backend npm test
```

## 🏗️ Architecture

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

## 🔍 Troubleshooting

### Common Issues

**From Source:**
1. **Port conflicts**: Ensure ports 3000, 3001, and 5432 are available
2. **Database connection**: Make sure PostgreSQL is running
3. **Dependencies**: Run `npm run install` to install all dependencies

**Docker:**
1. **Port conflicts**: Ensure ports 80, 3000, and 5432 are available
2. **Build failures**: Check Docker logs with `docker-compose logs`
3. **Database connection**: Wait for PostgreSQL to be healthy

### Debugging Commands

**From Source:**
```bash
# Check if services are running
lsof -i :3000  # Backend
lsof -i :3001  # Frontend
lsof -i :5432  # Database

# View logs
cd backend && npm run dev
cd frontend && npm run dev
```

**Docker:**
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Access container shell
docker-compose exec [service-name] sh
```

## 📚 Documentation

- **API Documentation**: Available at http://localhost:3000/api-docs when running
- **Docker Setup**: See [DOCKER.md](./DOCKER.md) for detailed Docker instructions
- **Database Schema**: Check `backend/src/database/migrations/` for schema details

## 🚀 Production Deployment

### From Source
1. Set up PostgreSQL server
2. Configure environment variables
3. Run `npm run build` to build both frontend and backend
4. Use a process manager like PM2 for the backend
5. Serve frontend with a web server like Nginx

### Docker (Recommended)
1. Ensure Docker and Docker Compose are installed
2. Run `docker-compose up --build -d` for production deployment
3. Configure reverse proxy and SSL if needed
4. Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 