import { motion } from 'framer-motion';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatsCard from '../components/dashboard/StatsCard';
import CircleProgress from '../components/dashboard/CircleProgress';

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
  { name: 'Aug', sales: 4000, revenue: 2400 },
  { name: 'Sep', sales: 3000, revenue: 1398 },
  { name: 'Oct', sales: 2000, revenue: 9800 },
  { name: 'Nov', sales: 2780, revenue: 3908 },
  { name: 'Dec', sales: 1890, revenue: 4800 },
];

const analysisData = [
  { name: 'Week 1', value: 2400 },
  { name: 'Week 2', value: 1398 },
  { name: 'Week 3', value: 9800 },
  { name: 'Week 4', value: 3908 },
];

const Dashboard = () => {
  const [selectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        variants={itemVariants}
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-3 sm:px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer flex-1 sm:flex-none text-center"
          >
            Filters
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex-1 sm:flex-none text-center ${
              selectedPeriod === 'day' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Last 30 days
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Earnings"
            value={22500}
            change={19}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Sales"
            value={500}
            change={16}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
          <StatsCard
            title="Orders"
            value={215}
            change={17}
          />
        </motion.div>
      </motion.div>

      {/* Sales Overview */}
      <motion.div
        className="bg-white p-3 sm:p-6 rounded-xl shadow-sm"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Sales Overview</h2>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-xs sm:text-sm text-gray-500">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs sm:text-sm text-gray-500">Revenue</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 sm:px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer flex-1 sm:flex-none text-center"
            >
              Filter
            </motion.button>
            <select className="px-3 sm:px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer flex-1 sm:flex-none">
              <option>This Year</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#EC4899"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Site Traffic */}
        <motion.div
          className="bg-white p-3 sm:p-6 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Site Traffic</h2>
            <span className="text-gray-400 text-xs">ⓘ</span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-800">115,500</div>
                <div className="text-xs sm:text-sm text-gray-500">Total Users</div>
              </div>
              <div className="text-green-500 font-medium text-sm sm:text-base">+6.4%</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CircleProgress
                value={77}
                label="Positive Sentiment"
                color="#EC4899"
                change={5.2}
              />
              <CircleProgress
                value={50}
                label="Return Visitors"
                color="#8B5CF6"
                change={3.1}
              />
            </div>
          </div>
        </motion.div>

        {/* Analysis */}
        <motion.div
          className="bg-white p-3 sm:p-6 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Analysis</h2>
            <select className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center mb-6">
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-semibold text-gray-800">2,598</div>
              <div className="text-xs sm:text-sm text-gray-500">New Users</div>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-semibold text-gray-800">8,547</div>
              <div className="text-xs sm:text-sm text-gray-500">Unique Visitors</div>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-semibold text-gray-800">2,707</div>
              <div className="text-xs sm:text-sm text-gray-500">France</div>
            </div>
          </div>

          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;