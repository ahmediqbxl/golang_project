import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onUpdate, onDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: Task) => {
      onUpdate({ ...item, priority: title.toLowerCase().split(' ')[0] as 'high' | 'medium' | 'low' });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`column ${isOver ? 'column-over' : ''}`}
    >
      <h2>{title}</h2>
      <div className="tasks">
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