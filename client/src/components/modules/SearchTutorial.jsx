import React, { useState, useContext, useEffect } from "react";
import "./MainTutorial.css";
import { UserContext } from "../App";

const SearchTutorial = () => {
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
    <div className="popup-button-container">
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
            <p>Are you ready to make some music?</p>

            <p className="list-spacing">
              Whether you want to build sounds from scratch or discover new ones, Maestro gives you
              the tools to create music like never before!
            </p>
            <p className="list-spacing">
              In Maestro, every sound is stored in a <strong className="bolded-words">Guy</strong>{" "}
              with its own name and emoji. These Guys are the building blocks of your track. So get
              ready to
              <strong className="bolded-words"> build beats, one Guy at a time!</strong>
            </p>
            <p>Let's get started!</p>

            <hr></hr>

            <p>
              You are currently on the <strong className="bolded-words">SEARCH MENU</strong> page.
            </p>
            <p>How to use this page:</p>
            <ul className="list-spacing">
              <li>
                The Search Menu allows you to view your published Guys, explore other users'
                creations, and select Guys to make music with in the Composer.
              </li>
              <li>Search for Guys by Guy name or creator username in the search bar.</li>
              <li>
                Click on a Guy to select it, then click it again in the right panel to use it in the
                Composer!
              </li>
              <li>Click "Remix" to create new Guys by modifying existing synth maker sounds.</li>

              <li>For Keyboard Users:</li>
              <ul>
                <li>
                  <code>Control + #</code>: Select a Guy from the left panel.
                </li>
                <li>
                  <code>Control</code>: Deselect a Guy.
                </li>
                <li>
                  <code>Right/Left arrow</code>: Navigate between pages of results.
                </li>
                <li>
                  <code>Up/Down arrow</code>: Scroll through the results.
                </li>
                <li>
                  <code>Shift + #1 #2</code>: Replace a Guy in your Guy list to use in the Composer.
                </li>
              </ul>
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

export default SearchTutorial;
