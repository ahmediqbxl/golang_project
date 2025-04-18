// Package main implements a RESTful API server for the Task Manager application.
// It provides endpoints for CRUD operations on tasks and handles CORS for frontend communication.
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Task represents a single task in the system
// Fields are tagged for JSON serialization/deserialization
type Task struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Priority    string             `json:"priority" bson:"priority"`
	DueDate     time.Time          `json:"dueDate" bson:"dueDate"`
}

var client *mongo.Client
var collection *mongo.Collection

func init() {
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://mongodb:27017")

	// Connect to MongoDB
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	// Get collection
	collection = client.Database("taskmanager").Collection("tasks")
}

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

	var tasks []Task
	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var task Task
		err := cur.Decode(&task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, task)
	}

	json.NewEncoder(w).Encode(tasks)
}

// createTask handles POST requests to create a new task
// It generates a unique ID for the task and stores it in memory
func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	task.ID = result.InsertedID.(primitive.ObjectID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// updateTask handles PUT requests to update an existing task
// It updates the task with the given ID in memory
func updateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	task.ID = id
	_, err = collection.ReplaceOne(context.Background(), bson.M{"_id": id}, task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

// deleteTask handles DELETE requests to remove a task
// It deletes the task with the given ID from memory
func deleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
