# Task Manager Application

A full-stack task management application with React frontend and Go backend. The application allows users to organize tasks by priority and due dates, with drag-and-drop functionality for easy task management.

## Features

- Three-column layout for different priority levels (High, Medium, Low)
- Drag and drop functionality to move tasks between columns
- Task creation with:
  - Title
  - Description
  - Priority level
  - Due date
- Task editing and deletion
- Modern, responsive design
- Real-time updates

## Tech Stack

### Frontend
- React with TypeScript
- React DnD for drag and drop functionality
- Axios for API communication
- Modern CSS with flexbox layout

### Backend
- Go
- Gorilla Mux for routing
- CORS support for frontend communication
- In-memory task storage

## Setup Instructions

### Prerequisites
- Go 1.16 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go get github.com/gorilla/mux github.com/rs/cors
```

3. Run the backend server:
```bash
go run main.go
```

The backend server will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Notes

- The application uses in-memory storage for tasks, so data will be lost when the server restarts
- CORS is configured to allow requests from `http://localhost:3000`
- The frontend is built with TypeScript for better type safety
- The drag and drop functionality is implemented using React DnD
- The UI is responsive and works well on both desktop and mobile devices

## Future Improvements

- Add persistent storage using a database
- Implement user authentication
- Add task categories and tags
- Add task search and filtering
- Implement task completion status
- Add task reminders and notifications
