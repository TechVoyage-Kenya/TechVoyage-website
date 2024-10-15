import { createSlice } from '@reduxjs/toolkit';

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [], // Initial state for profiles
  },
  reducers: {
    // Action to add all profiles
    addAllProfiles: (state, action) => {
      state.profiles = action.payload; // Replace existing profiles with the new array
    },
    // Action to add a single profile
    addProfile: (state, action) => {
      state.profiles.push(action.payload); // Add the new profile to the array
    },
    // Action to edit a profile
    editProfile: (state, action) => {
        console.log(action.payload);
        
      const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = { ...state.profiles[index], ...action.payload }; // Update the profile with new data
      }
    },
    // Action to delete a profile
    deleteProfile: (state, action) => {
      state.profiles = state.profiles.filter(profile => profile.id !== action.payload); // Remove the profile by id
    },
  },
});

// Export actions
export const {
  addAllProfiles,
  addProfile,
  editProfile,
  deleteProfile,
} = profilesSlice.actions;

// Export the reducer
export default profilesSlice.reducer;
