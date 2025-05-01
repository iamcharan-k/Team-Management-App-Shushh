import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditMember() {
  const { id } = useParams(); // Get the member ID from the URL
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    name: '',
    role: '',
    image: null, // Initially set to null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // For previewing the uploaded image

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`/api/members/${id}`);
        setMemberData(response.data);
        setImagePreview(`/uploads/${response.data.image}`); // Set initial image preview
        setLoading(false);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  // Handle file input change (for image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMemberData({
        ...memberData,
        image: file,
      });

      // Preview the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', memberData.name);
  formData.append('role', memberData.role);
  if (memberData.image) {
    formData.append('image', memberData.image);
  }

  // Console log the FormData to check if it's correct
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const response = await axios.put(`/api/members/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Member updated successfully:', response.data);
    navigate(`/members/${id}`);
  } catch (err) {
    console.error('Update failed:', err);
    setError('Failed to update member details. Please try again later.');
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-container">
      <h2>Edit Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={memberData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={memberData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" width="100" height="100" />
            </div>
          )}
        </div>

        <button type="submit" className="btn">Update Member</button>
      </form>
    </div>
  );
}

export default EditMember;