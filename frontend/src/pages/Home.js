import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Team Management</h1>
      <p className="home-subtitle">Manage your team members efficiently with our easy-to-use application.</p>
      
      <div className="home-buttons">
        <Link to="/add-member" className="btn btn-primary">Add Member</Link>
        <Link to="/members" className="btn">View Members</Link>
      </div>
    </div>
  );
}

export default Home;