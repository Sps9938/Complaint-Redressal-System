import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import service from '../appwrite/config';

export default function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const allComplaints = await service.getAllComplaints();
        if (allComplaints) {
          setComplaints(allComplaints.documents);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await service.updateComplaint(id, { status: newStatus });
      setComplaints(complaints.map(c => c.$id === id ? { ...c, status: newStatus } : c));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading complaints...</div>;
  }

  return (
    <div className="p-8">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold mb-4 text-teal-700">
        Admin Dashboard
      </motion.h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="p-2">Student</th>
              <th className="p-2">Issue</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr key={c.$id} className="text-center border-b">
                <td className="p-2">{c.userId}</td>
                <td className="p-2">{c.title}: {c.description}</td>
                <td className="p-2 text-sm">
                  <span className={`px-3 py-1 rounded-full text-white ${
                    c.status === 'Resolved' ? 'bg-green-500' :
                    c.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>{c.status}</span>
                </td>
                <td className="p-2">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.$id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
