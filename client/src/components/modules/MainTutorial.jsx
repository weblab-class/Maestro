import React, { useState, useContext, useEffect } from "react";
import "./MainTutorial.css";
import { UserContext } from "../App";

const MainTutorial = () => {
  const { userId, isAnimated } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setIsPopupOpen(userId === undefined);
  }, [userId]);

  return (
    <div>
      {/* Button to open the popup */}
      <button className="open-button" onClick={handleOpenPopup}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.${
            +isAnimated ? "webp" : "png"
          }`}
          width="40px"
          height="40px"
          alt="Open Tutorial"
        />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="bolded-words">Welcome to Maestro!</h2>
            <p>
             Are you ready to make some music? 
            </p>

            <p className="list-spacing">Whether you want to build sounds from scratch or discover new ones, Maestro gives you the tools to create music like never before!</p>
            <p className="list-spacing">In Maestro, every sound is stored in a <strong className="bolded-words">Guy</strong> with its own name and emoji. These Guys are the building blocks of your track. So get ready to 
            <strong className="bolded-words"> build beats, one Guy at a time!</strong></p>
            <p>Let's get started!</p>

            <hr></hr>

            <p>You are currently on the <strong className="bolded-words">COMPOSER</strong> page.</p>
            <p>How to use this page:</p>
            <ul className="list-spacing">
            <li>The Composer is the hub for making tracks with your Guys.</li>
    <li>On this page is an animated keyboard and your Guy list.</li>
    <li>Click a Guy in the Guy list to select it. When a Guy is selected, its name will appear next to the list.</li>
    <ul >
        <li>To assign a Guy to a key on your keyboard:</li>
        <ul>
            <li>Select a Guy.</li>
            <li>Click a key on the animated keyboard, or press a key on your computer keyboard.</li>
        </ul>
    </ul>
    <li>Press or click keys to play sounds and make your own music!</li>
              <li >
              Hold <code>Shift</code> and press multiple keys on your computer keyboard to assign the selected Guy to them.</li>
                
              <li >Press <code>Spacebar</code> to toggle between letters/numbers and Guy emojis on the animated keyboard.</li>
            </ul>

            {/* Close button */}
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTutorial;