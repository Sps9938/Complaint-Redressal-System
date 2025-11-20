import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center py-4 text-sm text-gray-700"
    >
      💙 Made with love by <strong>Gulshan Singh – NIT Agartala</strong>
    </motion.footer>
  );
}
