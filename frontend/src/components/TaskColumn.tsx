/**
 * TaskColumn component for displaying a column of tasks
 * Implements drop functionality for drag-and-drop operations
 */
import React from 'react';
import { useDrop } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import TaskCard from './TaskCard';

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
 * Props interface for TaskColumn component
 * @interface TaskColumnProps
 */
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * TaskColumn functional component
 * @param {TaskColumnProps} props - Component props
 * @returns {JSX.Element} Column displaying tasks of a specific priority
 */
const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onUpdate, onDelete }) => {
  // Drop functionality using react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    // Handle task drop by updating its priority
    drop: (item: Task) => {
      onUpdate({ ...item, priority: title.toLowerCase() as Task['priority'] });
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`task-column ${isOver ? 'drag-over' : ''}`}
    >
      {/* Column title */}
      <h2>{title}</h2>
      {/* List of tasks in the column */}
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn; 