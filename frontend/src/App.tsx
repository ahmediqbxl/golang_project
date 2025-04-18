import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';
import './App.css';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCreate = async (task: Omit<Task, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:8080/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (task: Task) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task);
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Task Manager</h1>
        <TaskForm onSubmit={handleTaskCreate} />
        <div className="columns">
          <TaskColumn
            title="High Priority"
            tasks={tasks.filter(task => task.priority === 'high')}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
          <TaskColumn
            title="Medium Priority"
            tasks={tasks.filter(task => task.priority === 'medium')}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
          <TaskColumn
            title="Low Priority"
            tasks={tasks.filter(task => task.priority === 'low')}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App; 