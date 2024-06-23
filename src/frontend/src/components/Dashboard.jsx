import React from 'react';
import './Dashboard.css';

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
        <div className="accessibility-text">
          <p>Your carbon footprint is now 10x more accessible.</p>
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
              <p className="team-description">Person 1 - Description</p>
            </div>
            <div className="team-member">
              <img src="/kunal.png" alt="Team Member 2" className="team-image" />
              <p className="team-description">Person 2 - Description</p>
            </div>
            <div className="team-member">
              <img src="/mani.png" alt="Team Member 3" className="team-image" />
              <p className="team-description">Person 3 - Description</p>
            </div>
            <div className="team-member">
              <img src="/medhani.png" alt="Team Member 4" className="team-image" />
              <p className="team-description">Person 4 - Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
