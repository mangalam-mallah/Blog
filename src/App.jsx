import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth_service from './appwrite/auth_service';
import { login, logout } from './Store/authSlice';
import { Header, Footer } from './Components';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth_service
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-400 to-blue-500">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Content Area */}
      <main className="pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-y-auto max-h-[calc(100vh-120px)]">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen md:min-h-screen bg-gradient-to-r from-blue-400 to-blue-500">
      <p>Loading...</p>
    </div>
  );
}

export default App;
