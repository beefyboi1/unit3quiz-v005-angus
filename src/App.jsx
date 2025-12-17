import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import DataVisualization from './components/DataVisualization';
import StatementOfIntent from './components/StatementOfIntent';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('App mounted, checking auth state...');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? currentUser.email : 'No user');
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error('Auth error:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🗳️ Supporting Economic Growth Through Data</h1>
          <div className="header-actions">
            <span className="user-email">Welcome, {user.email}</span>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="intro-banner">
          <h2>Understanding Our Economy Through Sales Data</h2>
          <p>
            Knowledge is power. Below you'll find comprehensive data on warehouse and retail sales 
            that drive our local economy. This data informs our policy positions and our commitment 
            to responsible economic growth.
          </p>
        </div>

        <DataVisualization />

        <StatementOfIntent />
      </main>

      <footer className="app-footer">
        <p>
          💙 Thank you for registering and supporting data-driven economic policy.
        </p>
        <p>
          Together, we can build a stronger economy. Share this platform to spread awareness.
        </p>
        <p className="footer-note">
          Data Source: Warehouse and Retail Sales Data | 
          Platform created for voter engagement and education
        </p>
      </footer>
    </div>
  );
}

export default App;
