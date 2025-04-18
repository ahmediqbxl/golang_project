# Task Manager Backend

This is the backend service for the Task Manager application, built with Go and the Gorilla Mux router.

## Project Structure

- `main.go`: Main application file containing the server setup, routes, and handlers
- `go.mod`: Go module file for dependency management
- `go.sum`: Go module checksum file

## Features

- RESTful API endpoints for task management
- CORS support for frontend communication
- In-memory task storage
- JSON request/response handling

## API Endpoints

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/{id}`: Update an existing task
- `DELETE /api/tasks/{id}`: Delete a task

## Setup

1. Make sure you have Go installed (version 1.16 or higher)
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Run the server:
   ```bash
   go run main.go
   ```

The server will start on `http://localhost:8080`

## Dependencies

- `github.com/gorilla/mux`: Router for handling HTTP requests
- `github.com/rs/cors`: Middleware for handling CORS

## Task Structure

```go
type Task struct {
    ID          string    `json:"id"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    Priority    string    `json:"priority"`
    DueDate     time.Time `json:"dueDate"`
}
``` 