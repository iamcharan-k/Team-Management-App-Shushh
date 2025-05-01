import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch members when component mounts
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (memberId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this member?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/members/${memberId}`);
      setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Failed to delete the member. Please try again.');
    }
  };

  if (loading) return <div>Loading members...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h2>Team Members</h2>

      {members.length === 0 ? (
        <p>No team members found. <Link to="/add-member">Add one now</Link>!</p>
      ) : (
        <div className="member-list">
          {members.map(member => (
            <div key={member._id} className="member-card">
              {member.image ? (
                <img 
                  src={`/uploads/${member.image}`} 
                  alt={member.name} 
                  className="member-image"
                />
              ) : (
                <div className="member-image-placeholder">No Image</div>
              )}

              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>

                <Link to={`/members/${member._id}`} className="btn">
                  View Details
                </Link>
                <button onClick={() => handleDelete(member._id)} className="btn">
                  Delete Member
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
