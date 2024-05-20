import React, { useState } from 'react';
import { getUrlStats } from '../api/urlShortenerApi';
import CollapsibleWindow from './CollapsibleWindow';
import ClearableInput from './ClearableInput';
import ReactJson from 'react-json-view';
import { ReactComponent as StatsIcon } from './icons/stats-icon.svg';
import '../styles.css';

const GetUrlStats = ({ setErrorMessage }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [statsList, setStatsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getUrlStats(shortUrl);
      setStatsList([result, ...statsList.slice(0, 9)]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Error retrieving URL stats.');
    }
  };

  const clearStats = (index) => {
    setStatsList(statsList.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleWindow title="Get URL Stats">
      <form onSubmit={handleSubmit} style={styles.form}>
        <ClearableInput
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter short URL"
        />
        <button type="submit" className="button stats-button">
          <StatsIcon style={styles.icon} />
          Get Stats
        </button>
      </form>
      <ul className="response-list" style={styles.responseList}>
        {statsList.map((stats, index) => (
          <li key={index} className="response-item" style={styles.responseItem}>
            <ReactJson src={stats} collapsed={true} />
            <button onClick={() => clearStats(index)} className="clear-button" style={styles.clearButton}>x</button>
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

export default GetUrlStats;
