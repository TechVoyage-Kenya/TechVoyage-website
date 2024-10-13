import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice"
import colorThemeReducer from "./reducers/colorThemeSlice"
import tasksReducer from "./reducers/tasksSlice"


export const store = configureStore({
    reducer:{
        user:userReducer,
        colorTheme:colorThemeReducer,
        tasks:tasksReducer
    }
})