import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchedTasks(state, action) {
      state.value = action.payload;
      
      
    },
    addTask(state, action) {
      if (Array.isArray(action.payload)) {
        state.value = action.payload;
      } else {
        state.value.push(action.payload);
      }
    },

   
    deleteTask(state, action) {
  
      
      state.value = state.value.filter(task => task.id !== Number(action.payload));
    },

 
  },
});

export const { addTask, deleteTask, fetchedTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
