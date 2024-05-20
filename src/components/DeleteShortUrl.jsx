import React, { useState } from 'react';
import { deleteShortUrl } from '../api/urlShortenerApi';
import CollapsibleWindow from './CollapsibleWindow';
import ClearableInput from './ClearableInput';
import { ReactComponent as DeleteIcon } from './icons/delete-icon.svg';
import '../styles.css';

const DeleteShortUrl = ({ setErrorMessage }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteShortUrl(shortUrl);
      setMessages([result, ...messages.slice(0, 9)]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error deleting short URL.');
    }
  };

  const clearMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleWindow title="Delete Short URL">
      <form onSubmit={handleSubmit} style={styles.form}>
        <ClearableInput
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter short URL"
        />
        <button type="submit" className="button delete-button">
          <DeleteIcon style={styles.icon} />
          Delete
        </button>
      </form>
      <ul className="response-list" style={styles.responseList}>
        {messages.map((msg, index) => (
          <li key={index} className="response-item" style={styles.responseItem}>
            <span>{msg}</span>
            <button onClick={() => clearMessage(index)} className="clear-button" style={styles.clearButton}>x</button>
          </li>
        ))}
      </ul>
    </CollapsibleWindow>
  );
};

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
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

export default DeleteShortUrl;
