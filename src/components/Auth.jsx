import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Auth.css';

function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Register
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🗳️ Voter Registration</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to view the sales data' : 'Register to support our economic policy'}
        </p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength="6"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register to Vote')}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already registered? '}
          <button
            type="button"
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            disabled={loading}
          >
            {isLogin ? 'Register here' : 'Sign in'}
          </button>
        </p>

        <div className="auth-info">
          <p>
            ✅ By registering, you are expressing support for our economic policy Statement of Intent
          </p>
          <p>
            🔒 Your data is secure and will be used only for voter registration
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;

