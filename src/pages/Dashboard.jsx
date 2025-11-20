import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ComplaintCard from '../components/ComplaintCard';
import CreateComplaint from '../components/CreateComplaint';
import service from '../appwrite/config';

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      const fetchComplaints = async () => {
        try {
          const userComplaints = await service.getUserComplaints(userData.$id);
          if (userComplaints) {
            setComplaints(userComplaints.documents);
          }
        } catch (error) {
          console.error('Error fetching complaints:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchComplaints();
    }
  }, [userData]);

  if (loading) {
    return <div className="p-8 text-center">Loading complaints...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-700">My Complaints</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-4 py-2 rounded"
        >
          {showCreateForm ? 'Cancel' : 'Create Complaint'}
        </button>
      </div>

      {showCreateForm && <CreateComplaint />}

      {complaints.length === 0 && !showCreateForm ? (
        <p className="text-center text-gray-500">No complaints found. Create your first complaint!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((c, i) => (
            <motion.div key={c.$id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
              <ComplaintCard title={c.title} desc={c.description} status={c.status} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
