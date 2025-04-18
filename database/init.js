// Create database and collections
db = db.getSiblingDB('taskmanager');

// Create collections
db.createCollection('tasks');

// Create indexes
db.tasks.createIndex({ "id": 1 }, { unique: true });
db.tasks.createIndex({ "priority": 1 });
db.tasks.createIndex({ "dueDate": 1 }); 