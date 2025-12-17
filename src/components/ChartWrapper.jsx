import React from 'react';

function ChartWrapper({ children, fallback = null }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Chart rendering error:', error);
    return fallback || (
      <div style={{
        padding: '2rem',
        background: '#1a1f2e',
        borderRadius: '12px',
        color: '#e0e0e0',
        textAlign: 'center'
      }}>
        <p>Chart temporarily unavailable. Please refresh the page.</p>
      </div>
    );
  }
}

export default ChartWrapper;

