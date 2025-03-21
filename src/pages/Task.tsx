import { useState } from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  assigneeAvatar: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Design New Dashboard Interface",
    description: "Create a modern and intuitive dashboard design with dark mode support",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-03-25",
    assignee: "Alex Morgan",
    assigneeAvatar: "AM"
  },
  {
    id: 2,
    title: "Implement Authentication System",
    description: "Set up JWT authentication with refresh tokens",
    status: "todo",
    priority: "high",
    dueDate: "2024-03-28",
    assignee: "Sarah Chen",
    assigneeAvatar: "SC"
  },
  {
    id: 3,
    title: "API Documentation",
    description: "Document all API endpoints using Swagger",
    status: "review",
    priority: "medium",
    dueDate: "2024-03-24",
    assignee: "Mike Brown",
    assigneeAvatar: "MB"
  },
  {
    id: 4,
    title: "Unit Tests for Core Components",
    description: "Write comprehensive unit tests for core components",
    status: "done",
    priority: "medium",
    dueDate: "2024-03-20",
    assignee: "Emma Wilson",
    assigneeAvatar: "EW"
  }
];

const statusOptions = [
  { value: 'todo', label: 'To Do', color: 'gray' },
  { value: 'in_progress', label: 'In Progress', color: 'blue' },
  { value: 'review', label: 'Review', color: 'yellow' },
  { value: 'done', label: 'Done', color: 'green' }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-600',
  high: 'bg-red-100 text-red-600'
};

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    assigneeAvatar: ''
  });

  const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.dueDate || !newTask.assignee) {
      return;
    }

    const assigneeInitials = newTask.assignee
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();

    const task: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title,
      description: newTask.description || '',
      status: newTask.status as Task['status'],
      priority: newTask.priority as Task['priority'],
      dueDate: newTask.dueDate,
      assignee: newTask.assignee,
      assigneeAvatar: assigneeInitials
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      assigneeAvatar: ''
    });
    setIsModalOpen(false);
  };

  const filteredTasks = selectedStatus === 'all'
    ? tasks
    : tasks.filter(task => task.status === selectedStatus);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-gray-500">Manage your team's tasks and track progress</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
        >
          Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            selectedStatus === 'all' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {statusOptions.map(status => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              selectedStatus === status.value ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              </div>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                className="text-sm border rounded-lg px-2 py-1 bg-white cursor-pointer"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {task.assigneeAvatar}
                </div>
                <span className="text-sm text-gray-600">{task.assignee}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  rows={3}
                  placeholder="Task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                    className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  placeholder="Assignee name"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
              >
                Create Task
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskPage;
