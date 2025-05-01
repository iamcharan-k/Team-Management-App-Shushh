import React from 'react';
import { Link } from 'react-router-dom';

function Header({ teamName }) {
  return (
    <header>
      <div className="container header-content">
        <div className="logo">{teamName}</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-member">Add Member</Link></li>
            <li><Link to="/members">View Members</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;