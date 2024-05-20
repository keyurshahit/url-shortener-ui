import axios from 'axios';

const API_URL = 'https://localhost:5000/api/URLShortener';

export const createShortUrl = async (longUrl) => {
    const response = await axios.post(`${API_URL}/createShort`, JSON.stringify(longUrl), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  };


  export const deleteShortUrl = async (shortUrl) => {
    const response = await axios.post(`${API_URL}/deleteShort`, JSON.stringify(shortUrl), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getOrCreateShortUrl = async (longUrl) => {
    const response = await axios.post(`${API_URL}/getOrCreateShort`, JSON.stringify(longUrl), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getOrCreateCustomShortUrl = async (longUrl, shortUrl) => {
    const response = await axios.post(`${API_URL}/getOrCreateCustomShort?longUrl=${encodeURIComponent(longUrl)}`, JSON.stringify(shortUrl), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  };

export const getLongUrl = async (shortUrl) => {
    const response = await axios.get(`${API_URL}/getLong/${shortUrl}`);
    return response.data;
};

export const getShortUrl = async (longUrl) => {
    const response = await axios.get(`${API_URL}/getShort/${encodeURIComponent(longUrl)}`);
    return response.data;
};

export const getUrlStats = async (shortUrl) => {
    const response = await axios.get(`${API_URL}/getStats/${shortUrl}`);
    return response.data;
};