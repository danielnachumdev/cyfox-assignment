# Docker Setup for Bug Tracker Application

This document explains how to run the Bug Tracker application using Docker containers.

## Architecture

The application consists of three main services:

1. **PostgreSQL Database** - Stores application data
2. **Backend API** - Node.js/Express server with TypeScript
3. **Frontend** - React application served by Nginx

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### 1. Build and Start All Services

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Access the Application

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs

### 3. Seed the Database

```bash
# Seed the database with sample data
docker-compose exec backend npm run seed
```

## Service Details

### PostgreSQL Database
- **Port**: 5432
- **Database**: bugtracker
- **Username**: bugtracker
- **Password**: bugtracker
- **Volume**: postgres_data (persistent storage)

### Backend API
- **Port**: 3000
- **Framework**: Node.js with Express and TypeScript
- **Health Check**: http://localhost:3000/health
- **Dependencies**: PostgreSQL database

### Frontend
- **Port**: 80
- **Framework**: React with Vite
- **Server**: Nginx
- **Features**: 
  - API proxy to backend
  - React Router support
  - Static asset caching
  - Security headers

## Docker Commands

### Development

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
```

### Database Operations

```bash
# Seed the database
docker-compose exec backend npm run seed

# Access PostgreSQL shell
docker-compose exec postgres psql -U bugtracker -d bugtracker

# Reset database
docker-compose exec backend npm run seed reset
```

### Maintenance

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Rebuild specific service
docker-compose build backend

# View running containers
docker-compose ps

# Execute commands in containers
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U bugtracker -d bugtracker
```

## Environment Variables

### Backend Environment Variables
- `NODE_ENV`: Environment (production/development)
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string

### Frontend Environment Variables
- Configured through Vite build process
- API proxy automatically configured

## Health Checks

All services include health checks:

- **PostgreSQL**: Checks database connectivity
- **Backend**: HTTP health check endpoint
- **Frontend**: HTTP availability check

## Networking

All services are connected through a custom bridge network `bug-tracker-network`:

- Frontend can access backend via `http://backend:3000`
- Backend can access PostgreSQL via `postgres:5432`
- Services are isolated from host network except for exposed ports

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 3000, and 5432 are available
2. **Database connection**: Wait for PostgreSQL to be healthy before backend starts
3. **Build failures**: Check Docker logs for build errors

### Debugging

```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Access container shell
docker-compose exec [service-name] sh

# Check health status
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

### Reset Everything

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Clean up Docker system
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Production Considerations

1. **Environment Variables**: Use `.env` files for production configuration
2. **Secrets**: Use Docker secrets for sensitive data
3. **Volumes**: Ensure data persistence for PostgreSQL
4. **Networking**: Configure proper firewall rules
5. **Monitoring**: Add logging and monitoring solutions
6. **SSL**: Configure HTTPS with proper certificates

## Development vs Production

### Development
- Uses volume mounts for hot reloading
- Includes dev dependencies
- Debug-friendly configuration

### Production
- Optimized builds
- Minimal image sizes
- Security-focused configuration
- Health checks and monitoring 