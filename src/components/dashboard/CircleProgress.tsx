import { motion } from 'framer-motion';

interface CircleProgressProps {
  value: number;
  label: string;
  color: string;
  change: number;
}

const CircleProgress = ({ value, label, color, change }: CircleProgressProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - value) / 100 * circumference;

  return (
    <div className="flex items-center space-x-4">
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: -90 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <svg width="100" height="100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Percentage text */}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy=".3em"
            className="text-xl font-semibold"
            fill="#374151"
            transform="rotate(90 50 50)"
          >
            {value}%
          </text>
        </svg>
      </motion.div>

      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
    </div>
  );
};

export default CircleProgress; 