import React, { useState } from 'react';
import { getLongUrl, getShortUrl } from '../api/urlShortenerApi';
import CollapsibleWindow from './CollapsibleWindow';
import ClearableInput from './ClearableInput';
import { ReactComponent as GetIcon } from './icons/get-icon.svg';
import '../styles.css';

const GetLongUrl = ({ setErrorMessage }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [longUrls, setLongUrls] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);

  const handleGetLongUrl = async (e) => {
    e.preventDefault();
    try {
      const result = await getLongUrl(shortUrl);
      setLongUrls([result, ...longUrls.slice(0, 9)]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error retrieving long URL.');
    }
  };

  const handleGetShortUrl = async (e) => {
    e.preventDefault();
    try {
      const result = await getShortUrl(longUrl);
      setShortUrls([result, ...shortUrls.slice(0, 9)]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error retrieving short URL.');
    }
  };

  const handleShortUrlClick = async (shortUrl) => {
    try {
      const longUrl = await getLongUrl(shortUrl);
      if (longUrl) {
        window.open(longUrl, '_blank');
      } else {
        setErrorMessage('No long URL found for this short URL.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error retrieving long URL.');
    }
  };

  const clearLongUrl = (index) => {
    setLongUrls(longUrls.filter((_, i) => i !== index));
  };

  const clearShortUrl = (index) => {
    setShortUrls(shortUrls.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleWindow title="Get Long URL">
      <form onSubmit={handleGetLongUrl} style={styles.form}>
        <ClearableInput
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter short URL"
        />
        <button type="submit" className="button get-button">
          <GetIcon style={styles.icon} />
          Get Long URL
        </button>
      </form>
      <ul className="response-list" style={styles.responseList}>
        {longUrls.map((url, index) => (
          <li key={index} className="response-item" style={styles.responseItem}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            <button onClick={() => clearLongUrl(index)} className="clear-button" style={styles.clearButton}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleGetShortUrl} style={styles.form}>
        <ClearableInput
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
        />
        <button type="submit" className="button get-button">
          <GetIcon style={styles.icon} />
          Get Short URL
        </button>
      </form>
      <ul className="response-list" style={styles.responseList}>
        {shortUrls.map((url, index) => (
          <li key={index} className="response-item" style={styles.responseItem}>
            <button onClick={() => handleShortUrlClick(url)} className="link-button">{url}</button>
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
    width: 'auto',
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: '#ff0000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#0645AD',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    margin: '0',
  },
};

export default GetLongUrl;
