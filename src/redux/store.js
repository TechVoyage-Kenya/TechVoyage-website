import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice"
import colorThemeReducer from "./reducers/colorThemeSlice"
import tasksReducer from "./reducers/tasksSlice"
import projectsReducer from "./reducers/projectsSlice"
import profilesSlice from "./reducers/profilesSice"


export const store = configureStore({
    reducer:{
        user:userReducer,
        colorTheme:colorThemeReducer,
        tasks:tasksReducer,
        projects:projectsReducer,
        profiles:profilesSlice
    }
})