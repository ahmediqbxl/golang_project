/**
 * TaskCard component for displaying and managing individual tasks
 * Supports drag-and-drop functionality and inline editing
 */
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';

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
 * Props interface for TaskCard component
 * @interface TaskCardProps
 */
interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * TaskCard functional component
 * @param {TaskCardProps} props - Component props
 * @returns {JSX.Element} Card displaying task information with edit/delete functionality
 */
const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  // State for managing edit mode and edited task data
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  // Drag and drop functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: task,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  /**
   * Handles entering edit mode
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Handles saving edited task
   */
  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  /**
   * Handles task deletion
   */
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  // Render edit form when in editing mode
  if (isEditing) {
    return (
      <div
        ref={drag}
        className={`task-card ${isDragging ? 'dragging' : ''}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="task-edit">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Task title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Task description"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // Render task card in view mode
  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Task title */}
      <h3>{task.title}</h3>
      {/* Task description */}
      <p>{task.description}</p>
      {/* Formatted due date */}
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      {/* Action buttons */}
      <div className="task-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard; 