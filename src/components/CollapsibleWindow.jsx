import React, { useState } from 'react';

const CollapsibleWindow = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div style={styles.window}>
      <div style={styles.header} onClick={toggleOpen}>
        <span>{title}</span>
        <button onClick={toggleOpen} style={styles.toggleButton}>{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && <div style={styles.body}>{children}</div>}
    </div>
  );
};

const styles = {
  window: {
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  header: {
    padding: '10px',
    background: '#e0e0e0',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer' // Make the cursor a pointer to indicate clickability
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  body: {
    padding: '10px',
  }
};

export default CollapsibleWindow;
