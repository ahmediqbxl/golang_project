# Task Manager Application

A full-stack task management application with drag-and-drop functionality, built with Go, React, TypeScript, and MongoDB.

## Project Structure

```
.
├── backend/         # Go backend service
├── frontend/        # React frontend application
├── database/        # MongoDB database service
└── docker-compose.yml  # Main Docker Compose configuration
```

## Features

- Drag-and-drop task management
- Task creation, editing, and deletion
- Priority-based task organization
- Persistent storage with MongoDB
- Docker containerization
- RESTful API
- Responsive design

## Prerequisites

- Docker and Docker Compose
- Go 1.21 or higher (for local development)
- Node.js 14 or higher (for local development)

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. Start all services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MongoDB: localhost:27017

## Development

### Running Services Individually

1. Start the database:
   ```bash
   cd database
   docker-compose up --build
   ```

2. Start the backend:
   ```bash
   cd backend
   docker-compose up --build
   ```

3. Start the frontend:
   ```bash
   cd frontend
   docker-compose up --build
   ```

### Local Development

#### Backend
1. Navigate to the backend directory
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Run the server:
   ```bash
   go run main.go
   ```

#### Frontend
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

### Endpoints

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/{id}`: Update an existing task
- `DELETE /api/tasks/{id}`: Delete a task

### Task Structure

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
