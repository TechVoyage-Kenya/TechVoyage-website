import React, { useEffect, useState } from "react";
import { ReactLenis } from '@studio-freight/react-lenis';
import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "./redux/reducers/colorThemeSlice";
import { setProjects } from "./redux/reducers/projectsSlice";
import Footer from "./components/layout/Footer";
import axios from "axios";
import { addAllProfiles } from "./redux/reducers/profilesSice";
import { fetchedTasks } from "./redux/reducers/tasksSlice";
import { addUser } from "./redux/reducers/userSlice";

function App() {
  const theme = useSelector((state) => state.colorTheme.value);
  const user = useSelector((state)=>state.user.value)
  const dispatch = useDispatch();

 
  useEffect(() => {
    const confirmToken = async () => {
      const token = localStorage.getItem('token'); 
    
      
      if (token) {
        try {
          const response = await fetch('https://tech-voyage-express-js.vercel.app/api/auth', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
           
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          dispatch(addUser(data.user))
        } catch (error) {
          console.error('Error confirming token:', error);
        }
      }
    };
    confirmToken();
  }, [dispatch]);

  console.log(user);
  

 
  

    // Fetch projects from the backend
    useEffect(() => {
     
        const fetchProjects = async () => {
          try {
            const response = await axios.get('https://tech-voyage-express-js.vercel.app/api/projects');
            dispatch(setProjects(response.data))
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
        fetchProjects();
      
    }, [dispatch]);


    // Fetch profiles from the backend
    useEffect(() => {
     
      const fetchProfiles = async () => {
        try {
          const response = await axios.get('https://tech-voyage-express-js.vercel.app/api/profile');
          dispatch(addAllProfiles(response.data))
        } catch (error) {
          console.error('Error fetching profiles:', error);
        }
      };
      fetchProfiles();
    
  }, [dispatch]);


  
  useEffect(() => {
    axios
      .get("https://tech-voyage-express-js.vercel.app/api/tasks/")
      .then((response) => dispatch(fetchedTasks(response.data)))
      .catch((error) => console.error("Error fetching team:", error));
  }, [dispatch]);
    
  


  const [rippleEffect, setRippleEffect] = useState({ x: 0, y: 0, active: false });

  const toggleTheme = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    
    
    // Ensures the click is not on a functional element (like button, input, etc.)
    const nonFunctionalTags = ["button", "a", "input", "textarea", "select", "path", "svg"];
    if (!nonFunctionalTags.includes(tagName) && !e.target.classList.contains("exclude-theme-toggle")) {
      dispatch(switchTheme()); // Dispatch action to switch theme

      // Ripple effect logic
      const rect = e.currentTarget.getBoundingClientRect();
      const rippleSize = 20;
      setRippleEffect({
        x: e.clientX - rect.left - rippleSize / 2,
        y: e.clientY - rect.top - rippleSize / 2,
        active: true,
      });

      setTimeout(() => setRippleEffect({ active: false }), 600);
    }
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        syncTouch: true,
      }}
    >
      <div
        className="min-h-screen font-mulish flex flex-col" 
        style={{
          color: theme.textColor,
          backgroundColor: theme.backgroundColor,
          transition: "background-color 0.5s ease, color 0.5s ease",
        }}
        onClick={toggleTheme}
      >
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        {rippleEffect.active && (
          <span
            className="ripple"
            style={{
              left: rippleEffect.x,
              top: rippleEffect.y,
            }}
          />
        )}
      </div>
    </ReactLenis>
  );
}

export default App;
