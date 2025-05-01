import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import EditMember from './pages/EditMember';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header teamName="Team Awesome" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/members" element={<ViewMembers />} />
            <Route path="/edit-member/:id" element={<EditMember />} />
            <Route path="/members/:id" element={<MemberDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;