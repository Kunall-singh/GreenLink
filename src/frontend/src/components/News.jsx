import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/news');
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const getRandomImage = () => {
    const images = [
      '/public/ESG.jpeg',
      '/public/ESG1.jpeg',
      '/public/ESG2.jpeg',
      '/public/ESG3.jpeg',
      '/public/ESG4.jpeg',
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="App">
      <h1>Latest News on Sustainability and ESG</h1>
      <div className="marquee">
        <div className="news-cards">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <img src={getRandomImage()} alt="news" />
              <p>{article.description}</p>
            </div>
          ))}
          {news.map((article, index) => (
            <div key={index + news.length} className="news-card">
              <img src={getRandomImage()} alt="news" />
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Other components */}
    </div>
  );
}

export default News;
