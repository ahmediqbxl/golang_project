/**
 * TaskForm component for creating new tasks
 * Provides a form interface for users to input task details
 */
import React, { useState } from 'react';

/**
 * Props interface for TaskForm component
 * @interface TaskFormProps
 * @property {function} onSubmit - Callback function to handle form submission
 */
interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

/**
 * Task interface defining the structure of a task
 * @interface Task
 */
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

/**
 * TaskForm functional component
 * @param {TaskFormProps} props - Component props
 * @returns {JSX.Element} Form for creating new tasks
 */
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  // State hooks for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');

  /**
   * Handles form submission
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call onSubmit with the new task data
    onSubmit({
      title,
      description,
      priority,
      dueDate,
    });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Task title input */}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {/* Task description textarea */}
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {/* Priority selection dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      {/* Due date input */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      {/* Submit button */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm; 