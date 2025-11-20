import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-teal-700 mb-4"
      >
        Welcome to NIT Agartala’s Online Complaint & Redressal System
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-700 max-w-xl"
      >
        File complaints easily, track progress, and ensure quick resolutions for all hostel and campus issues.
      </motion.p>
      <motion.div whileHover={{ scale: 1.1 }} className="mt-8">
        <Link to="/login" className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Get Started
        </Link>
      </motion.div>
    </section>
  );
}
