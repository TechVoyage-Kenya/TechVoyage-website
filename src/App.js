import React, { useState } from "react";
import { ReactLenis } from '@studio-freight/react-lenis';
import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "./redux/reducers/colorThemeSlice";
import Footer from "./components/layout/Footer";

function App() {
  const theme = useSelector((state) => state.colorTheme.value);
  const dispatch = useDispatch();

  const [rippleEffect, setRippleEffect] = useState({ x: 0, y: 0, active: false });

  const toggleTheme = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    
    
    // Ensure the click is not on a functional element (like button, input, etc.)
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
        className="min-h-screen font-mulish flex flex-col" // Changed min-w-screen to min-h-screen
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
