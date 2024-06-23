import React from 'react';
import './Dashboard.css';
import News from './News';
const Dashboard = () => {
  return (
    <div className="dashboard-outer-container">
      <div className="dashboard-container">
        <div className="header-section">
          <div className="text-section">
            <h1>Acknowledge. Analyze. Advance.</h1>
            <div className="description-container">
              <p className="description">
                Empowering companies with advanced analytics to manage Scope 3 emissions effectively, driving impactful change, and fostering a sustainable future.
              </p>
            </div>
          </div>
          <div className="image-section">
            <img src="/dashboardImage.png" alt="Dashboard Illustration" className="header-image" />
          </div>
        </div>
        <News />
        <div className="accessibility-text">
          <p>Your carbon footprint is now more accessible!</p>
        </div>
        <div className="content-section">
          <div className="content-container">
            <h2>Effective Emissions Management</h2>
            <img src="/Card1.png" alt="Description 1" className="content-image" />
            <p className="content-description">
              Gain precise insights and control over Scope 3 emissions, enabling proactive reduction strategies.
            </p>
          </div>
          <div className="content-container">
            <h2>Data-Driven Decisions</h2>
            <img src="/Card2.png" alt="Description 2" className="content-image" />
            <p className="content-description">
              Utilize advanced analytics to make informed decisions that enhance sustainability performance.
            </p>
          </div>
          <div className="content-container">
            <h2>Stakeholder Engagement</h2>
            <img src="/Card3.png" alt="Description 3" className="content-image" />
            <p className="content-description">
              Foster strong relationships with suppliers and stakeholders through transparent reporting and collaborative tools.
            </p>
          </div>
        </div>
        <div className="about-us-section">
          <h2>About Us</h2>
          <div className="about-us-container">
            <div className="team-member">
              <img src="/sidd.png" alt="Team Member 1" className="team-image" />
              <p className="team-description">Sidd is a sophomore at UMSL. He believes our app enables companies to accurately measure and manage their CO2 emissions, making data-driven decisions to reduce their carbon footprint.</p>
            </div>
            <div className="team-member">
              <img src="/kunal.png" alt="Team Member 2" className="team-image" />
              <p className="team-description">Kunal is an upcoming junior at SIUE, bringing his technical expertise and passion for innovation to the team. He emphasizes that our app helps companies track their emissions and identify areas for improvement, positioning them as leaders in sustainability.</p>
            </div>
            <div className="team-member">
              <img src="/mani.png" alt="Team Member 3" className="team-image" />
              <p className="team-description">Mani is a recent graduate from UMSL. He advocates that our app provides actionable insights, helping companies implement effective strategies to minimize their carbon footprint.</p>
            </div>
            <div className="team-member">
              <img src="/medhani.png" alt="Team Member 4" className="team-image" />
              <p className="team-description">Medhani is an upcoming senior at SLU, dedicated to sustainability and developing innovative app features. She asserts that our app empowers companies to take control of their environmental impact and achieve significant reductions in CO2 emissions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
