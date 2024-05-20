import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateShortUrl from './components/CreateShortUrl';
import DeleteShortUrl from './components/DeleteShortUrl';
import GetLongUrl from './components/GetLongUrl';
import GetUrlStats from './components/GetUrlStats';
import ErrorBar from './components/ErrorBar';

function App() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorClose = () => setErrorMessage('');

  return (
    <Router>
      <div>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>URL Shortener Service</h1>
        </header>
        <div style={styles.container}>
          <CreateShortUrl setErrorMessage={setErrorMessage} />
          <DeleteShortUrl setErrorMessage={setErrorMessage} />
          <GetLongUrl setErrorMessage={setErrorMessage} />
          <GetUrlStats setErrorMessage={setErrorMessage} />
        </div>
        <ErrorBar message={errorMessage} onClose={handleErrorClose} />
      </div>
    </Router>
  );
}

const styles = {
  header: {
    backgroundColor: '#f5f5f5', // Softer background color
    padding: '10px 20px',
    textAlign: 'center',
    margin: '20px', // Added margin
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding some shadow
    borderRadius: '5px' // Slight border radius
  },
  headerTitle: {
    margin: 0,
    color: '#333', // Softer text color
  },
  container: {
    padding: '20px',
  },
};

export default App;
