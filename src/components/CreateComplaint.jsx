import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

export default function CreateComplaint() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      alert('Please login first');
      return;
    }
    setLoading(true);
    try {
      let imageId = null;
      if (image) {
        const uploadedFile = await service.uploadFile(image);
        if (uploadedFile) {
          imageId = uploadedFile.$id;
        }
      }

      await service.createComplaint({
        title,
        description,
        status: 'Pending',
        userId: userData.$id,
        image: imageId,
      });

      alert('Complaint created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating complaint:', error);
      alert('Failed to create complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-teal-700 mb-4">Create Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Complaint'}
        </button>
      </form>
    </motion.div>
  );
}