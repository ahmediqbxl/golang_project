# Task Manager Database

This is the MongoDB database service for the Task Manager application.

## Project Structure

- `Dockerfile`: Docker configuration for the MongoDB service
- `docker-compose.yml`: Docker Compose configuration
- `init.js`: MongoDB initialization script

## Features

- MongoDB database with authentication
- Persistent storage using Docker volumes
- Pre-configured database and collections
- Optimized indexes for task queries

## Setup

### Using Docker Compose

1. Navigate to the database directory:
   ```bash
   cd database
   ```

2. Start the database service:
   ```bash
   docker-compose up --build
   ```

The database will be available at:
- Host: localhost
- Port: 27017
- Database: taskmanager
- Username: admin
- Password: password

## Database Structure

### Collections

- `tasks`: Stores all task documents

### Indexes

- `id`: Unique index for task identification
- `priority`: Index for filtering tasks by priority
- `dueDate`: Index for sorting tasks by due date

## Connection String

The MongoDB connection string for other services:
```
mongodb://admin:password@mongodb:27017/taskmanager?authSource=admin
``` 