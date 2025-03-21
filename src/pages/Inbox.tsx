import { useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Alice Johnson",
    avatar: "AJ",
    subject: "Project Update - Q1 2024",
    preview: "Hi team, I wanted to share the latest updates on our Q1 progress...",
    date: "10:30 AM",
    isRead: false,
    isStarred: true
  },
  {
    id: 2,
    sender: "Bob Smith",
    avatar: "BS",
    subject: "Meeting Notes - Design Review",
    preview: "Here are the key points we discussed during today's design review meeting...",
    date: "Yesterday",
    isRead: true,
    isStarred: false
  },
  {
    id: 3,
    sender: "Carol White",
    avatar: "CW",
    subject: "New Feature Request",
    preview: "We need to implement a new feature for our dashboard that will...",
    date: "Mar 20",
    isRead: true,
    isStarred: true
  },
  {
    id: 4,
    sender: "David Brown",
    avatar: "DB",
    subject: "Weekly Report",
    preview: "Please find attached the weekly progress report for our team...",
    date: "Mar 19",
    isRead: false,
    isStarred: false
  },
  {
    id: 5,
    sender: "Emma Davis",
    avatar: "ED",
    subject: "Client Feedback",
    preview: "The client has provided some feedback on our latest delivery...",
    date: "Mar 18",
    isRead: true,
    isStarred: false
  }
];

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const toggleMessageSelection = (id: number) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(messageId => messageId !== id)
        : [...prev, id]
    );
  };

  const toggleStarred = (id: number) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id 
          ? { ...message, isStarred: !message.isStarred }
          : message
      )
    );
  };

  const markAsRead = (ids: number[]) => {
    setMessages(prev => 
      prev.map(message => 
        ids.includes(message.id)
          ? { ...message, isRead: true }
          : message
      )
    );
    setSelectedMessages([]);
  };

  const filteredMessages = messages.filter(message => {
    switch (filter) {
      case 'unread':
        return !message.isRead;
      case 'starred':
        return message.isStarred;
      default:
        return true;
    }
  });

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
          <h1 className="text-2xl font-semibold text-gray-800">Inbox</h1>
          <p className="text-gray-500">Manage your messages and notifications</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              filter === 'unread' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('starred')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              filter === 'starred' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Starred
          </button>
        </div>
      </div>

      {/* Actions */}
      {selectedMessages.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
          <p className="text-gray-600">{selectedMessages.length} selected</p>
          <div className="flex gap-2">
            <button
              onClick={() => markAsRead(selectedMessages)}
              className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer"
            >
              Mark as read
            </button>
            <button
              onClick={() => setSelectedMessages([])}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={false}
            animate={{ backgroundColor: selectedMessages.includes(message.id) ? '#fdf2f8' : '#ffffff' }}
            className={`border-b border-gray-100 last:border-0 p-4 flex items-center gap-4 cursor-pointer
              ${!message.isRead ? 'bg-gray-50' : ''}`}
            onClick={() => toggleMessageSelection(message.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                  ${message.isRead ? 'bg-gray-400' : 'bg-pink-500'}`}
              >
                {message.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${message.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                    {message.sender}
                  </p>
                  <span className="text-sm text-gray-400">{message.date}</span>
                </div>
                <p className={`font-medium ${message.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                  {message.subject}
                </p>
                <p className="text-gray-500 truncate">{message.preview}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleStarred(message.id);
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer
                ${message.isStarred ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Inbox;
