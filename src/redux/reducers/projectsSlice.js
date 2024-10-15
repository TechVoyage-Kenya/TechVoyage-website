import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
  },
  reducers: {
    // Action to set all projects
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    // Action to add a new project
    addNewProject: (state, action) => {
      state.projects.push(action.payload);
    },
    // Action to edit an existing project
    editProject: (state, action) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload };
      }
    },
    // Action to delete a project
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
  },
});

// Export actions
export const { setProjects, addNewProject, editProject, deleteProject } = projectsSlice.actions;

// Export the reducer
export default projectsSlice.reducer;
