import React, { useState } from 'react';
import { createShortUrl, getOrCreateCustomShortUrl } from '../api/urlShortenerApi';
import CollapsibleWindow from './CollapsibleWindow';
import ClearableInput from './ClearableInput';
import { ReactComponent as CreateIcon } from './icons/create-icon.svg';
import '../styles.css';

const CreateShortUrl = ({ setErrorMessage }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (shortUrl) {
        result = await getOrCreateCustomShortUrl(longUrl, shortUrl);
      } else {
        result = await createShortUrl(longUrl);
      }
      if (typeof result === 'string') {
        setShortUrls([result, ...shortUrls.slice(0, 9)]);
      } else {
        setShortUrls([JSON.stringify(result), ...shortUrls.slice(0, 9)]);
      }
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error creating short URL.');
    }
  };

  const clearShortUrl = (index) => {
    setShortUrls(shortUrls.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleWindow title="Create Short URL">
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <ClearableInput
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL"
          />
        </div>
        <div style={styles.inputGroup}>
          <ClearableInput
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="Enter custom short URL (optional)"
          />
          <button type="submit" className="button create-button">
            <CreateIcon style={styles.icon} />
            Create
          </button>
        </div>
      </form>
      <ul className="response-list" style={styles.responseList}>
        {shortUrls.map((url, index) => (
          <li key={index} className="response-item" style={styles.responseItem}>
            <span>{typeof url === 'string' ? url : JSON.stringify(url)}</span>
            <button onClick={() => clearShortUrl(index)} className="clear-button" style={styles.clearButton}>x</button>
          </li>
        ))}
      </ul>
    </CollapsibleWindow>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    marginRight: '8px',
  },
  responseList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  responseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    marginBottom: '5px',
    width: 'auto', // Adjust width to be auto
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: '#ff0000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default CreateShortUrl;
