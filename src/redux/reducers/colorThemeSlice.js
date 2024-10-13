import { createSlice } from "@reduxjs/toolkit";



const themes = [
    // Theme 1: Dark and Elegant (Existing theme with slight adjustments)
    {
      backgroundColor: "#0B132A",  // Deep Navy
      imageText: "#EDEDED",        // Warm White for better readability
      textColor: "#C4E7F3",        // Light Blue for contrast on dark background
    },
    
    // Theme 2: Soft and Light (Slightly warmer light theme with accent colors)
    {
      backgroundColor: "#F9F9F9",  // Warm Light Gray
      textColor: "#46BEB3",        // Teal for headings
      imageText: "#027A7F",        // Teal for image text 
    },
  
    // Theme 3: Vibrant Modern Dark (Higher contrast dark theme with accent colors)
    {
      backgroundColor: "#20232A",  // Neutral Dark Blue
      textColor: "#C4E7F3",        // Light Gray
      imageText: "#FF9505",        // Bright Orange for a vibrant modern feel
    },
  
    // Theme 4: Minimalist Warm Light (Soft light theme with warm colors)
    {
      backgroundColor: "#F7F8FA",  // Very Light Gray with a hint of warmth
      textColor: "#222222",  
      navTextColor:"#FFFFFF",      // Dark Gray for text 
      imageText: "#FFB6C1",        // Soft Pink to bring warmth and a fresh look
    },
  
    // Existing Theme 1: Light Theme (Keeping this for consistency)
    {
      backgroundColor: "#F0F0F0",  // Light Gray
      textColor: "#46BEB3",        // Teal (Primary)
      imageText: "#46BEB3",        // Teal (Primary) for image text
    },
  
    // Existing Theme 2: Dark and Bold
    {
      backgroundColor: "#333333",  // Dark Gray
      textColor: "#FF5733",        // Vibrant Orange 
      imageText: "#FF5733",        // Vibrant Orange for image text
    }
  ];
  
const initialState = { value: themes[0] };

const colorThemeSlice = createSlice({
    name: "colorTheme",
    initialState,
    reducers: {
        switchTheme(state, action) {
            const currentIndex = themes.findIndex(
                (theme) => theme.backgroundColor === state.value.backgroundColor
              );
              
            const nextIndex = (currentIndex + 1) % themes.length;
            state.value = themes[nextIndex];
        }
    }
});


export const {switchTheme} = colorThemeSlice.actions
export default colorThemeSlice.reducer

