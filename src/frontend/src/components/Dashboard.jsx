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
            <h2>Measure accurately</h2>
            <img src="/Card1.png" alt="Description 1" className="content-image" />
            <p className="content-description">
              Measure your carbon footprint using state-of-the-art technology, allowing you to easily account for your 3 emissions scopes.
            </p>
          </div>
          <div className="content-container">
            <h2>Monitor with ease</h2>
            <img src="/Card2.png" alt="Description 2" className="content-image" />
            <p className="content-description">
              Analyze your emissions, set your targets and achieve significant reductions with the help of our experts.
            </p>
          </div>
          <div className="content-container">
            <h2>Measure physical & monitary flows</h2>
            <img src="/Card3.png" alt="Description 3" className="content-image" />
            <p className="content-description">
              Monetary and physical approaches are complementary, and are essential to thoroughly assess your CO2 emissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
