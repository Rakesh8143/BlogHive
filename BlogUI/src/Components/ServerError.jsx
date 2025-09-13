import React from 'react';

const ServerError = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>500</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Internal Server Error</h2>
      <p>Oops! Something went wrong on our end. Please try again later.</p>
    </div>
  );
}

export default ServerError;
