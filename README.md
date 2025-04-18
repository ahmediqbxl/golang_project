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

### Node.js and npm Installation
1. Download Node.js:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Run the installer as Administrator and follow these steps:
     - Accept the license agreement
     - Choose the default installation location (`C:\Program Files\nodejs`)
     - Select the default components to install
     - Check the box for "Automatically install the necessary tools"
     - Check the box for "Add to PATH"
     - Click Install

2. Verify the installation:
   - Close all open terminal windows
   - Open a new terminal/command prompt
   - Run the following commands to verify the installation:
   ```bash
   node --version
   npm --version
   ```
   - You should see version numbers displayed for both commands

3. Troubleshooting:
   If you get "command not found" errors:
   - Verify Node.js is installed in `C:\Program Files\nodejs`
   - Check your PATH environment variable:
     1. Press Windows + R
     2. Type "sysdm.cpl" and press Enter
     3. Go to "Advanced" tab
     4. Click "Environment Variables"
     5. Under "System Variables", find "Path"
     6. Click "Edit"
     7. Add `C:\Program Files\nodejs` if not present
     8. Click "OK" on all windows
   - Restart your computer
   - Open a new terminal and try again

4. Alternative Installation (if above steps don't work):
   a. For Git Bash users (recommended):
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   
   # Add these lines to your ~/.bashrc file:
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   
   # Close and reopen Git Bash, then run:
   nvm install --lts
   nvm use --lts
   ```

   b. For Windows Command Prompt/PowerShell users:
   Install using nvm-windows:
   1. Download nvm-windows from [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
   2. Run the installer
   3. Open a new terminal and run:
   ```bash
   nvm install latest
   nvm use latest
   ```
   4. Verify installation with `node --version` and `npm --version`

5. Update npm to the latest version (optional but recommended):
   ```bash
   npm install -g npm@latest
   ```

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

3. Install TypeScript type definitions:
```bash
npm install --save-dev @types/react @types/react-dnd @types/react-dnd-html5-backend @types/axios
```

4. Start the development server:
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
