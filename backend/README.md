# Task Manager Backend

This is the backend service for the Task Manager application, built with Go, Gorilla Mux router, and MongoDB.

## Project Structure

- `main.go`: Main application file containing the server setup, routes, and handlers
- `go.mod`: Go module file for dependency management
- `go.sum`: Go module checksum file
- `Dockerfile`: Docker configuration for the backend service
- `docker-compose.yml`: Docker Compose configuration for the backend service

## Features

- RESTful API endpoints for task management
- CORS support for frontend communication
- MongoDB database integration
- JSON request/response handling
- Docker containerization

## API Endpoints

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/{id}`: Update an existing task
- `DELETE /api/tasks/{id}`: Delete a task

## Setup

### Local Development

1. Make sure you have Go installed (version 1.21 or higher)
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Run the server:
   ```bash
   go run main.go
   ```

### Docker Setup

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The server will start on `http://localhost:8080`

## Database Configuration

The backend connects to MongoDB using the following configuration:
- Connection string: `mongodb://admin:password@mongodb:27017/taskmanager?authSource=admin`
- Database name: `taskmanager`
- Collection name: `tasks`

## Dependencies

- `github.com/gorilla/mux`: Router for handling HTTP requests
- `github.com/rs/cors`: Middleware for handling CORS
- `go.mongodb.org/mongo-driver`: MongoDB driver for Go

## Task Structure

```go
type Task struct {
    ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Title       string            `json:"title" bson:"title"`
    Description string            `json:"description" bson:"description"`
    Priority    string            `json:"priority" bson:"priority"`
    DueDate     time.Time         `json:"dueDate" bson:"dueDate"`
}
``` 