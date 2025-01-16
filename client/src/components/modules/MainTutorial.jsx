import React, { useState } from "react";
import "./MainTutorial.css"; // Import the CSS file

const MainTutorial = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* Button to open the popup */}
      <button className="open-button" onClick={handleOpenPopup}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.webp`}
          width="40px"
          height="40px"
        />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Welcome to Maestro!</h2>
            <p>
              Welcome to <strong>Maestro</strong>, where making music is super easy and fun! 🎶
            </p>
            <p>
              Here’s how it works:
              <ul>
                <li>Pick an emoji and a sound to make a "Guy."</li>
                <li>Assign your Guys to different keys on your keyboard.</li>
                <li>Press the keys to play their sounds and create your own music!</li>
              </ul>
              You can even share your Guys, make music, or explore what others have made.
            </p>
            <p>
              <strong>Let’s get started:</strong>
              <ul>
                <li>A "Guy" is just an emoji with a sound.</li>
                <li>
                  To assign a Guy to a key, click on the Guy, then click a button on the screen (or
                  press a key on your keyboard).
                </li>
                <li>Now you can play the sound by pressing that button or key!</li>
              </ul>
            </p>
            <p>
              <strong>For keyboard users:</strong>
              <ul>
                <li>
                  Hold <code>Shift</code> to keep a Guy selected and assign it to multiple keys.
                </li>
                <li>
                  Press <code>CapsLock</code> to see your Guys’ emojis on the on-screen keyboard.
                </li>
              </ul>
            </p>
            <p>
              <strong>One last thing!</strong> If you’re using a real keyboard, make sure to choose
              whether <code>CapsLock</code> is on or off before you start!
            </p>
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
