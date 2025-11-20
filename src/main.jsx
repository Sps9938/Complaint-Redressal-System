import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'

const initializeAuth = async () => {
  try {
    const user = await authService.getCurrentUser();
    if (user) {
      store.dispatch(login(user));
    } else {
      store.dispatch(logout());
    }
  } catch (error) {
    store.dispatch(logout());
  }
};

initializeAuth().then(() => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
