import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
}

const StatsCard = ({ title, value, change }: StatsCardProps) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-semibold">
          {title === 'Earnings' ? '$' : ''}{value.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default StatsCard; 