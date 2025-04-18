# Task Manager Frontend

This is the frontend application for the Task Manager, built with React, TypeScript, and React DnD for drag-and-drop functionality.

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

## Features

- Drag-and-drop task management
- Task creation, editing, and deletion
- Priority-based task organization
- Responsive design
- TypeScript support

## Setup

1. Make sure you have Node.js installed (version 14 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The application will start on `http://localhost:3000`

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

## Development

- The application uses React hooks for state management
- CSS modules for styling
- TypeScript for type safety
- Axios for API communication with the backend 