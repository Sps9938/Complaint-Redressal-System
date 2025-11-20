import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;
      if (register) {
        user = await authService.createAccount({ email, password: pass, name: email.split('@')[0] });
      } else {
        await authService.login({ email, password: pass });
        user = await authService.getCurrentUser();
      }
      if (user) {
        dispatch(authLogin(user));
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="flex justify-center items-center min-h-[70vh]"
    >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-4">{register ? 'Register' : 'Login'}</h2>
        <input className="border w-full p-2 mb-3 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border w-full p-2 mb-4 rounded" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-teal-500 to-orange-500 text-white py-2 w-full rounded disabled:opacity-50">
          {loading ? 'Processing...' : (register ? 'Register' : 'Login')}
        </button>
        <p className="text-center text-sm mt-3">
          {register ? 'Already have an account?' : 'New user?'}
          <button type="button" onClick={() => setRegister(!register)} className="text-orange-500 ml-1 underline">
            {register ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </motion.div>
  );
}
