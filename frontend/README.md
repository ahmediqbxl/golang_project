# Task Manager Frontend

This is the frontend application for the Task Manager, built with React, TypeScript, React DnD, and Docker.

## Project Structure

- `src/`: Source code directory
  - `App.tsx`: Main application component
  - `App.css`: Main stylesheet
  - `components/`: React components
    - `TaskCard.tsx`: Component for displaying individual tasks
    - `TaskColumn.tsx`: Component for displaying task columns
    - `TaskForm.tsx`: Component for creating/editing tasks
  - `public/`: Static assets
    - `index.html`: HTML template
    - `manifest.json`: Web app manifest
- `Dockerfile`: Docker configuration for the frontend service
- `docker-compose.yml`: Docker Compose configuration
- `nginx.conf`: Nginx configuration for serving the frontend

## Features

- Drag-and-drop task management
- Task creation, editing, and deletion
- Priority-based task organization
- Responsive design
- TypeScript support
- Docker containerization
- Nginx for production serving

## Setup

### Local Development

1. Make sure you have Node.js installed (version 14 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Docker Setup

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will start on `http://localhost:3000`

## Development

- The application uses React hooks for state management
- CSS modules for styling
- TypeScript for type safety
- Axios for API communication with the backend
- Docker for containerization
- Nginx for serving the production build

## Dependencies

- `react`: Core React library
- `react-dnd`: Drag and drop functionality
- `react-dnd-html5-backend`: HTML5 backend for react-dnd
- `axios`: HTTP client for API requests
- `typescript`: TypeScript support

## Task Interface

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}
```

## Production Build

The production build is served using Nginx with the following configuration:
- Port: 3000
- Static file serving from `/usr/share/nginx/html`
- API proxy to backend service
- SPA routing support 