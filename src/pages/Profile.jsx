import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const theme = useSelector((state) => state.colorTheme.value);
  const user = useSelector((state) => state.user.value);
  const team = useSelector((state) => state.profiles.profiles);
  console.log(user);
  

  // States for profile details
  const [profile, setProfile] = useState({
    username: user.fullName,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  
  const [editMode, setEditMode] = useState(false);
  const userData = team.find((item)=>item.userId === user.id)
  const [errorMessage, setErrorMessage] = useState("");
  console.log(team);
  

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };


  const handleSave = async() => {
    if (profile.password !== profile.confirmPassword) {
        setErrorMessage("Passwords do not match. Please try again.");
        return;
      }
      setErrorMessage("");
      // Proceed with saving the profile details

      
      setEditMode(false);
    const updatedProfileData = {
    email: profile.email,
    fullName: profile.username,
    password: profile.password, 
  };

  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch('https://tech-voyage-express-js.vercel.app/api/auth/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(updatedProfileData),
    });

    const data = await response.json();

    if (response.ok) {
      
      alert("Profile details saved successfully!");
      setEditMode(false);
    } else {
      
      setErrorMessage(data.message || 'Error updating profile');
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    setErrorMessage('Something went wrong. Please try again.');
  }
  };

  return (
    <div className={`min-h-screen sm:p-8 p-2 pt-10 flex items-center justify-center`} style={{ backgroundColor: theme.backgroundColor }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="sm:w-1/2 w-full bg-gradient-to-r from-[#2A7B7D] to-[#7AC6E8] p-8 rounded-lg shadow-lg"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <motion.img
            src={userData?.imageUrl}
            alt="profile-pic"
            className="rounded-full border-4 border-primary mb-4 w-36 h-36 object-cover"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <h2 className="text-2xl font-semibold text-black">
            {profile.username}
          </h2>
          <p className="text-text">{profile.email}</p>
        </div>

        {/* Profile Information */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Editable Section */}
          <div className="flex flex-col">
            <label className="font-semibold text-text">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className={`border p-2 rounded ${editMode ? "bg-white" : "bg-gray-200"} text-black`}
              disabled={!editMode}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-text">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className={`border p-2 rounded ${editMode ? "bg-white" : "bg-gray-200"} text-black`}
              disabled={!editMode}
            />
          </div>

          {editMode && (
            <>
              <div className="flex flex-col">
                <label className="font-semibold text-text">Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleInputChange}
                  className="border p-2 rounded bg-white text-black"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-text">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleInputChange}
                  className="border p-2 rounded bg-white text-black"
                  placeholder="Confirm new password"
                />
              </div>
              {errorMessage && (
                <div className="text-red-600 text-sm mt-2">
                  {errorMessage}
                </div>
              )}
            </>
          )}

          {/* Edit/Save Button */}
          <div className="flex justify-between">
            {!editMode ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-white py-2 px-4 rounded-lg font-semibold"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-white py-2 px-4 rounded-lg font-semibold"
                onClick={handleSave}
              >
                Save Changes
              </motion.button>
            )}
            {editMode && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-hover text-white py-2 px-4 rounded-lg font-semibold"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
