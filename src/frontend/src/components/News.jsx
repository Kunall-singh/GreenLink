import React from 'react';
import './News.css';

function News() {
  const news = [
    {
      title: 'Effective Emissions Management',
      description: 'Gain precise insights and control over Scope 3 emissions, enabling proactive reduction strategies.',
      image: '/ESG.jpeg'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Utilize advanced analytics to make informed decisions that enhance sustainability performance.',
      image: '/ESG1.jpg'
    },
    {
      title: 'Stakeholder Engagement',
      description: 'Foster strong relationships with suppliers and stakeholders through transparent reporting and collaborative tools.',
      image: '/ESG2.jpg'
    },
    {
      title: 'Renewable Energy Adoption',
      description: 'Companies are increasingly investing in renewable energy sources to reduce their carbon footprint and promote sustainability.',
      image: '/ESG3.webp'
    },
    {
      title: 'Sustainable Supply Chains',
      description: 'Efforts to make supply chains more sustainable are gaining traction, with companies focusing on reducing waste and improving efficiency.',
      image: '/ESG4.jpeg'
    }
  ];

  return (
    <div className="App">
      <h1>Latest News on Sustainability and ESG</h1>
      <div className="marquee">
        <div className="news-cards">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <img src={article.image} alt={article.title} className="content-image" />
              <p className="content-description">{article.description}</p>
            </div>
          ))}
          {news.map((article, index) => (
            <div key={index + news.length} className="news-card">
              <h2>{article.title}</h2>
              <img src={article.image} alt={article.title} className="content-image" />
              <p className="content-description">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
