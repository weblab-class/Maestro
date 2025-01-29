import React, { useState, useEffect } from "react";
import "./Maximized.css";

const Maximized = () => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const checkWindowSize = () => {
    const isMaximized =
      window.innerWidth === window.screen.width && window.innerHeight === window.screen.height;
    setIsWindowMaximized(isMaximized);
  };

  useEffect(() => {
    checkWindowSize(); // Initial check when the component mounts

    // Show the button after 3 seconds
    const timeout = setTimeout(() => setShowButton(true), 1500);
  }, []);

  const closePopup = () => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => setIsWindowMaximized(true), 1000); // Close popup after animation
  };

  return (
    !isWindowMaximized && (
      <div className={`popup ${fadeOut ? "fadeOut" : ""}`}>
        <div className={`popupContent show`}>
          <div className="navbar-title neon-text unselectable">MAESTRO</div>
          <p>For the best experience, please maximize your browser window.</p>
          <button onClick={closePopup} className={`button ${showButton ? "show" : ""}`}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Maximized;
