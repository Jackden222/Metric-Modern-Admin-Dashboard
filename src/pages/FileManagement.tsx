import { motion } from 'framer-motion';
import { useState } from 'react';

interface File {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  size: string;
  modified: string;
  shared: boolean;
  starred: boolean;
  icon: string;
}

const mockFiles: File[] = [
  {
    id: '1',
    name: 'Project_Presentation.pptx',
    type: 'document',
    size: '2.4 MB',
    modified: '2024-03-15',
    shared: true,
    starred: true,
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  {
    id: '2',
    name: 'Dashboard_Design.fig',
    type: 'image',
    size: '4.8 MB',
    modified: '2024-03-14',
    shared: true,
    starred: false,
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    id: '3',
    name: 'Project_Requirements.docx',
    type: 'document',
    size: '1.2 MB',
    modified: '2024-03-13',
    shared: false,
    starred: true,
    icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: '4',
    name: 'Tutorial_Video.mp4',
    type: 'video',
    size: '28.6 MB',
    modified: '2024-03-12',
    shared: false,
    starred: false,
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  }
];

const FileManagement = () => {
  const [files, setFiles] = useState<File[]>(mockFiles);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'shared' | 'starred'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleStarFile = (fileId: string) => {
    setFiles(files.map(file =>
      file.id === fileId ? { ...file, starred: !file.starred } : file
    ));
  };

  const handleShareFile = (fileId: string) => {
    setFiles(files.map(file =>
      file.id === fileId ? { ...file, shared: !file.shared } : file
    ));
  };

  const filteredFiles = files.filter(file => {
    if (searchTerm) {
      return file.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    switch (filter) {
      case 'shared':
        return file.shared;
      case 'starred':
        return file.starred;
      default:
        return true;
    }
  });

  const getFileTypeColor = (type: File['type']) => {
    switch (type) {
      case 'image':
        return 'text-blue-600 bg-blue-100';
      case 'document':
        return 'text-purple-600 bg-purple-100';
      case 'video':
        return 'text-red-600 bg-red-100';
      case 'audio':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      className="p-2 sm:p-4 md:p-6 h-screen bg-white overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">File Management</h1>
          <p className="text-sm sm:text-base text-gray-500">Manage and organize your files</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center sm:justify-start space-x-2"
          onClick={() => setShowUploadModal(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Upload Files</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md relative">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4 w-full sm:w-auto">
          <div className="grid grid-cols-3 sm:flex gap-2">
            <button
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('all')}
            >
              All Files
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'shared'
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('shared')}
            >
              Shared
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'starred'
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('starred')}
            >
              Starred
            </button>
          </div>
          <div className="flex justify-center border-t sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-4">
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  view === 'grid'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setView('grid')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  view === 'list'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setView('list')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Grid/List */}
      <motion.div
        className={`
          ${view === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4' 
            : 'space-y-2'
          }
        `}
        variants={containerVariants}
      >
        {filteredFiles.map((file) => (
          <motion.div
            key={file.id}
            className={`bg-white rounded-xl border border-gray-200 ${
              view === 'grid' ? 'p-3 sm:p-4' : 'p-2 sm:p-3'
            } hover:shadow-md transition-shadow`}
            variants={itemVariants}
          >
            <div className={view === 'grid' ? 'space-y-3' : 'flex items-center justify-between'}>
              <div className={view === 'grid' ? '' : 'flex items-center flex-1 min-w-0'}>
                <div className={`${getFileTypeColor(file.type)} p-2 sm:p-3 rounded-lg ${view === 'grid' ? 'mb-2' : 'mr-3 sm:mr-4'} flex-shrink-0`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={file.icon} />
                  </svg>
                </div>
                <div className={`${view === 'grid' ? '' : 'flex-1 min-w-0'}`}>
                  <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">{file.name}</h3>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    <span className="truncate">{file.size}</span>
                    <span className="mx-2 flex-shrink-0">•</span>
                    <span className="truncate">{file.modified}</span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1 sm:gap-2 ${view === 'grid' ? 'mt-2' : 'ml-2 sm:ml-4'}`}>
                <button
                  className={`p-1 sm:p-1.5 rounded-lg transition-colors hover:bg-gray-100 ${
                    file.starred ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleStarFile(file.id)}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={file.starred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button
                  className={`p-1 sm:p-1.5 rounded-lg transition-colors hover:bg-gray-100 ${
                    file.shared ? 'text-green-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleShareFile(file.id)}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  className="p-1 sm:p-1.5 rounded-lg transition-colors hover:bg-gray-100 text-gray-400"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Upload Files</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-sm sm:text-base text-gray-600 mb-2">Drag and drop your files here</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">or</p>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base">
                Browse Files
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 text-sm sm:text-base text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base"
                onClick={() => setShowUploadModal(false)}
              >
                Upload
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default FileManagement;
