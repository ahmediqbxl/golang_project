// Package main implements a RESTful API server for the Task Manager application.
// It provides endpoints for CRUD operations on tasks and handles CORS for frontend communication.
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Task represents a single task in the system
// Fields are tagged for JSON serialization/deserialization
type Task struct {
	ID          string    `json:"id"`          // Unique identifier for the task
	Title       string    `json:"title"`       // Title of the task
	Description string    `json:"description"` // Detailed description of the task
	Priority    string    `json:"priority"`    // Priority level of the task
	DueDate     time.Time `json:"dueDate"`     // Due date of the task
}

// tasks stores all tasks in memory using a map for O(1) access
var tasks = make(map[string]Task)

// main is the entry point of the application
// It sets up the router, CORS configuration, and starts the HTTP server
func main() {
	// Initialize a new router using gorilla/mux
	r := mux.NewRouter()

	// Configure CORS to allow requests from the frontend
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Register API routes with their corresponding handler functions
	r.HandleFunc("/api/tasks", getTasks).Methods("GET")
	r.HandleFunc("/api/tasks", createTask).Methods("POST")
	r.HandleFunc("/api/tasks/{id}", updateTask).Methods("PUT")
	r.HandleFunc("/api/tasks/{id}", deleteTask).Methods("DELETE")

	// Apply CORS middleware to all routes
	handler := c.Handler(r)

	// Start the HTTP server on port 8080
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

// getTasks handles GET requests to retrieve all tasks
// It returns all tasks as a JSON response
func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Convert map to slice for consistent ordering
	taskList := make([]Task, 0, len(tasks))
	for _, task := range tasks {
		taskList = append(taskList, task)
	}
	json.NewEncoder(w).Encode(taskList)
}

// createTask handles POST requests to create a new task
// It generates a unique ID for the task and stores it in memory
func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate a unique ID using current timestamp
	task.ID = time.Now().Format("20060102150405")
	tasks[task.ID] = task

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// updateTask handles PUT requests to update an existing task
// It updates the task with the given ID in memory
func updateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	task.ID = id
	tasks[id] = task

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// deleteTask handles DELETE requests to remove a task
// It deletes the task with the given ID from memory
func deleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	delete(tasks, id)
	w.WriteHeader(http.StatusNoContent)
}
