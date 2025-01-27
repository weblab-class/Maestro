import React, { useState, useContext, useEffect } from "react";
import "./SearchTutorial.css";
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
            <h1>Welcome to the Search Menu!</h1>

            <p>Here you can:</p>
            <ul>
              <li>Search for guys based on username or guy name.</li>
              <li>View other user's profiles.</li>
              <li>Use other user's guys in your own composer!</li>
            </ul>
            <p className="highlight">To start:</p>
            <ul>
              <li>Type a guy name or username into the searchboxes.</li>
              <li>Navigate the results by clicking the arrows above the left panel.</li>
              <li>Select a guy by clicking on a button in the left panel.</li>
              <li>
                With a guy selected, click on a guy in the right panel to use that guy in your next
                composition!
              </li>
            </ul>

            <p className="highlight">For Keyboard Users:</p>
            <ul>
              <li>
                <code>Control + # </code>: Selects a guy from the left panel
              </li>
              <li>
                <code>Control </code>: Deselect a guy
              </li>
              <li>
                <code>Right or Left arrow </code>: Change Page
              </li>
              <li>
                <code>Up or Down arrow </code>: Scroll Results
              </li>
              <li>
                <code>Shift + #1 #2 </code>: Replaces the guy in row #1, column #2 with your
                currently selected guy
              </li>
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
