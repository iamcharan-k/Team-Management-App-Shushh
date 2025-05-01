import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MemberDetails() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Fetch member details when component mounts
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`/api/members/${id}`);
        setMember(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]); // Re-run the effect if the ID changes

  if (loading) {
    return <div>Loading member details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!member) {
    return <div>Loading member details...</div>;
  }

  return (
    <div>
      <Link to="/members" className="btn back-button">← Back to Members</Link>
      
      <div className="member-details">
        <div className="member-details-header">
          {member.image ? (
            <img 
              src={`/uploads/${member.image}`} 
              alt={member.name} 
              className="member-details-image"
            />
          ) : (
            <div className="member-image-placeholder member-details-image">No Image</div>
          )}
          
          <div className="member-details-info">
            <h2 className="member-details-name">{member.name}</h2>
            <p className="member-details-role">{member.role}</p>
            
            <div className="member-contact">
              <p><strong>Email:</strong> {member.email}</p>
              {member.phone && <p><strong>Phone:</strong> {member.phone}</p>}
            </div>
            
            {member.bio && (
              <div className="member-bio">
                <h3>Bio</h3>
                <p>{member.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;