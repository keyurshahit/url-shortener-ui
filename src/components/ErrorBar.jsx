import React from 'react';

const ErrorBar = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={styles.errorBar}>
      <span style={styles.message}>{message}</span>
      <button onClick={onClose} style={styles.closeButton}>x</button>
    </div>
  );
};

const styles = {
  errorBar: {
    backgroundColor: '#ffcccc', // Very light red background color
    color: 'white',
    padding: '10px',
    position: 'fixed',
    bottom: '10px', // Added margin
    left: '10px', // Added margin
    right: '10px', // Added margin
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', // Adding some shadow
    borderRadius: '5px', // Slight border radius
    zIndex: '1000',
  },
  message: {
    fontWeight: 'bold', // Bold text
    color: 'white' // White text color
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: 'white', // White text color
  }
};

export default ErrorBar;
