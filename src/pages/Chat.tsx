import { motion } from 'framer-motion';
import { useState } from 'react';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  isMine: boolean;
}

interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatMessages {
  [key: number]: Message[];
}

const mockChats: ChatMessages = {
  1: [
    {
      id: 1,
      content: "Hi! How's the new dashboard coming along?",
      timestamp: "10:30 AM",
      sender: {
        name: "Emma Watson",
        avatar: "EW",
        isOnline: true
      },
      isMine: false
    },
    {
      id: 2,
      content: "It's going great! I've just finished the main analytics section.",
      timestamp: "10:32 AM",
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    },
    {
      id: 3,
      content: "That's awesome! Can you share a preview?",
      timestamp: "10:33 AM",
      sender: {
        name: "Emma Watson",
        avatar: "EW",
        isOnline: true
      },
      isMine: false
    },
    {
      id: 4,
      content: "Of course! I'll prepare a demo for our meeting tomorrow.",
      timestamp: "10:35 AM",
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    }
  ],
  2: [
    {
      id: 1,
      content: "The project files are ready for review",
      timestamp: "1:30 PM",
      sender: {
        name: "James Smith",
        avatar: "JS",
        isOnline: true
      },
      isMine: false
    },
    {
      id: 2,
      content: "Great, I'll take a look at them right away.",
      timestamp: "1:35 PM",
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    }
  ],
  3: [
    {
      id: 1,
      content: "Could you help me with the new feature implementation?",
      timestamp: "11:20 AM",
      sender: {
        name: "Sarah Johnson",
        avatar: "SJ",
        isOnline: false
      },
      isMine: false
    },
    {
      id: 2,
      content: "Of course! Let me check the requirements.",
      timestamp: "11:25 AM",
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    },
    {
      id: 3,
      content: "Thanks for your help!",
      timestamp: "11:45 AM",
      sender: {
        name: "Sarah Johnson",
        avatar: "SJ",
        isOnline: false
      },
      isMine: false
    }
  ],
  4: [
    {
      id: 1,
      content: "New design system updates available",
      timestamp: "Yesterday",
      sender: {
        name: "Design Team",
        avatar: "DT",
        isOnline: true
      },
      isMine: false
    },
    {
      id: 2,
      content: "Thanks for the update. When can we start implementing them?",
      timestamp: "Yesterday",
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    }
  ]
};

const mockContacts: ChatContact[] = [
  {
    id: 1,
    name: "Emma Watson",
    avatar: "EW",
    lastMessage: "Sure, let's discuss it tomorrow!",
    timestamp: "2m ago",
    unreadCount: 3,
    isOnline: true
  },
  {
    id: 2,
    name: "James Smith",
    avatar: "JS",
    lastMessage: "The project files are ready for review",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thanks for your help!",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: false
  },
  {
    id: 4,
    name: "Design Team",
    avatar: "DT",
    lastMessage: "New design system updates available",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: true
  }
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<ChatContact>(mockContacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockChats[1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleContactSelect = (contact: ChatContact) => {
    setSelectedContact(contact);
    setMessages(mockChats[contact.id]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: {
        name: "You",
        avatar: "ME",
        isOnline: true
      },
      isMine: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      className="h-screen flex"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockContacts.map((contact) => (
            <motion.div
              key={contact.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact.id === contact.id ? "bg-pink-50" : ""
              }`}
              onClick={() => handleContactSelect(contact)}
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-pink-100 bg-pink-500 rounded-full">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                {selectedContact.avatar}
              </div>
              {selectedContact.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedContact.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <motion.div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
          key={selectedContact.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
              variants={itemVariants}
            >
              <div className={`flex items-end space-x-2 max-w-xs md:max-w-md ${message.isMine ? "flex-row-reverse space-x-reverse" : ""}`}>
                {!message.isMine && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm">
                    {message.sender.avatar}
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-2 ${
                  message.isMine
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isMine ? "text-pink-100" : "text-gray-500"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="p-2 text-white bg-pink-500 rounded-full hover:bg-pink-600"
              onClick={handleSendMessage}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
