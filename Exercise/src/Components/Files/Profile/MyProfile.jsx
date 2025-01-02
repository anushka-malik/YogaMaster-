import React, { useContext, useState, useEffect } from 'react';
import { AContext } from '../Context/AppContext';
import './myprofile.css';

const MyProfile = () => {
  const { userData, setUserData } = useContext(AContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    email: '',
    phone: '',
    gender: '',
    dob: '',
    name: '',
  });
  const backendUrl= import.meta.env.VITE_BACKEND_URL
  //  static
  useEffect(() => {
    if (userData) {
      const formattedDob = userData.dob ? userData.dob.split('T')[0] : '';
      setEditedProfile({
        email: userData.email || '',
        phone: userData.phone || '',
        gender: userData.gender || '',
        dob: formattedDob,
        name: userData.name || '',
      });
    }
  }, [userData]);

  const handleEdit = () => setIsEditing(true);

  // const handleSave = () => {
  //   const updatedProfile = { ...editedProfile };
  //   setUserData(updatedProfile);
  //   localStorage.setItem('userData', JSON.stringify(updatedProfile));
  //   setIsEditing(false);
  // };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending update request with data:', editedProfile);
      
      // Update to use the correct URL
      const response = await fetch(`${backendUrl}/user/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedProfile)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
      if (data.success) {
        const updatedUserData = { ...userData, ...editedProfile };
        setUserData(updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setIsEditing(false);
      } else {
        alert('Failed to update profile: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      const formattedDob = userData.dob ? userData.dob.split('T')[0] : '';
      setEditedProfile({
        email: userData.email || '',
        phone: userData.phone || '',
        gender: userData.gender || '',
        dob: formattedDob,
        name: userData.name || '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return userData ? (
    <div className="profile-container">
      <div className="profile-content">
        <h2>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
            />
          ) : (
            editedProfile.name
          )}
        </h2>
        <div className="profile-section">
          <h3>CONTACT INFORMATION</h3>
          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="profile-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-field">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <label>Email:</label>
                  <span>{editedProfile.email || 'N/A'}</span>
                </div>
                <div className="profile-field">
                  <label>Phone:</label>
                  <span>{editedProfile.phone || 'N/A'}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-section">
          <h3>BASIC INFORMATION</h3>
          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="profile-field">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={editedProfile.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="profile-field">
                  <label>Birthday:</label>
                  <input
                    type="date"
                    name="dob"
                    value={editedProfile.dob}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <label>Gender:</label>
                  <span>{editedProfile.gender || 'N/A'}</span>
                </div>
                <div className="profile-field">
                  <label>Birthday:</label>
                  <span>{editedProfile.dob || 'N/A'}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MyProfile;