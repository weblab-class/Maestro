import React, { useState, useContext, useEffect } from "react";
import "./SearchTutorial.css";
import { GuyContext, UserContext } from "../App";

const SearchTutorial = () => {
  const { userId } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const { guyVisibility, setGuyVisibility } = useContext(GuyContext);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const onChange = () => {
    setGuyVisibility(!guyVisibility);
  };

  useEffect(() => {
    setIsPopupOpen(userId === undefined);
  }, [userId]);

  return (
    <div>
      {/* Button to open the popup */}
      <button className="open-button" onClick={handleOpenPopup}>
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.webp"
          width="40px"
          height="40px"
          alt="Open Tutorial"
        />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Welcome to the search menu!</h2>
            <p>Find guys created by other users to make your own compositions!</p>
            <ul>
              <li>Search by guy name or username</li>
              <li>Click on a guy in the results panel to select it</li>
              <li>Click on a guy in the guy list panel to replace it</li>
            </ul>
            <p>Do this more times and now you can make music with your new guys!</p>
            <strong>For keyboard users:</strong>
            <ul>
              <li>
                You can use the arrow keys to change results page, or scroll the current page!
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
