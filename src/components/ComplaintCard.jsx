import React from 'react';
import { motion } from 'framer-motion';

export default function ComplaintCard({ title, desc, status }) {
  const color = status === 'Resolved' ? 'bg-green-500' :
                status === 'In Progress' ? 'bg-blue-500' :
                'bg-yellow-500';
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-4 bg-white rounded-xl shadow-md"
    >
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{desc}</p>
      <span className={`px-3 py-1 text-xs text-white rounded-full ${color}`}>
        {status}
      </span>
    </motion.div>
  );
}
